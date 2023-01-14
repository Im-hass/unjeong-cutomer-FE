import React from 'react';
import classNames from 'classnames/bind';

import styles from './appointmentConfirm.module.scss';
import Title from '../common/Title';

const cx = classNames.bind(styles);

function AppointmentConfirm() {
  return (
    <div className={cx('appointmentConfirm-wrap')}>
      <Title name='예약확인' />

      <form>
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

        <button type='submit' className={cx('submit-btn')}>
          예약조회
        </button>
      </form>
    </div>
  );
}

export default AppointmentConfirm;
