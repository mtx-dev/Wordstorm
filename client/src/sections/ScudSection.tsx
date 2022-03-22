import React, { useState } from 'react';
import QuizCard from '../components/QuizCard';
import QuizListen from '../components/QuizListen';
import QuizReverseTranslate from '../components/QuizReverseTranslate';
import QuizSpell from '../components/QuizSpell';
import QuizTranslate from '../components/QuizTranslate';
import useAsyncEffect from '../hoocks/useAsyncEffect';
import useQuizes from '../hoocks/useQuizes';
import useStatistic from '../hoocks/useStatistic';
import useWords from '../hoocks/useWords';
import { NextFunc } from '../models/IQuizProps';
import { IWord } from '../models/IWord';
import { IQuizResult } from '../models/StatisticTypes';

const words: IWord[] = [
    {id: 1, word: 'home,   house', 
    translation: 'dom1', 
    status: 'stydy', lastSuccessful: null,  attempts: 0, successfulAttempts: 0,  active: true,},
    {id: 2, word: 'house', 
    translation: 'dom2', 
    status: 'stydy', lastSuccessful: null,  attempts: 0, successfulAttempts: 0,  active: true,},
    {id: 3, word: 'cabin', 
    translation: 'dom3', 
    status: 'stydy', lastSuccessful: null,  attempts: 0, successfulAttempts: 0,  active: true,},
    {id: 4, word: 'appartaments', 
    translation: 'dom4', 
    status: 'stydy', lastSuccessful: null,  attempts: 0, successfulAttempts: 0,  active: true,},
    {id: 5, word: 'hostel', 
    translation: 'dom5', 
    status: 'stydy', lastSuccessful: null,  attempts: 0, successfulAttempts: 0,  active: true,},
    {id: 6, word: 'hotel', 
    translation: 'dom6', 
    status: 'stydy', lastSuccessful: null,  attempts: 0, successfulAttempts: 0,  active: true,},
    {id: 7, word: 'cotage', 
    translation: 'dom7', 
    status: 'stydy', lastSuccessful: null,  attempts: 0, successfulAttempts: 0,  active: true,},
    {id: 8, word: 'villa', 
    translation: 'dom8', 
    status: 'stydy', lastSuccessful: null,  attempts: 0, successfulAttempts: 0,  active: true,},
];

export default function ScudSection() {

    // const words = useWords();
    // const quizes = useQuizes();
    // const defaultStatistic = words.reduce((result, word) => {
    //     result[word.id] = true;
    //     return result;
    // }, {});

    // const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
    // const [isFinish, setIsFinish] = useState(false);
    // const [unsuccessfull, setUnsuccessfull] = useState(defaultStatistic);
    // const { saveStatistic } = useStatistic();
    // words from voca
    // quizes from setings

    const handleNext:NextFunc = (statistic) => {
        // if (currentQuizIndex < quizes.length) {
        //     setCurrentQuizIndex(currentQuizIndex + 1);
        //     const newStatistic = {...unsuccessfull}
        //     statistic.filter((word) => !word.success)
        //         .forEach((word) => newStatistic[word.wordId] = word.success)
        //     setUnsuccessfull(newStatistic);
        //     return;
        // }
        // setIsFinish(true);        
    }

    // useAsyncEffect(async () => {
    //     if (isFinish) {
    //         const updatedWords = words.map((word) => {
    //             word.attempts += 1;
    //             if (!unsuccessfull[word.id]) {
    //                 word.successfulAttempts += 1;
    //                 word.lastSuccessful = new Date ();
    //             } 
    //             return word;
    //         })
    //     await saveStatistic(updatedWords);
    //     }
    // }, [isFinish]);

    // const CurrentQuiz = quizes[currentQuizIndex];

    return (
        <QuizCard>
            {/* <CurrentQuiz words={words} next={handleNext}/> */}
            {/* <QuizTranslate words={words} next={handleNext}/> */}
            {/* <QuizSpell words={words} next={handleNext}/> */}
            <QuizListen words={words} next={handleNext}/>
        </QuizCard>
    );
}