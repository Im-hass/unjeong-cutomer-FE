import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Button from './components/common/Button';

import Header from './components/common/Header';
import Menu from './components/common/Menu';
import Nav from './components/common/Nav';
import Main from './pages/Main';

function App() {
  return (
    <div>
      <Header />
      <Nav />
      <Routes>
        <Route path='/' element={<Main />} />
        {/* <Route path='reservation' element={<Reservation />} /> */}
        {/* <Route path='reservationConfirm' element={<ReservationConfirm />} /> */}
      </Routes>
      <Menu />
    </div>
  );
}

export default App;
