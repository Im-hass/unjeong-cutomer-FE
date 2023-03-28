import React, { useState, useEffect, useCallback } from 'react';
import classNames from 'classnames/bind';

import styles from './dateBtn.module.scss';
import { getStoreHolidayInfo } from '../../store/api/storeInfo';

const cx = classNames.bind(styles);

function DateBtn({
  date,
  clickDateBtn,
  setClickDateBtn,
  clickDateBtnDay,
  setClickDateBtnDay,
}) {
  const [isHoliday, setIsHoliday] = useState(false);
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    setIsFetching(false);
    getStoreHolidayInfo().then(res => {
      const dateArr = ['일', '월', '화', '수', '목', '금', '토'];
      const storeHoliday = res.data.data.holidays;
      setIsHoliday(storeHoliday[dateArr.findIndex(el => el === date[2])]);
      setIsFetching(true);
    });
  }, [date]);

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
      {isFetching && (
        <button
          type='button'
          name={`${date[0]} ${date[1]} ${date[2]}`}
          className={cx(
            clickDateBtnDay === `${date[1]} ${date[2]}` ? 'active' : '',
            isHoliday ? 'disable' : '',
          )}
          disabled={isHoliday}
          onClick={dateClickHandler}
        >
          {date[1]} <span>({date[2]})</span>
        </button>
      )}
    </li>
  );
}

export default DateBtn;
