/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState } from 'react';
import classNames from 'classnames/bind';

import styles from './appointmentItem.module.scss';
import { CloseArrow, OpenArrow } from '../../assets/svg';

const cx = classNames.bind(styles);

function AppointmentItem({
  page,
  list,
  setOpenAlert,
  setClickAppointment,
  setPrevPage,
}) {
  const state = list.appointmentState;
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen(!isOpen);
  };

  const appointmentChangeBtnClickHandler = () => {
    setPrevPage('changeConfirm');
    setClickAppointment(list);
    setOpenAlert(true);
  };

  const appointmentCancelBtnClickHandler = () => {
    setPrevPage('cancel');
    setClickAppointment(list);
    setOpenAlert(true);
  };

  return (
    <li className={cx('appointmentItem-wrap')}>
      <div className={cx('title', state)} onClick={handleOpen}>
        <span>{list.appointmentDate}</span>
        <span>{list.appointmentHour}:00</span>
        {isOpen ? <CloseArrow /> : <OpenArrow />}
      </div>
      {isOpen && (
        <div className={cx('more')}>
          <ul>
            {page === 'view' && (
              <>
                <li>
                  <span>이름</span>
                  <span>{list.name}</span>
                </li>
                <li>
                  <span>연락처</span>
                  <span>{list.phone}</span>
                </li>
              </>
            )}
            <li>
              <span>예약상태</span>
              <span>
                {list.appointmentState === 'WAITING' && '상담대기중'}
                {list.appointmentState === 'CANCELED' && '예약취소됨'}
                {list.appointmentState === 'DONE' && '상담완료'}
              </span>
            </li>
            <li>
              <span>상담종류</span>
              <span>
                {list.appointmentType === 'CALL' ? '전화상담' : '방문상담'}
              </span>
            </li>
            <li>
              <span>인원</span>
              <span>{list.numberOfPeople}명</span>
            </li>
          </ul>

          {page === 'list' && (
            <div className={cx('btn-wrap')}>
              <button
                type='button'
                onClick={appointmentChangeBtnClickHandler}
                disabled={
                  list.appointmentState === 'CANCELED' ||
                  list.appointmentState === 'DONE'
                }
              >
                예약변경
              </button>
              <button
                type='button'
                onClick={appointmentCancelBtnClickHandler}
                disabled={
                  list.appointmentState === 'CANCELED' ||
                  list.appointmentState === 'DONE'
                }
              >
                예약취소
              </button>
            </div>
          )}
        </div>
      )}
    </li>
  );
}

export default AppointmentItem;
