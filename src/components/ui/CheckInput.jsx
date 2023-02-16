import React, { useCallback } from 'react';
import classNames from 'classnames/bind';

import styles from './checkInput.module.scss';
import { CheckIcon } from '../../assets/svg';

const cx = classNames.bind(styles);

function CheckInput({ clickNotChangeBtn, setClickNotChangeBtn }) {
  const notChangeBtnClickHandler = useCallback(
    e => {
      setClickNotChangeBtn(e.currentTarget.checked);
    },
    [clickNotChangeBtn],
  );

  return (
    <div className={cx('checkbox-wrap')}>
      <div className={cx('check-wrap')}>
        <input type='checkbox' id='check' onChange={notChangeBtnClickHandler} />
        <CheckIcon className={cx('icon')} />
      </div>
      <label htmlFor='check'>날짜와 시간을 변경하지 않음</label>
    </div>
  );
}

export default CheckInput;
