import React from 'react';
import classNames from 'classnames/bind';

import styles from './title.module.scss';

const cx = classNames.bind(styles);

function Title({ txt }) {
  return (
    <div className={cx('wrap')}>
      <h2>{txt}</h2>
    </div>
  );
}

export default Title;
