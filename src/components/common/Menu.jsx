import React from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';

import styles from './menu.module.scss';
import {
  StoreBtn,
  ReservationBtn,
  ReservationConfirmBtn,
} from '../../assets/svg/index';

const cx = classNames.bind(styles);

function Menu() {
  return (
    <ul className={cx('wrap')}>
      <li>
        <Link to='/' className={cx('active')}>
          <StoreBtn className={cx('icon')} />
          <span>가게정보</span>
        </Link>
      </li>
      <li>
        <Link to='Reservation' className={cx('active')}>
          <ReservationBtn className={cx('icon')} />
          <span>예약하기</span>
        </Link>
      </li>
      <li>
        <Link to='reservationConfirm'>
          <ReservationConfirmBtn className={cx('icon')} />
          <span>예약확인</span>
        </Link>
      </li>
    </ul>
  );
}

export default Menu;
