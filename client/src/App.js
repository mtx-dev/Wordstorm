/* eslint-disable no-useless-constructor */
/*Up an down handlers an data */
import React, {useState} from 'react';
import './App.css';

import Modal from './Modal';
import LoginForm from './LoginForm';

function App() {
  const [modalActive, setModalActive] = useState(false);
  return (
      <>
        <button onClick={() => setModalActive(true)}>modal</button>      

        <Modal active={modalActive}  setActive={setModalActive}> 
          <LoginForm/>
        </Modal>
      </>
  );
}

export default App;
