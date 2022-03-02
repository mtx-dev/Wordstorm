import { useContext } from "react";
import { Context, StoreContextType } from "../context/Context";
import { IWord } from "../models/IWord";


const useVocabulary = ():Partial<StoreContextType> => {
    const { vocabulary } = useContext<StoreContextType>(Context);
    return  { vocabulary };
}

export default useVocabulary;