import React from "react";
import { Col, Row } from "react-bootstrap";

const QuizCard = ({ children }: { children: JSX.Element }) => {
  
    return (
        <Row className="justify-content-center">
            <Col className="col-4">
                {children}
            </Col>
        </Row>
    );
}

export default QuizCard;
