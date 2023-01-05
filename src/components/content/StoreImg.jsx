import React from 'react';
import classNames from 'classnames/bind';

import styles from './storeImg.module.scss';

const cx = classNames.bind(styles);

function StoreImg(props) {
  const { url, alt, desc } = props;

  return (
    <div className={cx('img-wrap')}>
      <img src={url} alt={alt} />
      <span className={cx('img-desc')}>{desc}</span>
    </div>
  );
}

export default StoreImg;
