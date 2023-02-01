import React from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import classNames from 'classnames/bind';

import styles from './confirmAlert.module.scss';
import { addAppointment } from '../../store/api/appointment';

const cx = classNames.bind(styles);

function ConfirmAlert({
  page,
  info,
  appointmentInfo,
  enteredData,
  setOpenAlert,
}) {
  const navigate = useNavigate();

  const clickCancelBtnHandler = () => {
    setOpenAlert(false);
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
          {info.subTit} <br />
          <strong>{info.tit}</strong>
        </h2>
        <div className={cx('content-wrap')}>
          <dl>
            <div className={cx('content-li')}>
              <dt>이름</dt>
              <dd>
                {page === 'create' ? appointmentInfo.name : enteredData.name}
              </dd>
            </div>
            <div className={cx('content-li')}>
              <dt>연락처</dt>
              <dd>
                {page === 'create' ? appointmentInfo.phone : enteredData.phone}
              </dd>
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
            {info.btnContent}
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

export default ConfirmAlert;
