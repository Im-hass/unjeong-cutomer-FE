import React from 'react';
import classNames from 'classnames/bind';

import styles from './main.module.scss';
import StoreInfo from '../components/content/StoreInfo';

const cx = classNames.bind(styles);

function Main() {
  return (
    <div className={cx('main-wrap')}>
      <StoreInfo />
    </div>
  );
}

export default Main;
