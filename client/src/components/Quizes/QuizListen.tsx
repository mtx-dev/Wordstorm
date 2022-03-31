import React, { useState, FormEvent, useRef } from 'react';
import QuizCard from '../../common/layout/quizCard/QuizCard';
import { Button, Row, Form } from 'react-bootstrap';
import useAsyncEffect from '../../hoocks/useAsyncEffect';
import { IQuizProps } from '../../models/IQuizProps';

import { skipedChars } from '../../constants';

enum Playback {
    Pending = 'Pending',
	Play = 'Play',
	Pause = 'Pause',
	Resume = 'Resume',
}

const splitByWords = (str: string): string[] => {
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

export default function QuizListen({pazzleWord, next}: IQuizProps): JSX.Element {
    const inputClasses = ['text-light', 'bg-dark', 'border'];
	const wordForm = useRef<HTMLFormElement>();
    const [playback, setPlaybak] = useState<Playback>(Playback.Pending);
    const [hasVoice, setHasVioce] = useState<boolean>(false);
    const [allowNext, setAllowNext] = useState<boolean>(false);
    const [isAnswerRight, setIsAnswerRight] = useState<boolean>(true);
    
    speech.text = pazzleWord.word;
    const splitedPazzle = splitByWords(pazzleWord.word);

    // const [isAnswerCorrect, setIsAnswerCorrect] = useState<boolean>();
    
    inputClasses.push(!allowNext ? 'border-secondary' 
            : isAnswerRight ? 'border-success' : 'border-danger');

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
		if (!wordForm.current) return;

        setAllowNext(true);
        const answer: string = wordForm.current.answer
            .value.trim().toLocaleLowerCase();
        const splitedAnswer = splitByWords(answer);

        const result = splitedPazzle.every(
            (item, index) => item === splitedAnswer[index]
        );

        if (isAnswerRight) {
            setIsAnswerRight(result);
        }
    };

    const handleNextWord = () => {
        setPlaybak(Playback.Play)
        // wordForm.current.answer.value = '';
		next(isAnswerRight);
    }

    return (
        <QuizCard
            title='Listen and write' 
            pazzle={pazzleWord.translation} 
            disabledNext={!allowNext} 
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