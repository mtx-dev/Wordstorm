import { IWord } from '../models/IWord';

type WordIdType = Pick<IWord, 'id'>

export interface IQuizResult {
    wordId: WordIdType; 
    success: boolean;
}