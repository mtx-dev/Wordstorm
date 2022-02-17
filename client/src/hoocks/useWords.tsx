import { Context, StoreContextType } from "../context/Context";
import useVocabulary from "./useVocabulary";
import Word from '../models/Word';

const useWords = ():Word[] => {
    const {isAuth, user, login, logout, registration} = useVocabulary<StoreContextType>(Context);
    return  {isAuth, user, login, logout, registration};
}

export default useWords;