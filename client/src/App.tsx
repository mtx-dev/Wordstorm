import React, { createContext, FC } from 'react';
import useRoutes from './hoocks/useRoutes';
import {BrowserRouter as Router} from 'react-router-dom'
import './App.css';

// export const Context = createContext({
//   store,
// })

const  App: FC = () =>  {
  const routes = useRoutes();
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
