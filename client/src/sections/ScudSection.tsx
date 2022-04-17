import React, { useEffect, useState } from 'react';
import useAsyncEffect from '../hoocks/useAsyncEffect';
import useQuizes from '../hoocks/useQuizes';
import useStatistic from '../hoocks/useStatistic';
import useWords from '../hoocks/useWords';
import { shuffle } from '../utils/shuffle';

enum Status {
    Start,
    Play,
    End,
}

export default function ScudSection() {

    const words = useWords();
    const quizes = useQuizes();

    const { saveStatistic } = useStatistic();
    const defaultStatistic = words.reduce((result, word) => {
        result[word.id] = true;
        return result;
    }, {} as Record<number, boolean>); 

    const [status, setStatus] = useState(Status.Start);
    const [pazzleWords, setPazzleWords] = useState(words);
    const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
    const [currentWordIndex, setCurrentWordIndex] = useState(0);
    const [isFinish, setIsFinish] = useState(false);
    const [statstic, setStatistic] = useState(defaultStatistic);

    const handleNext = (result: boolean) => {       
        const wordId = pazzleWords[currentWordIndex].id; 
        if (statstic[wordId]) {
            const newResults = {...statstic};
            newResults[wordId] = result;
            setStatistic(newResults);
        }

        if (currentWordIndex === words.length - 1) {
            setPazzleWords(shuffle(pazzleWords));
            setCurrentWordIndex(0);
            setCurrentQuizIndex(currentQuizIndex + 1);
            return;
        }
        setCurrentWordIndex(currentWordIndex + 1);      
    }

    useEffect(()=>{
        if (currentQuizIndex === quizes.length - 1) {
            setIsFinish(true);
        }
    }, [currentQuizIndex])

    useAsyncEffect(async () => {
        if (!isFinish) return;
        const updatedWords = words.map((word) => {
            word.attempts += 1;
            if (statstic[word.id]) {
                word.successfulAttempts += 1;
                word.lastSuccessful = new Date ();
            } 
            return word;
        })
        await saveStatistic(updatedWords);
        setIsFinish(false);
        setStatus(Status.End);
    }, [isFinish]);

    const CurrentQuiz = quizes[currentQuizIndex];
    switch (status) {
        case Status.Start:
            return <CurrentQuiz key={pazzleWords[currentWordIndex].word} pazzleWord={pazzleWords[currentWordIndex]} next={handleNext}/>;
            // return <StartCard onClick={()=>{}/>
        case Status.End:
            return <CurrentQuiz key={pazzleWords[currentWordIndex].word} pazzleWord={pazzleWords[currentWordIndex]} next={handleNext}/>;
            // return <EndCard onClick={()=>{}}/>
        default:
            return <CurrentQuiz key={pazzleWords[currentWordIndex].word} pazzleWord={pazzleWords[currentWordIndex]} next={handleNext}/>;
    }
}