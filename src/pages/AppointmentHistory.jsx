import React from 'react';
import classNames from 'classnames/bind';

import { Outlet } from 'react-router-dom';
import styles from './appointmentHistory.module.scss';

const cx = classNames.bind(styles);

function AppointmentHistory() {
  return (
    <div className={cx('appointmentHistory-wrap')}>
      <Outlet />
    </div>
  );
}

export default AppointmentHistory;
