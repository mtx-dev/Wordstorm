import React, { useState, FormEvent, useRef } from 'react';
import QuizCard from '../../common/layout/quizCard/QuizCard';
import { Button, Row, Form } from 'react-bootstrap';
import useAsyncEffect from '../../hoocks/useAsyncEffect';
import { IQuizProps } from '../../models/IQuizProps';
import { IQuizResult } from '../../models/StatisticTypes';

import { skipedChars } from '../../constants';

enum Playback {
    Pending = 'Pending',
	Play = 'Play',
	Pause = 'Pause',
	Resume = 'Resume',
}

const prepareToCompare = (str: string): string[] => {
    const skippedCharsWithoutSpace = skipedChars.filter(c => c !== ' ');
    const reg = new RegExp(`[${skippedCharsWithoutSpace.join('')}]`, 'g');
    const clearStr = str.replace(reg,'').replace(/\s\s+/g, ' ');
    return clearStr.split(' ');
}

const getVoices = ():  Promise<any[]>  => {
    return new Promise(resolve => {
      window.speechSynthesis.onvoiceschanged = _e => {
        resolve(window.speechSynthesis.getVoices());
      }
      window.speechSynthesis.getVoices();
    })
  }

const speech = new SpeechSynthesisUtterance();
speech.lang = 'en';
speech.rate = 1;
speech.pitch = 1;
speech.volume = 1;
// let voices = [];

// speech.voice = voices[93];
// speech.voice = voices[102];
// console.log(voices?.filter(v=>v.lang==='en'));
// console.log(voices);
// console.log(window.speechSynthesis.getVoices());

export default function QuizListen({words, next}: IQuizProps): JSX.Element {
    const inputClasses = ['text-light', 'bg-dark', 'border'];
	const wordForm = useRef<HTMLFormElement>();
    const [currentWordIndex, setCurrentWordIndex] = useState(0);
    
    speech.text = words[currentWordIndex].word;
    const currentWords = prepareToCompare(words[currentWordIndex].word);

    const [playback, setPlaybak] = useState<Playback>(Playback.Pending);
    const [hasVoice, setHasVioce] = useState<boolean>(false);
    const [allowNextWord, setAllowNextWord] = useState<boolean>(false);
    const [isAnswerCorrect, setIsAnswerCorrect] = useState<boolean>();
    
    inputClasses.push(!allowNextWord ? 'border-secondary' :
        isAnswerCorrect ? 'border-success' : 'border-danger');

    useAsyncEffect(async() => {
        const voices = await getVoices();
        console.log('voices', voices);
        if (!voices[93]) speech.voice = voices[3];
        else speech.voice = voices[93];
        if (!!speech.voice) {
            setHasVioce(true);
            setPlaybak(Playback.Play);
        }
    }, []);

    const defaultResults = words.map((word): IQuizResult => {
        return {
            wordId: word.id, 
            success: true,
        }
    });
    const [results, setResults] = useState<IQuizResult[]>(defaultResults)
    
    speech.onend = () => { setPlaybak(Playback.Play) }

	const handlePlayback = () => {
		switch (playback) {
			case Playback.Play:
                window.speechSynthesis.speak(speech);
				setPlaybak(Playback.Pause);
				break;
			case Playback.Pause:
                window.speechSynthesis.pause();
				setPlaybak(Playback.Resume);
				break;
			case Playback.Resume:
                window.speechSynthesis.resume();
				setPlaybak(Playback.Play);
				break;
			default:
                window.speechSynthesis.cancel();
				break;
		}
	}

    const handleEnterWord = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (wordForm.current){
            setAllowNextWord(true);
			const answer: string = wordForm.current.answer.value
                .trim().toLocaleLowerCase();
            const clearAnswer = prepareToCompare(answer);
            if (results[currentWordIndex].success) {
                const newResults = [...results];
                const result = currentWords.every(
                    (item, index) => item === clearAnswer[index]
                );
                setIsAnswerCorrect(result);
                newResults[currentWordIndex].success = result;
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
        setPlaybak(Playback.Play)
        setIsAnswerCorrect(undefined);
        setAllowNextWord(false);
        setCurrentWordIndex(currentWordIndex + 1);
        wordForm.current.answer.value = '';
    }

    return (
        <QuizCard
            title='Listen and write' 
            pazzle={words[currentWordIndex].translation} 
            disabledNext={!allowNextWord} 
            handleNextWord={handleNextWord}
        >
            <Row className='p-2 mb-5 text-light d-flex justify-content-center'>
                <Button 
                    variant='primary' 
                    onClick={handlePlayback} 
                    disabled={!hasVoice}
                >
                    {playback}
                </Button>
            </Row>
            <Form onSubmit={handleEnterWord} ref={wordForm}>
                <Form.Group controlId='answer'>
                    <Form.Control 
                        type='text' 
                        className={inputClasses.join(' ')} 
                    />
                </Form.Group>
            </Form>
        </QuizCard>
    );
}