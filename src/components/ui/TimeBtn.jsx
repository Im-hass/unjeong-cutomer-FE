import React, { useCallback } from 'react';
import classNames from 'classnames/bind';

import styles from './timeBtn.module.scss';

const cx = classNames.bind(styles);

function TimeBtn({ time, clickTimeBtn, setClickTimeBtn }) {
  const timeClickHandler = useCallback(
    e => {
      const clickTime = Number(e.currentTarget.name);
      setClickTimeBtn(clickTime);
    },
    [clickTimeBtn],
  );

  return (
    <li className={cx('time-wrap')}>
      <button
        type='button'
        name={time.time}
        className={cx(
          clickTimeBtn === time.time ? 'active' : '',
          !time.isAvailable ? 'disable' : '',
        )}
        disabled={!time.isAvailable}
        onClick={timeClickHandler}
      >
        {time.time}:00
      </button>
    </li>
  );
}

export default TimeBtn;
