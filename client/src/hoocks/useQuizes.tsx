import { useContext } from 'react';
import QuizTranslate from '../components/QuizTranslate';
import { Context, StoreContextType } from '../context/Context';


const useQuizes = (): JSX.Element[] => {
    const { user }= useContext<StoreContextType>(Context);
	// TODO  filter y name or voice ...
	// getQuizes().filter((q)=>console.log(q))	
    return [QuizTranslate];
}

export default useQuizes;