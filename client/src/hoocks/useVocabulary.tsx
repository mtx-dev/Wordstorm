import { useContext } from "react";
import { Context, StoreContextType } from "../context/Context";


const useVocabulary = ():Word[] => {
    const {vocabulary} = useContext<StoreContextType>(Context);
    return  {isAuth, user, login, logout, registration};
}

export default useVocabulary;