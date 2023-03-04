import React, { useCallback } from 'react';
import classNames from 'classnames/bind';

import styles from './appointmentConfirmToggle.module.scss';

const cx = classNames.bind(styles);

function AppointmentConfirmToggle({ clickToggle, setClickToggle }) {
  const clickToggleHandler = useCallback(
    e => {
      setClickToggle(e.target.name);
    },
    [clickToggle],
  );

  return (
    <div className={cx('toggle-wrap')}>
      <button
        type='button'
        name='name'
        className={cx(clickToggle === 'name' ? 'active' : '', 'name')}
        onClick={clickToggleHandler}
      >
        이름/연락처로 조회
      </button>
      <button
        type='button'
        name='appointmentNumber'
        className={cx(
          clickToggle === 'appointmentNumber' ? 'active' : '',
          'appointment-number',
        )}
        onClick={clickToggleHandler}
      >
        예약번호로 조회
      </button>
      <span className={cx('bar')} />
    </div>
  );
}

export default AppointmentConfirmToggle;
