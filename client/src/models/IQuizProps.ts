import { IWord } from "./IWord";
import { IQuizResult } from "./StatisticTypes";
export type NextFunc = (statistic: IQuizResult[]) => void;

export interface IQuizProps {
    words: IWord[];
    next: NextFunc;
}