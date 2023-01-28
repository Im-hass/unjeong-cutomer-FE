import React from 'react';
import classNames from 'classnames/bind';

import { Outlet } from 'react-router-dom';
import styles from './appointmentHistory.module.scss';
import Nav from '../components/common/Nav';
import { APPOINTMENT_MENUS } from '../assets/data/MenuList';

const cx = classNames.bind(styles);

function AppointmentHistory() {
  return (
    <>
      <Nav menus={APPOINTMENT_MENUS} />

      <div className={cx('appointmentHistory-wrap')}>
        <Outlet />
      </div>
    </>
  );
}

export default AppointmentHistory;
