import React from 'react';
import { Routes, Route } from 'react-router-dom';

import './app.scss';
import Header from './components/common/Header';
import Menu from './components/common/Menu';
import Nav from './components/common/Nav';
import Main from './pages/Main';
import ReservationDate from './pages/ReservationDate';
import ReservationForm from './pages/ReservationForm';

function App() {
  return (
    <div className='wrap'>
      <div className='top'>
        <Header />
        <Nav />
      </div>
      <div className='container-wrap'>
        <Routes>
          <Route path='/' element={<Main />} />
          <Route path='reservation' element={<ReservationDate />} />
          {/* <Route path='reservationConfirm' element={<ReservationConfirm />} /> */}
        </Routes>
      </div>
      <Menu />
    </div>
  );
}

export default App;
