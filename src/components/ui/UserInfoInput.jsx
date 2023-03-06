import React, { useCallback, useRef } from 'react';
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
  const inputRef = useRef();

  const inputChangeHandler = useCallback(() => {
    const inputValue = inputRef.current.value;
    if (inputId === 'name')
      setAppointmentInfo({ ...appointmentInfo, name: inputValue });
    else if (inputId === 'phone')
      setAppointmentInfo({ ...appointmentInfo, phone: inputValue });
    else setAppointmentInfo(inputValue);
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
        pattern={inputId === 'phone' ? '^\\d{3}-\\d{3,4}-\\d{4}$' : undefined}
        title={inputId === 'phone' ? 'ex) 010-1234-5678' : undefined}
        required
      />
    </div>
  );
}

export default UserInfoInput;
