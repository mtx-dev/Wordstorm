import api from "../http";
import { AxiosResponse } from "axios";
import { IWord } from "../models/IWord";

export default class VocabularyServoce {
    static async getVocabulary(): Promise<AxiosResponse<IWord[]>> {
        return api.get<IWord[]>('/vocabulary');
    }

	static async addWord(word: string, transaltion: string): Promise<AxiosResponse<IWord>> {
        return api.post<IWord>('/vocabulary/add', {word, transaltion});
    }

	static async updateWord(word: IWord): Promise<AxiosResponse<IWord>> {
        return api.post<IWord>('/vocabulary/update', {word});
    }

	static async updateWords(words: IWord[]): Promise<AxiosResponse<IWord[]>> {
        return api.post<IWord[]>('/vocabulary/update', words);
    }
}