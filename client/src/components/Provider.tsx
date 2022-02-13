
import React, { useState } from 'react';
import AuthService from '../services/AuthServoce';
import { Context } from '../context/Context';
import { IUser } from '../models/IUser';
import useAsyncEffect from '../hoocks/useAsyncEffect';
import { StoreContextType } from '../context/Context';

export default function Provider(
        { children }: { children: React.ReactNode }
    ) {

    const [user, setUser] = useState<IUser>({} as IUser);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isAuth, setIsAuth] = useState<boolean>(false);

    const checkAuth = async () => {
        setIsLoading(true)
        try {
            // TODO Add error connection
            const response = await AuthService.refresh();
            localStorage.setItem('token', response.data.accessToken);
            setIsAuth(true);
            setUser(response.data.user)
        } catch (error: any) {
            console.log(error.response?.data?.message);
        } finally {
            setIsLoading(false);
        }
    }

    const login = async (email: string, password: string, callback = () => {}) => {
        try {
            // TODO Add error connection
            const response = await AuthService.login(email, password);
            localStorage.setItem('token', response.data.accessToken);
            setIsAuth(true);
            setUser(response.data.user)
            callback();
        } catch (error: any) {
            console.log(error.response?.data?.message);
        }
    }

    const registration = async (email: string, password: string, callback = () => {}) => {
        try {
            // TODO Add error connection
            const response = await AuthService.registration(email, password);
            localStorage.setItem('token', response.data.accessToken);
            setIsAuth(true);
            setUser(response.data.user);
            callback();
        } catch (error: any) {
            console.log(error.response?.data?.message);
        }
    }

    const logout = async (callback = () => {}) => {
        try {
            // TODO Add error connection
            await AuthService.logout();
            localStorage.removeItem('token');
            setIsAuth(false);
            setUser({} as IUser);
            callback();
        } catch (error: any) {
            console.log(error.response?.data?.message);
        }
    }

    useAsyncEffect(()=>{
        if (localStorage.getItem('token')) checkAuth();
    }, []);

    const value:StoreContextType = { 
        isLoading,
        isAuth, 
        user, 
        login,
        logout, 
        registration
    };

    return (
        <Context.Provider value={value}>
            {children}
        </Context.Provider>
    );
}