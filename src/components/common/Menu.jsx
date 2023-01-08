import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';

import styles from './menu.module.scss';
import {
  StoreIcon,
  AppointmentIcon,
  AppointmentConfirmIcon,
} from '../../assets/svg/index';

const cx = classNames.bind(styles);

function Menu() {
  const [clickMenu, setClickMenu] = useState('info');

  const clickMenuHandler = e => {
    setClickMenu(e.target.name);
  };
  return (
    <ul className={cx('wrap')}>
      <li>
        <Link
          to='/'
          className={cx(clickMenu === 'info' ? 'active' : '')}
          name='info'
          onClick={clickMenuHandler}
        >
          <StoreIcon className={cx('icon')} />
          <span>가게정보</span>
        </Link>
      </li>
      <li>
        <Link
          to='Appointment'
          className={cx(clickMenu === 'appointment' ? 'active' : '')}
          name='appointment'
          onClick={clickMenuHandler}
        >
          <AppointmentIcon className={cx('icon')} />
          <span>예약하기</span>
        </Link>
      </li>
      <li>
        <Link
          to='appointmentConfirm'
          className={cx(clickMenu === 'confirm' ? 'active' : '')}
          name='confirm'
          onClick={clickMenuHandler}
        >
          <AppointmentConfirmIcon className={cx('icon')} />
          <span>예약확인</span>
        </Link>
      </li>
    </ul>
  );
}

export default Menu;
