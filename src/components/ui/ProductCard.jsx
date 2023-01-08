import React from 'react';
import classNames from 'classnames/bind';
import { PriceIcon, TimeIcon } from '../../assets/svg/index';

import styles from './productCard.module.scss';

const cx = classNames.bind(styles);

function ProductCard({ imgUrl, productName, tags, price, time }) {
  return (
    <div className={cx('productCard-wrap')}>
      <div className={cx('img-wrap')}>
        <img src={imgUrl} alt='test' />
      </div>
      <div className={cx('desc-wrap')}>
        <h3>{productName}</h3>
        <div className={cx('tags-wrap')}>
          {tags.map(v => (
            <span key={v} className={cx('tag')}>
              {v}
            </span>
          ))}
        </div>
        <div className={cx('price-wrap')}>
          <PriceIcon width={23} height={23} viewBox='0 0 14 14' />
          <div>
            {productName === '타로' && (
              <span className={cx('desc')}>셔플당</span>
            )}
            <span className={cx('price')}>{price}</span>
            <span>원</span>
          </div>
        </div>
        <div className={cx('time-wrap')}>
          <TimeIcon
            width={23}
            height={23}
            viewBox='0 0 14 14'
            className={cx('time-icon')}
          />
          <div>
            <span className={cx('time')}>{time}</span>
            <span>분</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
