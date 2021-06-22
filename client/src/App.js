/* eslint-disable no-useless-constructor */
/*Up an down handlers an data */
import {useState, useEffect} from 'react';
import './App.css';

import Cities from './CitiesList';
import City from './City';

function App() {
  const [cities, setCities] = useState([
    {name: 'Chicago', description: 'bandit'},
    {name: 'New-York', description: 'Money'},
    {name: 'Las Vegas', description: 'Fun'},
  ]);

  const [currentIndex, setCurrentIndex] = useState(0);

  const [timer, setTimer] = useState(0)
  useEffect(() => {
    const flagInterval = setTimeout(() => {
      console.log('fire');
      setTimer(timer+1);
    }, 1000);
    // console.log(flagInterval);
    // return () => clearTimeout(flagInterval);
  });

  const handlerChangeCity = (description) => {
    const updateCities = [...cities];
    updateCities[currentIndex].description = description;
    setCities(updateCities);
  }

  // const handlerChangeCity = (indexCity, description) => {
  //   setCities(
  //     cities.map((city, index) => {
  //         if (index === indexCity){
  //           return {
  //             ...city, 
  //             description,
  //           };            
  //         }
  //         return city;
  //     })
  //   );
  // }

  const handlerSelectCity = (index) => {
    setCurrentIndex(index)
  };

  return (
    <div className="App">
      <header className="App-header">
        <City
          city={cities[currentIndex]}
          onChangeCity={handlerChangeCity}
        />
        <Cities
          cities={cities}
          onSelectCity={handlerSelectCity}
        />
        <p>{timer}</p>
      </header>
    </div>
  );
}

export default App;
