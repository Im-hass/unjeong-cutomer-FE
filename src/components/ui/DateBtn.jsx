import React, { useCallback } from 'react';
import classNames from 'classnames/bind';

import styles from './dateBtn.module.scss';

const cx = classNames.bind(styles);

function DateBtn({
  date,
  clickDateBtn,
  setClickDateBtn,
  clickDateBtnDay,
  setClickDateBtnDay,
}) {
  const dateClickHandler = useCallback(
    e => {
      const { name } = e.currentTarget;
      const tmpArr = name.split(' ');
      setClickDateBtnDay(`${tmpArr[1]} ${tmpArr[2]}`);
      setClickDateBtn(`${tmpArr[0]}-${tmpArr[1]}`);
    },
    [clickDateBtnDay, clickDateBtn],
  );

  return (
    <li className={cx('date-wrap')}>
      <button
        type='button'
        name={`${date[0]} ${date[1]} ${date[2]}`}
        className={cx(
          clickDateBtnDay === `${date[1]} ${date[2]}` ? 'active' : '',
          date[2] === '일' ? 'disable' : '',
        )}
        disabled={date[2] === '일'}
        onClick={dateClickHandler}
      >
        {date[1]} <span>({date[2]})</span>
      </button>
    </li>
  );
}

export default DateBtn;
