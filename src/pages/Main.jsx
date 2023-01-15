/* eslint-disable no-param-reassign */
import React from 'react';
import classNames from 'classnames/bind';

import { Outlet } from 'react-router-dom';
import styles from './main.module.scss';
import Nav from '../components/common/Nav';

const cx = classNames.bind(styles);
const menus = [
  { url: '/', text: '가게정보' },
  { url: '/productInfo', text: '상품정보' },
  { url: '/storeLocation', text: '가게위치' },
];

function Main() {
  return (
    <>
      <Nav menus={menus} />
      <div className={cx('main-wrap')}>
        <Outlet />
      </div>
    </>
  );
}

export default Main;
