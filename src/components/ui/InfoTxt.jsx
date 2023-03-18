import React from 'react';
import classNames from 'classnames/bind';

import styles from './infoTxt.scss';

const cx = classNames.bind(styles);

const days = {
  MONDAY: '월요일',
  TYESDAY: '화요일',
  WEDNESDAY: '수요일',
  THURSDAY: '목요일',
  FRIDAY: '금요일',
  SATURDAY: '토요일',
  SUNDAY: '일요일',
};

function InfoTxt({
  Icon,
  w,
  h,
  viewBox,
  productInfo = true,
  productName,
  address,
  txt,
  unit,
  shopclosingDay,
}) {
  return (
    <div className={cx('infoTxt-wrap', productInfo ? '' : 'f-s')}>
      <Icon width={w} height={h} viewBox={viewBox} />
      <div>
        {productName === '타로' && <span className={cx('desc')}>셔플당</span>}
        {productName === '운영시간' && <span className={cx('desc')}>매일</span>}
        {productName === '위치' && (
          <span className={cx('desc')}>{address}</span>
        )}
        <span className={cx('txt')}>{txt}</span>
        {productName === '운영시간' && (
          <span className={cx('desc')}>
            {' '}
            *{' '}
            {shopclosingDay.map(
              (v, i) =>
                `${days[v]} ${i === shopclosingDay.length - 1 ? ' ' : ', '}`,
            )}{' '}
            휴무
          </span>
        )}
        {unit && <span className={cx('unit')}>{unit}</span>}
      </div>
    </div>
  );
}

export default InfoTxt;
