import React from 'react';
import { useNavigate } from "react-router-dom";
import { Button, Col, Row } from 'react-bootstrap';
import UserService from '../services/UserServoce';


export default function MainSection() {
    const navigate = useNavigate();
    const handl = async () => {
        try {
            const users = await UserService.getUsers();
            console.log(users.data);
        } catch (error) {
            console.log(error);
        }
    }
    const handleStart = () => navigate("/scud");
    return (
        <Col className='d-flex flex-column align-items-center justify-content-center'>
            <h1>WordStorm</h1>
            <Button onClick={handleStart}>start</Button>
        </Col>
    );
}