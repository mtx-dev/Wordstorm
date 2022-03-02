export type WordStatusType = 'unknown' | 'stydy' | 'learned'
export interface IWord {
    id: number;
    word: string
    transaltion: string;
    status: WordStatusType;
    lastSuccessful: Date;
    attempts: number;
    successfulAttempts: number;
    active: boolean;
}