import React from 'react';
import classNames from 'classnames/bind';

import styles from './nav.module.scss';

const cx = classNames.bind(styles);

function Nav() {
  return (
    <nav className={cx('wrap')}>
      <ul>
        <li>
          <button type='button' className={cx('active')}>
            가게정보
          </button>
        </li>
        <li>
          <button type='button'>상품정보</button>
        </li>
        <li>
          <button type='button'>가게위치</button>
        </li>
      </ul>
    </nav>
  );
}

export default Nav;
