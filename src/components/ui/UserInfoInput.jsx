/* eslint-disable no-nested-ternary */
import React, { useCallback } from 'react';
import classNames from 'classnames/bind';

import styles from '../../pages/appointmentForm.module.scss';

const cx = classNames.bind(styles);

function UserInfoInput({
  inputType,
  inputId,
  labelContent,
  userInfo,
  appointmentInfo,
  setAppointmentInfo,
}) {
  const userPlaceholder =
    userInfo && inputId === 'name' ? userInfo?.name : userInfo?.phone;
  const placeholder =
    !userInfo && inputId === 'name' ? 'ex) 홍길동' : 'ex) 01012345678';

  const inputChangeHandler = useCallback(
    e => {
      const { value } = e.target;
      if (inputId === 'name')
        setAppointmentInfo({ ...appointmentInfo, name: value });
      if (inputId === 'phone') {
        setAppointmentInfo({
          ...appointmentInfo,
          phone: value.replace(/[^0-9]/g, ''),
        });
      }
      if (inputId === 'appointmentNumber') setAppointmentInfo(value);
    },
    [inputId, appointmentInfo],
  );

  return (
    <div className={cx('input-wrap')}>
      <label htmlFor={inputId} className={cx('left')}>
        {labelContent}
      </label>
      <input
        type={inputType}
        id={inputId}
        placeholder={
          userInfo
            ? userPlaceholder
            : inputId === 'appointmentNumber'
            ? ''
            : placeholder
        }
        className={cx('right', 'input')}
        value={appointmentInfo[inputId]}
        maxLength={inputId === 'phone' ? '11' : ''}
        onChange={inputChangeHandler}
        disabled={userInfo}
        required
      />
    </div>
  );
}

export default UserInfoInput;
