import React from 'react';
import classNames from 'classnames/bind';

import styles from './button.module.scss';

const cx = classNames.bind(styles);

function Button({ content }) {
  return (
    <button type='submit' className={cx('button')}>
      {content}
    </button>
  );
}

export default Button;
