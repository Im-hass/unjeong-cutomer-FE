import React from 'react';
import { useNavigate } from 'react-router-dom';
import classNames from 'classnames/bind';

import styles from './appointmentConfirmModal.module.scss';

const cx = classNames.bind(styles);

function AppointmentConfirmModal() {
  const navigate = useNavigate();

  const submitHandler = () => {
    navigate('/appointmentDone');
  };

  return (
    <>
      <div className={cx('backdrop')} />
      <div className={cx('modal-wrap')}>
        <h2>
          아래의 정보로 <br />
          <strong>예약하시겠습니까?</strong>
        </h2>
        <div className={cx('content-wrap')}>
          <dl>
            <div className={cx('content-li')}>
              <dt>이름</dt>
              <dd>홍길동</dd>
            </div>
            <div className={cx('content-li')}>
              <dt>연락처</dt>
              <dd>010-1234-5678</dd>
            </div>
            <div className={cx('content-li')}>
              <dt>상담종류</dt>
              <dd>전화상담</dd>
            </div>
            <div className={cx('content-li')}>
              <dt>상담인원</dt>
              <dd>1명</dd>
            </div>
            <div className={cx('content-li')}>
              <dt>상담날짜</dt>
              <dd>2022-12-22 / 13:00</dd>
            </div>
          </dl>
        </div>
        <div className={cx('btn-wrap')}>
          <button
            type='button'
            className={cx('submit-btn')}
            onClick={submitHandler}
          >
            예약하기
          </button>
          <button type='button' className={cx('cancel-btn')}>
            취소
          </button>
        </div>
      </div>
    </>
  );
}

export default AppointmentConfirmModal;
