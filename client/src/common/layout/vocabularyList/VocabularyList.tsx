import React from 'react';
import { Col, Container, ListGroup } from 'react-bootstrap';
import { IWord } from '../../../models/IWord';
import VocabularyItem from './VocabularyItem';

export default function VocabularyList({ wordsList }: {wordsList: IWord[]}) {
    const buildList = wordsList.map(( wordItem )=>{
        return <VocabularyItem  key={wordItem.word} wordItem={wordItem} />
    });
    return (
        <ListGroup>
            {buildList}
        </ListGroup>
    );
}