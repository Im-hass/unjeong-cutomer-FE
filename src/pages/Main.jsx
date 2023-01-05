import React from 'react';
import classNames from 'classnames/bind';

import styles from './main.module.scss';
import StoreInfo from '../components/content/StoreInfo';
import ProductInfo from '../components/content/ProductInfo';

const cx = classNames.bind(styles);

function Main() {
  return (
    <div className={cx('main-wrap')}>
      {/* <StoreInfo /> */}
      <ProductInfo />
    </div>
  );
}

export default Main;
