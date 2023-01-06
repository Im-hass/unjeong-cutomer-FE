import React from 'react';
import classNames from 'classnames/bind';

import styles from './header.module.scss';
import logo from '../../assets/img/logo.png';

const cx = classNames.bind(styles);

function Header() {
  return (
    <div className={cx('wrap')}>
      <h1>
        <img src={logo} alt='logo' />
      </h1>
    </div>
  );
}

export default Header;
