/* eslint-disable no-useless-constructor */
/*Up an down handlers an data */
import React from 'react';
// import {useState, useEffect} from 'react';
import './App.css';
import Card from './Card';

function App() {
  return (
      <>
        <Card />
        <Card />
        <Card />
      </>
  );
}



// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <Mouse 
//           render= {(data) => {
//             return (
//               <p> 
//                 {data.x}: {data.y}
//               </p>
//             );
//           }}
//         />
//       </header>
//     </div>
//   );
// }

export default App;
