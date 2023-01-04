/* eslint-disable react/no-array-index-key */
import React, { useState } from 'react';
import classNames from 'classnames/bind';

import styles from './reservationForm.module.scss';
import { DownArrowBtn } from '../assets/svg/index';
import Pagination from '../components/common/Pagination';
import Title from '../components/common/Title';
import ReservationConfirmModal from '../components/content/ReservationConfirmModal';

const cx = classNames.bind(styles);
const NUMBER = [1, 2, 3, 4, 5, 6, 7, 8, 9];

function ReservationForm() {
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
      <ReservationConfirmModal />
      {/* {openModal && <ReservationConfirmModal />} */}
      <div className={cx('wrap')}>
        <Pagination />
        <Title />
        <form onSubmit={submitHandler}>
          <div className={cx('name-wrap', 'input-wrap')}>
            <label htmlFor='name' className={cx('left')}>
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
                className={cx(clickKind === 'tel' ? 'active' : '')}
                name='tel'
                onClick={clickKindBtnHandler}
              >
                전화상담
              </button>
              <button
                type='button'
                className={cx(clickKind === 'store' ? 'active' : '')}
                name='store'
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
                <option key={`num-${i}`}>{num}</option>
              ))}
            </select>
            <DownArrowBtn className={cx('icon')} />
          </div>
          <button type='submit' className={cx('submit-btn')}>
            예약확정
          </button>
        </form>
      </div>
    </>
  );
}

export default ReservationForm;
