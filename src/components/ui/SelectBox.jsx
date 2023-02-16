/* eslint-disable react/no-array-index-key */
import React, { useCallback } from 'react';
import classNames from 'classnames/bind';

import styles from '../../pages/appointmentForm.module.scss';
import { DownArrowIcon } from '../../assets/svg';

const cx = classNames.bind(styles);
const NUMBER = [1, 2, 3, 4, 5, 6, 7, 8, 9];

function SelectBox({
  userInfo,
  appointmentInfo,
  setAppointmentInfo,
  changeAppointmentInfo,
  setChangeAppointmentInfo,
}) {
  const peopleChangeHandler = useCallback(
    e => {
      setAppointmentInfo({
        ...appointmentInfo,
        numberOfPeople: Number(e.target.value),
      });
      if (userInfo)
        setChangeAppointmentInfo({
          ...changeAppointmentInfo,
          numberOfPeople: Number(e.target.value),
        });
    },
    [appointmentInfo, changeAppointmentInfo],
  );
  return (
    <div className={cx('number-wrap', 'input-wrap')}>
      <label htmlFor='number' className={cx('left')}>
        상담인원
      </label>
      <select className={cx('right', 'input')} onChange={peopleChangeHandler}>
        {NUMBER.map((num, i) => (
          <option key={`num-${i}`} name={i}>
            {num}
          </option>
        ))}
      </select>
      <DownArrowIcon className={cx('icon')} />
    </div>
  );
}

export default SelectBox;
