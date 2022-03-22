import React, { useState } from "react";
import useAsyncEffect from "../hoocks/useAsyncEffect";
import { Button, Card, Row, Col } from "react-bootstrap";
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
    const isAnswerRight = currentWord === choosenWord;

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
        <Card bg='dark' className='p-3'>
            <Card.Header>
                <Row>
                    <Col>
                        Translate to English
                    </Col>
                    <Col md='auto'>
                        <Button 
                            variant={isAnswerRight ? 'primary' : 'outline-secondary'}
                            disabled={!isAnswerRight}
                            onClick={handleNextWord}
                        >
                            next
                        </Button>
                    </Col>
                </Row>
            </Card.Header>
            <Card.Body>
                <Card.Title className='p-2 text-light d-flex justify-content-center'>
                    {words[currentWordIndex].translation}
                </Card.Title>
                <WordsList onClick={handleClick}>
                    {buldList}
                </WordsList>
            </Card.Body>
        </Card>
    );
}