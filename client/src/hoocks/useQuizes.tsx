import { useContext } from 'react';
import QuizListen from '../components/Quizes/QuizListen';
import QuizReverseTranslate from '../components/Quizes/QuizReverseTranslate';
import QuizSpell from '../components/Quizes/QuizSpell';
import QuizTranslate from '../components/Quizes/QuizTranslate';
// import QuizTranslate from '../components/QuizTranslate';
import { Context, StoreContextType } from '../context/Context';
import { QuizType } from '../models/IQuiz';

const quizes2: QuizType[] = [
	// QuizTranslate,
	// QuizReverseTranslate,
	QuizListen,
	QuizSpell,
]

const useQuizes = (): QuizType[] => {
    const { user }= useContext<StoreContextType>(Context);
	// TODO  filter y name or voice ...
	// getQuizes().filter((q)=>console.log(q))	
    return quizes2;
}

export default useQuizes;