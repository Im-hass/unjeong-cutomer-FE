import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import { Link, useLocation } from 'react-router-dom';

import styles from './navItem.module.scss';

const cx = classNames.bind(styles);

function NavItem({ url, text }) {
  const { pathname } = useLocation();
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if (pathname === url) {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  }, [pathname]);

  return (
    <li>
      <Link to={url} className={cx(isActive && 'active')}>
        {text}
      </Link>
    </li>
  );
}

export default NavItem;
