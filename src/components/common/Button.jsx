import React from 'react';
import classNames from 'classnames/bind';

import styles from './button.module.scss';

const cx = classNames.bind(styles);

function Button() {
  return (
    <button type='button' className={cx('button')}>
      다음으로
    </button>
  );
}

export default Button;
