import React from 'react';
import { Routes, Route } from 'react-router-dom';

import './app.scss';
import Header from './components/common/Header';
import Menu from './components/common/Menu';
import Nav from './components/common/Nav';
import Main from './pages/Main';
import AppointmentDate from './pages/AppointmentDate';
import AppointmentForm from './pages/AppointmentForm';
import AppointmentDone from './pages/AppointmentDone';

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
          <Route path='appointment' element={<AppointmentDate />} />
          <Route path='appointmentForm' element={<AppointmentForm />} />
          <Route path='appointmentDone' element={<AppointmentDone />} />
          {/* <Route path='appointmentConfirm' element={<AppointmentConfirm />} /> */}
        </Routes>
      </div>
      <Menu />
    </div>
  );
}

export default App;
