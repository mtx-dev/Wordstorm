import React, { useState, FormEvent, useRef } from "react";
import { Button, Card, Row, Col, Form } from "react-bootstrap";
import useAsyncEffect from "../hoocks/useAsyncEffect";
import { IQuizProps } from "../models/IQuizProps";
import { IQuizResult } from '../models/StatisticTypes';

enum Playback {
	Play = 'Play',
	Pause = 'Pause',
	Resume = 'Resume',
}

const skipedChars = [' ', ','];

const prepareToCompare = (str: string): string[] => {
    const skippedCharsWithoutSpace = skipedChars.filter(c => c !== ' ');
    const reg = new RegExp(`[${skippedCharsWithoutSpace.join('')}]`, 'g');
    const clearStr = str.replace(reg,'').replace(/\s\s+/g, ' ');
    return clearStr.split(' ');
}

const speech = new SpeechSynthesisUtterance();
// let voices = [];
// window.speechSynthesis.onvoiceschanged = () => {
//     voices = window.speechSynthesis.getVoices();
//     speech.voice = voices[3];
//   };
speech.lang = 'en';
// speech.voice = voices[93];
// speech.voice = voices[102];
// console.log(voices?.filter(v=>v.lang==='en'));
// console.log(voices);
console.log(window.speechSynthesis.getVoices());
speech.rate = 1;
speech.pitch = 1;
speech.volume = 1;

export default function QuizListen({words, next}: IQuizProps): JSX.Element {
    const inputClasses = ['text-light', 'bg-dark', 'border'];
	const wordForm = useRef<HTMLFormElement>();
    const [currentWordIndex, setCurrentWordIndex] = useState(0);
    speech.text = words[currentWordIndex].word;
    // speech.text = 'Received Pronunciation'
    const currentWords = prepareToCompare(words[currentWordIndex].word);

    const [playback, setPlaybak] = useState<Playback>(Playback.Play);
    const [isGetAnswer, setIsGetAnswer] = useState<boolean>(false);
    const [isAnswerRight, setIsAnswerRight] = useState<boolean>();
    
    inputClasses.push(!isGetAnswer ? 'border-secondary' :
        isAnswerRight ? 'border-success' : 'border-danger');
    useAsyncEffect(async()=>{
        const vioces:any[] = await window.speechSynthesis.getVoices();
        speech.voice = vioces[3];
        console.log(vioces[0]);
        console.log(speech);
    },[]);
    const defaultResults = words.map((word): IQuizResult => {
            return {
                wordId: word.id, 
                success: true,
            }
        });
    const [results, setResults] = useState<IQuizResult[]>(defaultResults)
    
    speech.onend = () => {setPlaybak(Playback.Play)}

	const handlePlayback = () => {
		switch (playback) {
			case Playback.Play:
                window.speechSynthesis.speak(speech);
				setPlaybak(Playback.Pause)
				break;
			case Playback.Pause:
                window.speechSynthesis.pause();
				setPlaybak(Playback.Resume)
				break;
			case Playback.Resume:
                window.speechSynthesis.resume();
				setPlaybak(Playback.Play)
				break;
			default:
                window.speechSynthesis.cancel();
				break;
		}
	}
    const handleEnterWord = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (wordForm.current){
            setIsGetAnswer(true);
			// console.log(wordForm.current.answer.value);
			const answer: string = wordForm.current.answer.value
                .trim().toLocaleLowerCase();
			// console.log(answer);
            const clearAnswer = prepareToCompare(answer);
            // console.log(clearAnswer);
            if (results[currentWordIndex].success) {
                const newResults = [...results];
                const result = currentWords.every(
                    (item, index) => item === clearAnswer[index]
                );
                setIsAnswerRight(result);
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
        setIsAnswerRight(undefined);
        setIsGetAnswer(false);
        setCurrentWordIndex(currentWordIndex + 1);
    }

    return (
        <Card bg='dark' className='p-3'>
            <Card.Header>
                <Row>
                    <Col>
                        Listen and write
                    </Col>
                    <Col md='auto'>
                        <Button 
                            variant={isGetAnswer ? 'primary' : 'outline-secondary'}
                            disabled={!isGetAnswer}
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
				<Row className='p-2 mb-5 text-light d-flex justify-content-center'>
					<Button 
                        variant='primary' 
                        onClick={handlePlayback} 
                        disabled={!!speech.voice}
                    >
						{playback}
					</Button>
				</Row>
				<Form onSubmit={handleEnterWord} ref={wordForm}>
					<Form.Group controlId="answer">
						<Form.Control type='text' className={inputClasses.join(' ')}/>
					</Form.Group>
				</Form>
            </Card.Body>
        </Card>
    );
}