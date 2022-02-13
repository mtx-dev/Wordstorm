import { useContext } from "react";
import { Context, StoreContextType, AuthInFunc, AuthOutFunc } from "../context/Context";
import { IUser } from "../models/IUser";

export interface AuthContextType {
    isAuth: boolean;
    user: IUser;
    login: AuthInFunc;
    registration: AuthInFunc;
    logout: AuthOutFunc;
  }

const useAuth = ():AuthContextType => {
    const {isAuth, user, login, logout, registration} = useContext<StoreContextType>(Context);
    return  {isAuth, user, login, logout, registration};
}

export default useAuth;