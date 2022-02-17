export type WordStatus = 'unknown' | 'stydy' | 'learned'
export interface IUser {
    id: number;
    word: string
    transaltion: string;
    status: WordStatus;
    lastStudy: Date;
    attempts: number;
    successfulAttempts: number;
    active: boolean;
}