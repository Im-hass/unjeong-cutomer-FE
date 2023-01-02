import React from 'react';
import classNames from 'classnames/bind';

import styles from './title.module.scss';

const cx = classNames.bind(styles);

function Title() {
  return (
    <div className={cx('wrap')}>
      <h2>예약하기</h2>
    </div>
  );
}

export default Title;
