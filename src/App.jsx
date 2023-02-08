import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

import './app.scss';
import Header from './components/common/Header';
import Menu from './components/common/Menu';
import Main from './pages/Main';
import AppointmentDate from './pages/AppointmentDate';
import AppointmentForm from './pages/AppointmentForm';
import AppointmentDone from './pages/AppointmentDone';
import StoreInfo from './components/content/StoreInfo';
import ProductInfo from './components/content/ProductInfo';
import StoreLocation from './components/content/StoreLocation';
import AppointmentHistory from './pages/AppointmentHistory';
import AppointmentConfirm from './components/content/AppointmentConfirm';

function App() {
  return (
    <div className='wrap'>
      <div className='top'>
        <Header />
        {/* <Nav /> */}
      </div>
      <div className='container-wrap'>
        <Routes>
          <Route path='/' element={<Main />}>
            <Route index element={<StoreInfo />} />
            <Route path='productInfo' element={<ProductInfo />} />
            <Route path='storeLocation' element={<StoreLocation />} />
          </Route>
          <Route path='appointment' element={<AppointmentDate />} />
          <Route path='appointmentForm' element={<AppointmentForm />} />
          <Route path='appointmentDone' element={<AppointmentDone />} />
          <Route path='appointmentConfirm' element={<AppointmentHistory />}>
            <Route index element={<AppointmentConfirm />} />
            {/* <Route path='change' element={<AppointmentChange />} />
            <Route path='cancel' element={<StoreLocationCancel />} /> */}
          </Route>
        </Routes>
      </div>
      <Menu />
      <Toaster
        containerStyle={{
          top: 30,
        }}
        toastOptions={{
          duration: 2000,
        }}
      />
    </div>
  );
}

export default App;
