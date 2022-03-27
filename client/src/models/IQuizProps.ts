import { IWord } from './IWord';
export type NextFunc = (result:boolean) => void;

export interface IQuizProps {
    pazzleWord: IWord; 
    next: NextFunc;
}