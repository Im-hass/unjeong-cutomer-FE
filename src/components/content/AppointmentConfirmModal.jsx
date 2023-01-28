import React from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import classNames from 'classnames/bind';

import styles from './appointmentConfirmModal.module.scss';
import { addAppointment } from '../../store/api/appointment';

const cx = classNames.bind(styles);

function AppointmentConfirmModal({ appointmentInfo, setOpenModal }) {
  const navigate = useNavigate();

  const clickCancelBtnHandler = () => {
    setOpenModal(false);
  };
  const submitHandler = () => {
    addAppointment(appointmentInfo)
      .then(() => {
        navigate('/appointmentDone', { state: appointmentInfo });
      })
      .catch(err => {
        toast.error(err.response.data.errorMessage);
        navigate('/appointment');
      });
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
              <dd>{appointmentInfo.name}</dd>
            </div>
            <div className={cx('content-li')}>
              <dt>연락처</dt>
              <dd>{appointmentInfo.phone}</dd>
            </div>
            <div className={cx('content-li')}>
              <dt>상담종류</dt>
              <dd>
                {appointmentInfo.appointmentType === 'CALL'
                  ? '전화상담'
                  : '방문상담'}
              </dd>
            </div>
            <div className={cx('content-li')}>
              <dt>상담인원</dt>
              <dd>{appointmentInfo.numberOfPeople}명</dd>
            </div>
            <div className={cx('content-li')}>
              <dt>상담날짜</dt>
              <dd>
                {appointmentInfo.appointmentDate} /{' '}
                {appointmentInfo.appointmentHour}:00
              </dd>
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
          <button
            type='button'
            className={cx('cancel-btn')}
            onClick={clickCancelBtnHandler}
          >
            취소
          </button>
        </div>
      </div>
    </>
  );
}

export default AppointmentConfirmModal;
