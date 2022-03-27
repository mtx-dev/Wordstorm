import React, { useState, useEffect } from 'react';
import { Card } from 'react-bootstrap';
import QuizCard from '../../common/layout/quizCard/QuizCard';

import { IQuizProps } from '../../models/IQuizProps';
import { IQuizResult } from '../../models/StatisticTypes';
import { shuffle } from '../../utils/shuffle';
import LettersList from '../../common/layout/lettersList/LettersList';

import { skipedChars } from '../../constants';

export default function QuizSpell({words, next}: IQuizProps): JSX.Element {
    const [currentWordIndex, setCurrentWordIndex] = useState(0);
    const currentWordLetters = words[currentWordIndex].word.split('');
    
    const [pazzleList, setPazzleList] = useState<string[]>([]);
    const [currentRihgtLetterIndex, setCurrentRightLetterIndex] = useState(0);
    const [clickedIndex, setClickedIndex] = useState<number>();
    const [allowNextWord, setAllowNextWord] = useState<boolean>(false);
    const defaultResults = words.map((word): IQuizResult => {
        return {
            wordId: word.id,
            success: true,
        }
    });

    const [results, setResults] = useState<IQuizResult[]>(defaultResults)
    
	const currentRightLetter = currentWordLetters[currentRihgtLetterIndex];

    // const isAnswerRight = currentRihgtLetterIndex >= currentWordLetters.length;

    // console.log('isAnswerRight', isAnswerRight, currentRihgtLetterIndex, currentWordLetters.length);

    useEffect(() => {
        const resultList = currentWordLetters
			.filter((char) => !skipedChars.includes(char));
        setPazzleList(shuffle(resultList));
    }, [currentWordIndex]);

    useEffect(() => {
        if (currentRihgtLetterIndex >= currentWordLetters.length) {
            setAllowNextWord(true);
        }        
    }, [currentRihgtLetterIndex]);

    const getNextRihgtLetterIndex = ():number => {
        let index = currentRihgtLetterIndex +1
        while (skipedChars.includes(currentWordLetters[index])
            && index < currentWordLetters.length) {
            index++;
        }
        return index;
    }

    const hadleClick = (e: React.MouseEvent<HTMLElement>) => {
        const target = e.target as HTMLButtonElement;
        // console.log(target);
        const choosenLetterIndex = Number(target.dataset.index);
        if (!isNaN(choosenLetterIndex)) {
            setClickedIndex(choosenLetterIndex);
            // console.log('let', pazzleList[choosenLetterIndex]);
            // console.log('chek', pazzleList[choosenLetterIndex] === currentRightLetter);
            if (pazzleList[choosenLetterIndex] === currentRightLetter) {
                console.log(getNextRihgtLetterIndex());
                setCurrentRightLetterIndex(getNextRihgtLetterIndex());
                return;
            }
            if (results[currentWordIndex].success) {
                const newResults = [...results];
                newResults[currentWordIndex].success = false;
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
        setPazzleList([]);
        setClickedIndex(undefined);
        setCurrentRightLetterIndex(0);
        setCurrentWordIndex(currentWordIndex + 1);
    }

    const dislpayResult = currentWordLetters
        .slice(0, currentRihgtLetterIndex).join('') 
        ?? '\u00A0'

    return (
        <QuizCard
            title='Translate to English'
            pazzle={words[currentWordIndex].translation} 
            disabledNext={!allowNextWord} 
            handleNextWord={handleNextWord}
        >
            <Card.Title className='p-2 text-primary d-flex justify-content-center height40'>
                {dislpayResult}
            </Card.Title>
            <LettersList 
                onClick={hadleClick}
                list={pazzleList}
                currentRightLetter={currentRightLetter}
                clickedIndex={clickedIndex}
            />
        </QuizCard>
    );
}