import React, { useState } from 'react';
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
          <StoreBtn className={cx('icon')} />
          <span>가게정보</span>
        </Link>
      </li>
      <li>
        <Link
          to='Reservation'
          className={cx(clickMenu === 'reservation' ? 'active' : '')}
          name='reservation'
          onClick={clickMenuHandler}
        >
          <ReservationBtn className={cx('icon')} />
          <span>예약하기</span>
        </Link>
      </li>
      <li>
        <Link
          to='reservationConfirm'
          className={cx(clickMenu === 'confirm' ? 'active' : '')}
          name='confirm'
          onClick={clickMenuHandler}
        >
          <ReservationConfirmBtn className={cx('icon')} />
          <span>예약확인</span>
        </Link>
      </li>
    </ul>
  );
}

export default Menu;
