import React from 'react';
import classNames from 'classnames/bind';
import { PriceIcon, TimeIcon } from '../../assets/svg/index';

import styles from './productCard.module.scss';
import InfoTxt from './InfoTxt';

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

        <InfoTxt
          Icon={PriceIcon}
          w={23}
          h={23}
          viewBox='0 0 14 14'
          productName='사주'
          txt={price}
          unit='원'
        />

        <InfoTxt
          Icon={TimeIcon}
          w={23}
          h={23}
          viewBox='0 0 14 14'
          productName='사주'
          txt={time}
          unit='분'
        />
      </div>
    </div>
  );
}

export default ProductCard;
