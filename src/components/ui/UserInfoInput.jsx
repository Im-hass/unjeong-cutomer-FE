import React, { useCallback, useRef, useState } from 'react';
import classNames from 'classnames/bind';

import styles from '../../pages/appointmentForm.module.scss';

const cx = classNames.bind(styles);
const MAX_LENGTH = 11;

function UserInfoInput({
  inputType,
  inputId,
  labelContent,
  userInfo,
  appointmentInfo,
  setAppointmentInfo,
}) {
  const inputRef = useRef();
  const [inputValue, setInputValue] = useState('');

  const inputChangeHandler = useCallback(() => {
    setInputValue(inputRef.current.value);
    if (inputId === 'name')
      setAppointmentInfo({ ...appointmentInfo, name: inputRef.current.value });
    else if (inputId === 'phone') {
      if (inputRef.current.value.length >= MAX_LENGTH) {
        setInputValue(inputRef.current.value.substr(0, MAX_LENGTH));
        setAppointmentInfo({
          ...appointmentInfo,
          phone: inputRef.current.value.substr(0, MAX_LENGTH),
        });
      }
    } else setAppointmentInfo(inputValue);
  }, [inputId, appointmentInfo]);

  return (
    <div className={cx('input-wrap')}>
      <label htmlFor={inputId} className={cx('left')}>
        {labelContent}
      </label>
      <input
        type={inputType}
        id={inputId}
        placeholder={
          userInfo && inputId === 'name' ? userInfo?.name : userInfo?.phone
        }
        className={cx('right', 'input')}
        ref={inputRef}
        onChange={inputChangeHandler}
        disabled={userInfo}
        pattern={inputId === 'phone' ? '^\\d{10,11}$' : undefined}
        title={inputId === 'phone' ? 'ex) 010-1234-5678' : undefined}
        required
        value={inputValue}
      />
    </div>
  );
}

export default UserInfoInput;
