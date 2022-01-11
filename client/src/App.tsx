import React, { FC } from 'react';
import useRoutes from './hoocks/useRoutes';
import {BrowserRouter as Router} from 'react-router-dom'
import './App.css';

const  App: FC = () =>  {
  const routes = useRoutes(true);
  return (
    <div className="container">
      <h1>WordStorm</h1>
      <Router>
        {routes}
      </Router>
    </div>
  );
}

export default App;
