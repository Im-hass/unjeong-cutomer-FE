/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState } from 'react';
import classNames from 'classnames/bind';

import styles from './appointmentItem.module.scss';
import { CloseArrow, OpenArrow } from '../../assets/svg';

const cx = classNames.bind(styles);
const state = 'standby';
function AppointmentItem() {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div className={cx('appointmentItem-wrap')}>
      <div className={cx('title', state)} onClick={handleOpen}>
        <span>2022-12-19</span>
        <span>13:00</span>
        {isOpen ? <OpenArrow /> : <CloseArrow />}
      </div>
      {isOpen && (
        <div className={cx('more')}>
          <ul>
            <li>
              <span>예약상태</span>
              <span>상담대기중</span>
            </li>
            <li>
              <span>상담종류</span>
              <span>전화상담</span>
            </li>
            <li>
              <span>인원</span>
              <span>1명</span>
            </li>
          </ul>

          <div className={cx('btn-wrap')}>
            <button type='button'>예약변경</button>
            <button type='button'>예약취소</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default AppointmentItem;
