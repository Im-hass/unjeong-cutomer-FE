import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import classNames from 'classnames/bind';

import styles from './confirmAlert.module.scss';
import {
  addAppointment,
  cancelAppointment,
  changeAppointment,
} from '../../store/api/appointment';

const cx = classNames.bind(styles);

function ConfirmAlert({
  page,
  alertInfo,
  userInfo,
  appointmentInfo,
  changeAppointmentInfo,
  setOpenAlert,
  appointmentCode,
}) {
  const navigate = useNavigate();
  const [appointmentType, setAppointmentType] = useState();

  useEffect(() => {
    if (changeAppointmentInfo?.appointmentType) {
      setAppointmentType(changeAppointmentInfo.appointmentType);
    } else {
      setAppointmentType(appointmentInfo.appointmentType);
    }
  }, []);

  const clickCancelBtnHandler = useCallback(() => {
    setOpenAlert(false);
  }, [setOpenAlert]);

  const submitHandler = useCallback(() => {
    if (page === 'create') {
      addAppointment(appointmentInfo)
        .then(() => {
          navigate('/appointmentDone', { state: appointmentInfo });
        })
        .catch(err => {
          toast.error(err.response.data.errorMessage);
        });
    }
    if (page === 'changeConfirm') {
      const params = {
        userInfo,
        appointmentInfo,
      };
      navigate('/appointment', { state: params });
    }

    if (page === 'change') {
      const params = {
        page: 'change',
        userInfo,
        appointmentInfo,
        changeAppointmentInfo,
      };
      changeAppointment(appointmentCode, changeAppointmentInfo)
        .then(() => {
          navigate('/appointmentDone', { state: params });
        })
        .catch(err => {
          toast.error(err.response.data.errorMessage);
        });
    }

    if (page === 'cancel') {
      cancelAppointment(appointmentInfo.appointmentCode)
        .then(() => {
          toast.success('예약취소 되었습니다.');
          setOpenAlert(false);
        })
        .catch(err => {
          toast.error(err.response.data.errorMessage);
        });
    }
  }, [page, appointmentInfo]);

  return (
    <>
      <div className={cx('backdrop')} />
      <div className={cx('modal-wrap')}>
        <h2>
          {alertInfo.subTit} <br />
          <strong>{alertInfo.tit}</strong>
        </h2>
        <div className={cx('content-wrap')}>
          <dl>
            <div className={cx('content-li')}>
              <dt>이름</dt>
              <dd>
                {page === 'create' ? appointmentInfo.name : userInfo.name}
              </dd>
            </div>
            <div className={cx('content-li')}>
              <dt>연락처</dt>
              <dd>
                {page === 'create' ? appointmentInfo.phone : userInfo.phone}
              </dd>
            </div>
            <div
              className={cx(
                'content-li',
                changeAppointmentInfo?.appointmentType ? 'changed' : '',
              )}
            >
              <dt>상담종류</dt>
              <dd>{appointmentType === 'CALL' ? '전화상담' : '방문상담'}</dd>
            </div>
            <div
              className={cx(
                'content-li',
                changeAppointmentInfo?.numberOfPeople ? 'changed' : '',
              )}
            >
              <dt>상담인원</dt>
              <dd>
                {changeAppointmentInfo?.numberOfPeople
                  ? changeAppointmentInfo.numberOfPeople
                  : appointmentInfo.numberOfPeople}
                명
              </dd>
            </div>
            <div
              className={cx(
                'content-li',
                changeAppointmentInfo?.appointmentDate ? 'changed' : '',
              )}
            >
              <dt>상담날짜</dt>
              <dd>
                {changeAppointmentInfo?.appointmentDate
                  ? changeAppointmentInfo.appointmentDate
                  : appointmentInfo.appointmentDate}{' '}
                /{' '}
                {changeAppointmentInfo?.appointmentHour
                  ? changeAppointmentInfo.appointmentHour
                  : appointmentInfo.appointmentHour}
                :00
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
            {alertInfo.btnContent}
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
