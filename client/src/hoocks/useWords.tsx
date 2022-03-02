import { useContext } from 'react';
import { Context, StoreContextType } from '../context/Context';
import { IWord } from '../models/IWord';
import { filterToStudy } from '../utils/wordUtils';


const useWords = ():IWord[] => {
    const { vocabulary }= useContext<StoreContextType>(Context);
    return filterToStudy(vocabulary);
}

export default useWords;