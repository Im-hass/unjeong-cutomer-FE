import React from 'react';
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
        <button type='button' className={cx('active')}>
          <StoreBtn className={cx('icon')} />
          <span>가게정보</span>
        </button>
      </li>
      <li>
        <button type='button'>
          <ReservationBtn className={cx('icon')} />
          <span>예약하기</span>
        </button>
      </li>
      <li>
        <button type='button'>
          <ReservationConfirmBtn className={cx('icon')} />
          <span>예약확인</span>
        </button>
      </li>
    </ul>
  );
}

export default Menu;
