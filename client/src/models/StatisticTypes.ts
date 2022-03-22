import { IWord } from '../models/IWord';

export interface IQuizResult {
    wordId: IWord['id']; 
    success: boolean;
}