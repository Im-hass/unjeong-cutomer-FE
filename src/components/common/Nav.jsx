import React from 'react';
import classNames from 'classnames/bind';

import styles from './nav.module.scss';
import NavItem from '../ui/NavItem';

const cx = classNames.bind(styles);

function Nav({ menus }) {
  return (
    <div className={cx('nav-wrap')}>
      <nav>
        <ul>
          {menus.map(v => (
            <NavItem key={v.url} url={v.url} text={v.text} />
          ))}
        </ul>
      </nav>
    </div>
  );
}

export default Nav;
