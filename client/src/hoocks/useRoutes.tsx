import React from 'react';
import {Routes, Route} from 'react-router-dom';
import CabinetSection from '../sections/CabinetSection';
import MainSection from '../sections/MainSection';
import NotFoundSection from '../sections/NotFoundSection';
import VocabularySection from '../sections/VocabularySection';

export default function useRoutes() {
    return(
        <Routes>  
            <Route path='/user'  element={ <VocabularySection />}>
                <Route path='voabulary'  element={ <VocabularySection />} />
                <Route path='cabinet'  element={ <CabinetSection />} />
            </Route>
            <Route path='/'  element={ <MainSection />} />
            <Route path='*'  element={ <NotFoundSection />} />
        </Routes>
    )   
}