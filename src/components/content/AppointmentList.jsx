import React from 'react';
import classNames from 'classnames/bind';
import AppointmentItem from '../ui/AppointmentItem';

import styles from './appointmentList.module.scss';

const cx = classNames.bind(styles);

function AppointmentList() {
  return (
    <div className={cx('appointmentList-wrap')}>
      <div className={cx('info-wrap')}>
        <div className={cx('name-wrap')}>
          <span className={cx('name')}>OOO</span>
          <span>님의 예약정보</span>
        </div>
        <ul className={cx('types')}>
          <li className={cx('standby')}>상담대기중</li>
          <li className={cx('cancelled')}>예약취소됨</li>
          <li className={cx('completed')}>상담완료</li>
        </ul>
        <div>※ 예약변경/취소는 상담대기중인 경우에만 가능합니다</div>
      </div>

      <div className={cx('items-wrap')}>
        <AppointmentItem />
        <AppointmentItem />
        <AppointmentItem />
      </div>
    </div>
  );
}

export default AppointmentList;
