import React from 'react';
import classNames from 'classnames/bind';

import styles from './reservationDate.module.scss';
import { ReservationBtn, TimeBtn } from '../assets/svg';
import Pagination from '../components/common/Pagination';
import Title from '../components/common/Title';

const cx = classNames.bind(styles);

function ReservationDate() {
  return (
    <div className={cx('wrap')}>
      <Pagination />
      <Title txt='예약하기' />
      <form className={cx('date-wrap')}>
        <h3 className={cx('sub-tit')}>
          <ReservationBtn className={cx('icon')} />
          <span>날짜 선택</span>
        </h3>
        <ul className={cx('date-btn-wrap')}>
          <li>
            <button type='button' className={cx('active')}>
              1.3 <span>(화)</span>
            </button>
          </li>
          <li>
            <button type='button'>
              1.3 <span>(화)</span>
            </button>
          </li>
          <li>
            <button type='button'>
              1.3 <span>(화)</span>
            </button>
          </li>
          <li>
            <button type='button'>
              1.3 <span>(화)</span>
            </button>
          </li>
          <li>
            <button type='button'>
              1.3 <span>(화)</span>
            </button>
          </li>
          <li>
            <button type='button'>
              1.3 <span>(화)</span>
            </button>
          </li>
          <li className={cx('focus-box')} />
        </ul>
        <h3 className={cx('sub-tit')}>
          <TimeBtn className={cx('icon', 'time')} />
          <span>시간 선택</span>
        </h3>
        <ul className={cx('time-btn-wrap')}>
          <li>
            <button type='button' className={cx('active')}>
              10:00
            </button>
          </li>
          <li>
            <button type='button'>11:00</button>
          </li>
          <li>
            <button type='button'>12:00</button>
          </li>
          <li>
            <button type='button'>13:00</button>
          </li>
          <li>
            <button type='button'>14:00</button>
          </li>
          <li>
            <button type='button'>15:00</button>
          </li>
        </ul>
        <button type='submit' className={cx('submit-btn')}>
          다음으로
        </button>
      </form>
    </div>
  );
}

export default ReservationDate;
