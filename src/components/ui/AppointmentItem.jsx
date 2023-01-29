/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState } from 'react';
import classNames from 'classnames/bind';

import styles from './appointmentItem.module.scss';
import { CloseArrow, OpenArrow } from '../../assets/svg';

const cx = classNames.bind(styles);
const state = 'standby';

function AppointmentItem({ list }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen(!isOpen);
  };
  return (
    <li className={cx('appointmentItem-wrap')}>
      <div className={cx('title', state)} onClick={handleOpen}>
        <span>{list.appointmentDate}</span>
        <span>{list.appointmentTime}:00</span>
        {isOpen ? <OpenArrow /> : <CloseArrow />}
      </div>
      {isOpen && (
        <div className={cx('more')}>
          <ul>
            <li>
              <span>예약상태</span>
              <span>{list.appointmentState}</span>
            </li>
            <li>
              <span>상담종류</span>
              <span>{list.appointmentType}</span>
            </li>
            <li>
              <span>인원</span>
              <span>{list.numberOfPeople}명</span>
            </li>
          </ul>

          <div className={cx('btn-wrap')}>
            <button type='button'>예약변경</button>
            <button type='button'>예약취소</button>
          </div>
        </div>
      )}
    </li>
  );
}

export default AppointmentItem;
