import React from 'react';
import classNames from 'classnames/bind';

import styles from './appointmentHistory.module.scss';
import AppointmentConfirm from '../components/content/AppointmentConfirm';

const cx = classNames.bind(styles);

function AppointmentHistory() {
  return (
    <div className={cx('appointmentHistory-wrap')}>
      {/* 예약확인 */}
      <AppointmentConfirm />

      {/* 예약변경 */}

      {/* 예약취소 */}
    </div>
  );
}

export default AppointmentHistory;
