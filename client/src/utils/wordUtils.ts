import { IWord } from '../models/IWord';

const milisecondsOfDay = 1000*60*60*24
const maxQuizWords = 7;
const limits: Record<number, number> ={
    0: 0,
    1: 2,
    2: 2,
    3: 1,
    4: 0,
}

export function filterToStudy(vocabulary: IWord[]): IWord[] {
    const counters: number[] = [0, 0, 0, 0, 0];
    const currentDate = new Date();

    const allows: IWord[] = vocabulary.filter((w:IWord) => {
        if (!w.active || w.status !== 'learned') return false;
    })

    const actuals = allows.filter((w)=> {
        const daysPassed = Math.abs(Math.round(
            (currentDate.getTime() - w.lastSuccessful.getTime())/milisecondsOfDay
        ));
        switch (w.successfulAttempts) {
            case 1:
                return daysPassed >= 1;
            case 2:
                return daysPassed >= 6;
            case 3:
                return daysPassed >= 25;
            default:
                return false;
        }
    });

    const resultWords = actuals.reduce((limitedWords, w) => {
        counters[w.successfulAttempts] += 1;
        if (counters[w.successfulAttempts] >
            limits[w.successfulAttempts]) {
				return limitedWords;
		}
		limitedWords.push(w);
        return limitedWords 
    },[]);

    const additionNewWords = actuals
        .filter((w)=> w.successfulAttempts === 0)
        .slice(0,resultWords.length - maxQuizWords)

    resultWords.push(...additionNewWords);
	return resultWords;
}