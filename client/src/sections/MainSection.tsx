import React from 'react';
import UserService from '../services/UserServoce';

export default function MainSection() {
    const handl = async () => {
        try {
            const users = await UserService.getUsers();
            console.log(users.data);
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <div>
            <button onClick={handl}>get</button>
            main
        </div>
    );
}