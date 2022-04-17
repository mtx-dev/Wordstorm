import { useContext } from 'react';
import { Context, StoreContextType } from '../context/Context';


const useVocabulary = ():Partial<StoreContextType> => {
    const { vocabulary, addWord, disableWord } = useContext<StoreContextType>(Context);
    return { vocabulary, addWord, disableWord };
}

export default useVocabulary;