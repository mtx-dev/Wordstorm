import api from "../http";
import { AxiosResponse } from "axios";
import { IDictionaryWord } from "../models/IDictionaryWord";

export default class DictionaryServoce {
    static async search(word: string): Promise<AxiosResponse<IDictionaryWord[]>> {
        return api.get<IDictionaryWord[]>('/dictionaryary/search', {params: {word}});
    }

	static  getFakeWords(word: string): IDictionaryWord[] {
        const fakeWords: IDictionaryWord[] = [
            { id: 23, word: 'hole', translation: '' },
            { id: 22, word: 'milk', translation: '' },
            { id: 21, word: 'done', translation: '' },
        ]; 
        return fakeWords;
        // return api.get<IDictionaryWord[]>('/dictionaryary/fake', {params: {word}});
    }

	static  getFakeTranslationWords(word: string): IDictionaryWord[] {
        const fakeWords: IDictionaryWord[] = [
            { id: 23, word: 'hole', translation: 'rus1' },
            { id: 22, word: 'milk', translation: 'rus2' },
            { id: 21, word: 'done', translation: 'rus3' },
        ]; 
        return fakeWords;
        // return api.get<IDictionaryWord[]>('/dictionaryary/fakeTranslation', {params: {word}});
    }


    
}