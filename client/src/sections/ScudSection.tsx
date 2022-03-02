import React, { useState } from 'react';
import QuizCard from '../components/QuizCard';
import useAsyncEffect from '../hoocks/useAsyncEffect';
import useQuizes from '../hoocks/useQuizes';
import useStatistic from '../hoocks/useStatistic';
import useWords from '../hoocks/useWords';
import { NextFunc } from '../models/IQuizProps';
import { IQuizResult } from '../models/StatisticTypes';

export default function ScudSection() {
    const words = useWords();
    const quizes = useQuizes();
    const defaultStatistic = words.reduce((result, word) => {
        result[word.id] = true;
        return result;
    }, {});

    const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
    const [isFinish, setIsFinish] = useState(false);
    const [unsuccessfull, setUnsuccessfull] = useState(defaultStatistic);
    const { saveStatistic } = useStatistic();
    // words from voca
    // quizes from setings

    const handleNext:NextFunc = (statistic) => {
        if (currentQuizIndex < quizes.length) {
            setCurrentQuizIndex(currentQuizIndex + 1);
            const newStatistic = {...unsuccessfull}
            statistic.filter((word) => !word.success)
                .forEach((word) => newStatistic[word.wordId] = word.success)
            setUnsuccessfull(newStatistic);
            return;
        }
        setIsFinish(true);        
    }

    useAsyncEffect(async () => {
        if (isFinish) {
            const updatedWords = words.map((word) => {
                word.attempts += 1;
                if (!unsuccessfull[word.id]) {
                    word.successfulAttempts += 1;
                    word.lastSuccessful = new Date ();
                } 
                return word;
            })
        await saveStatistic(updatedWords);
        }
    }, [isFinish]);

    const CurrentQuiz = quizes[currentQuizIndex];

    return (
        <QuizCard>
            <CurrentQuiz words={words} next={handleNext}/>
        </QuizCard>
    );
}