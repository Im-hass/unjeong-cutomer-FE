import React from 'react';
import classNames from 'classnames/bind';

import styles from './main.module.scss';
import StoreInfo from '../components/content/StoreInfo';
import ProductInfo from '../components/content/ProductInfo';
import StoreLocation from '../components/content/StoreLocation';

const cx = classNames.bind(styles);

function Main() {
  return (
    <div className={cx('main-wrap')}>
      {/* <StoreInfo /> */}
      {/* <ProductInfo /> */}
      <StoreLocation />
    </div>
  );
}

export default Main;
