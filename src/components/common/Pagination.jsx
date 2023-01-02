import React from 'react';
import classNames from 'classnames/bind';

import styles from './pagination.module.scss';

const cx = classNames.bind(styles);

function Pagination() {
  return (
    <div className={cx('wrap')}>
      <div className={cx('page-wrap', 'active')}>
        <div className={cx('num-wrap')}>
          <span className={cx('num')}>1</span>
        </div>
      </div>
      <div className={cx('page-wrap')}>
        <span className={cx('side-bar')} />
        <div className={cx('num-wrap')}>
          <span className={cx('num')}>2</span>
        </div>
      </div>
      <div className={cx('page-wrap')}>
        <span className={cx('side-bar')} />
        <div className={cx('num-wrap')}>
          <span className={cx('num')}>3</span>
        </div>
      </div>
    </div>
  );
}

export default Pagination;
