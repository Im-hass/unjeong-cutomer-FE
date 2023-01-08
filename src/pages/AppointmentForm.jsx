/* eslint-disable react/no-array-index-key */
import React, { useState, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import classNames from 'classnames/bind';

import styles from './appointmentForm.module.scss';
import { DownArrowBtn } from '../assets/svg/index';
import Pagination from '../components/common/Pagination';
import Title from '../components/common/Title';
import AppointmentConfirmModal from '../components/content/AppointmentConfirmModal';

const cx = classNames.bind(styles);
const NUMBER = [1, 2, 3, 4, 5, 6, 7, 8, 9];

function AppointmentForm() {
  const nameRef = useRef();
  const phoneRef = useRef();

  const navigate = useNavigate();
  const location = useLocation();

  const [appointmentInfo, setAppointmentInfo] = useState({
    name: '',
    phone: '',
    appointmentType: 'CALL',
    numberOfPeople: 1,
    appointmentDate: '2022-12-19',
    appointmentHour: 13,
    personalInformationCollectionAndUsageAgreement: true,
    privacyPolicyRead: true,
  });
  const [clickKind, setClickKind] = useState('tel');
  const [openModal, setOpenModal] = useState(false);

  const clickKindBtnHandler = e => {
    setClickKind(e.target.name);
  };

  const submitHandler = e => {
    e.preventDefault();
    setOpenModal(true);
  };

  return (
    <>
      {openModal && <AppointmentConfirmModal />}
      <div className={cx('wrap')}>
        <Pagination pageNum={2} />
        <Title name='예약하기' />
        <form onSubmit={submitHandler}>
          <div className={cx('name-wrap', 'input-wrap')}>
            <label htmlFor='name' className={cx('left')} ref={nameRef}>
              이름
            </label>
            <input type='text' id='name' className={cx('right', 'input')} />
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
            />
          </div>
          <div className={cx('kind-wrap', 'input-wrap')}>
            <span className={cx('left')}>상담종류</span>
            <div className={cx('btn-wrap', 'right')}>
              <button
                type='button'
                className={cx(clickKind === 'CALL' ? 'active' : '')}
                name='CALL'
                onClick={clickKindBtnHandler}
              >
                전화상담
              </button>
              <button
                type='button'
                className={cx(clickKind === 'VISIT' ? 'active' : '')}
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
            <select className={cx('right', 'input')}>
              {NUMBER.map((num, i) => (
                <option key={`num-${i}`} name={i}>
                  {num}
                </option>
              ))}
            </select>
            <DownArrowBtn className={cx('icon')} />
          </div>
          <div className={cx('terms-wrap')}>
            <div className={cx('all-agree-wrap')}>
              <input type='checkbox' id='allAgree' />
              <label htmlFor='allAgree'>전부 동의</label>
            </div>
            <div className={cx('term')}>
              <input type='checkbox' id='term1' />
              <label htmlFor='term1'>
                (필수)<strong>개인정보 수집 및 이용 동의</strong>
              </label>
              <button type='button'>상세</button>
            </div>
            <div className={cx('term')}>
              <input type='checkbox' id='term2' />
              <label htmlFor='term2'>
                (필수) <strong>개인정보 처리방침 읽음 여부</strong>
              </label>
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
