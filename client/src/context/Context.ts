import { AxiosResponse } from 'axios';
import { createContext } from 'react';
import { IUser } from '../models/IUser';
import { IWord } from '../models/IWord';

export type AuthInFunc = (email: string, password: string, callback?: VoidFunction) => Promise<void>;
export type AuthOutFunc = (callback?: VoidFunction) => Promise<void>;
export type SaveStatFunc = (statistc: IWord[]) => Promise<void>;
export type GetVocabularyFunc = () => Promise<void>;
export type AddWordFunc = (word: string, translation: string) => Promise<AxiosResponse<IWord>>;
export type DisableWordFunc = (word: IWord) => Promise<AxiosResponse<IWord>>;

export interface StoreContextType {
    isLoading: boolean;
    isAuth: boolean;
    user: IUser;
    login: AuthInFunc;
    registration: AuthInFunc;
    logout: AuthOutFunc;
    vocabulary: IWord[];
    saveStatistic: SaveStatFunc;
    getVocabulary: GetVocabularyFunc,
    addWord: AddWordFunc;
    disableWord: DisableWordFunc;
  }

export const Context = createContext<StoreContextType>(null!);
