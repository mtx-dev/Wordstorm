import React, { useEffect, useState } from "react";
import useAsyncEffect from "../hoocks/useAsyncEffect";
import QuizCard from '../components/QuizCard';

import { IQuizProps } from "../models/IQuizProps";
import { IQuizResult } from '../models/StatisticTypes';
import { randomIndex } from "../utils/random";
import WordsList from "./WordsList";
import WordsListItem from "./WordsListItem";
import DictionaryServoce from '../services/DictionaryServoce';

const maxWordsVariants = 4

export default function QuizTranslate({words, next}: IQuizProps): JSX.Element {
    const [currentWordIndex, setCurrentWordIndex] = useState(0);
    const currentWord = words[currentWordIndex].word;
    
    const [pazzleList, setPazzleList] = useState<string[]>([]);
    const [choosenWord, setChoosenWord] = useState('');
    
    const defaultResults = words.map((word): IQuizResult => {
        return {
            wordId: word.id,
            success: true,
        }
    });
    const [results, setResults] = useState<IQuizResult[]>(defaultResults)
    const [allowNextWord, setAllowNextWord] = useState<boolean>(false);

    // Rework to return result
    const isAnswerRight = currentWord === choosenWord;
    
    useEffect(() => {
        if (currentWord === choosenWord) {
            setAllowNextWord(true);
        }        
    }, [choosenWord]);

    useAsyncEffect(() => {
        const fakeWords = DictionaryServoce
            .getFakeWords(currentWord)
            .map(item => item.word);
        const resultList = [...fakeWords];
        const rightAnswerIndex = randomIndex(maxWordsVariants - 1);
        resultList.splice(rightAnswerIndex, 0, currentWord);
        setPazzleList(resultList);
    }, [currentWordIndex]);

    const handleClick = (e: React.MouseEvent<HTMLElement>) => {
        console.log(results);
        const target = e.target as HTMLButtonElement;
        const choosen = target.dataset.value;
        if (choosen) {
            console.log(choosen, currentWord);
            setChoosenWord(choosen);
            if (results[currentWordIndex].success) {
                const newResults = [...results];
                newResults[currentWordIndex].success = currentWord === choosen;
                setResults(newResults);
            }
        }
    };

    const handleNextWord = () => {
        if (currentWordIndex === words.length - 1) {
            console.log('====', results);
            // next(results);
            return;
        }
        setChoosenWord('');
        setAllowNextWord(false);
        setPazzleList([]);
        setCurrentWordIndex(currentWordIndex + 1);
    }

    const buldList = pazzleList.map((item, index)=>
        <WordsListItem 
            key={index}
            text={item}
            isRight={item === currentWord}
            checked={item === choosenWord}
        />
    );

    return (
        <QuizCard
            title='Translate to English'
            pazzle={words[currentWordIndex].translation} 
            disabledNext={!allowNextWord} 
            handleNextWord={handleNextWord}
        >
            <WordsList onClick={handleClick}>
                {buldList}
            </WordsList>
        </QuizCard>
    );
}