/* eslint-disable react/no-array-index-key */
import React, { useEffect, useState, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import toast from 'react-hot-toast';
import classNames from 'classnames/bind';

import styles from './appointmentForm.module.scss';
import { DownArrowIcon, CheckIcon } from '../assets/svg/index';
import Pagination from '../components/common/Pagination';
import Title from '../components/common/Title';
import AppointmentConfirmModal from '../components/content/AppointmentConfirmModal';
import Nav from '../components/common/Nav';

const cx = classNames.bind(styles);
const NUMBER = [1, 2, 3, 4, 5, 6, 7, 8, 9];

function AppointmentForm() {
  const nameRef = useRef();
  const phoneRef = useRef();

  const location = useLocation();

  const [openModal, setOpenModal] = useState(false);
  const [appointmentInfo, setAppointmentInfo] = useState({
    name: '',
    phone: '',
    appointmentType: 'CALL',
    numberOfPeople: 1,
    appointmentDate: '',
    appointmentHour: 0,
    personalInformationCollectionAndUsageAgreement: false,
    privacyPolicyRead: false,
  });

  useEffect(() => {
    setAppointmentInfo({
      ...appointmentInfo,
      appointmentDate: location.state.date,
      appointmentHour: location.state.time,
    });
  }, []);

  const inputChangeHandler = e => {
    const nameValue = nameRef.current.value;
    const phoneValue = phoneRef.current.value;

    if (e.target.id === 'name')
      setAppointmentInfo({ ...appointmentInfo, name: nameValue });
    else setAppointmentInfo({ ...appointmentInfo, phone: phoneValue });
  };

  const clickKindBtnHandler = e => {
    setAppointmentInfo({ ...appointmentInfo, appointmentType: e.target.name });
  };

  const peopleChangeHandler = e => {
    setAppointmentInfo({ ...appointmentInfo, numberOfPeople: e.target.value });
  };

  const termClickHandler = e => {
    const { id } = e.target;
    if (id === 'term1')
      setAppointmentInfo({
        ...appointmentInfo,
        personalInformationCollectionAndUsageAgreement:
          !appointmentInfo.personalInformationCollectionAndUsageAgreement,
      });
    else if (id === 'term2')
      setAppointmentInfo({
        ...appointmentInfo,
        privacyPolicyRead: !appointmentInfo.privacyPolicyRead,
      });
  };

  const submitHandler = e => {
    e.preventDefault();
    if (
      appointmentInfo.personalInformationCollectionAndUsageAgreement &&
      appointmentInfo.privacyPolicyRead
    )
      setOpenModal(true);
    else toast.error('필수 동의를 체크해주세요.');
  };

  return (
    <>
      {openModal && (
        <AppointmentConfirmModal
          appointmentInfo={appointmentInfo}
          setOpenModal={setOpenModal}
        />
      )}
      <div className={cx('wrap')}>
        <Pagination pageNum={2} />
        <Title name='예약하기' />
        <form onSubmit={submitHandler}>
          <div className={cx('name-wrap', 'input-wrap')}>
            <label htmlFor='name' className={cx('left')}>
              이름
            </label>
            <input
              type='text'
              id='name'
              className={cx('right', 'input')}
              ref={nameRef}
              onChange={inputChangeHandler}
              required
            />
          </div>
          <div className={cx('phone-wrap', 'input-wrap')}>
            <label htmlFor='phone' className={cx('left')}>
              연락처
            </label>
            <input
              type='tel'
              id='phone'
              placeholder='ex) 010-1234-5678'
              className={cx('right', 'input')}
              ref={phoneRef}
              onChange={inputChangeHandler}
              pattern='^\d{3}-\d{3,4}-\d{4}$'
              title='ex) 010-1234-5678'
              required
            />
          </div>
          <div className={cx('kind-wrap', 'input-wrap')}>
            <span className={cx('left')}>상담종류</span>
            <div className={cx('btn-wrap', 'right')}>
              <button
                type='button'
                className={cx(
                  appointmentInfo.appointmentType === 'CALL' ? 'active' : '',
                )}
                name='CALL'
                onClick={clickKindBtnHandler}
              >
                전화상담
              </button>
              <button
                type='button'
                className={cx(
                  appointmentInfo.appointmentType === 'VISIT' ? 'active' : '',
                )}
                name='VISIT'
                onClick={clickKindBtnHandler}
              >
                방문상담
              </button>
            </div>
          </div>
          <div className={cx('number-wrap', 'input-wrap')}>
            <label htmlFor='number' className={cx('left')}>
              상담인원
            </label>
            <select
              className={cx('right', 'input')}
              onChange={peopleChangeHandler}
            >
              {NUMBER.map((num, i) => (
                <option key={`num-${i}`} name={i}>
                  {num}
                </option>
              ))}
            </select>
            <DownArrowIcon className={cx('icon')} />
          </div>
          <div className={cx('terms-wrap')}>
            <div className={cx('term')}>
              <div className={cx('term-left')}>
                <div className={cx('checkbox-wrap')}>
                  <input
                    type='checkbox'
                    id='term1'
                    onClick={termClickHandler}
                    defaultChecked={
                      appointmentInfo.personalInformationCollectionAndUsageAgreement
                    }
                  />
                  <CheckIcon className={cx('icon')} />
                </div>
                <label htmlFor='term1'>
                  <span>(필수)</span> 개인정보 수집 및 이용 동의
                </label>
              </div>
              <button type='button'>상세</button>
            </div>
            <div className={cx('term')}>
              <div className={cx('term-left')}>
                <div className={cx('checkbox-wrap')}>
                  <input
                    type='checkbox'
                    id='term2'
                    onClick={termClickHandler}
                    defaultChecked={appointmentInfo.privacyPolicyRead}
                  />
                  <CheckIcon className={cx('icon')} />
                </div>
                <label htmlFor='term2'>
                  <span>(필수)</span> 개인정보 처리방침 읽음 여부
                </label>
              </div>
              <button type='button'>상세</button>
            </div>
          </div>
          <button type='submit' className={cx('submit-btn')}>
            예약확정
          </button>
        </form>
      </div>
    </>
  );
}

export default AppointmentForm;
