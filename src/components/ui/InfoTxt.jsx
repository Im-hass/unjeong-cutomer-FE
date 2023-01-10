import React from 'react';
import classNames from 'classnames/bind';

import styles from './infoTxt.scss';

const cx = classNames.bind(styles);

function InfoTxt({ Icon, w, h, viewBox, productName, txt, unit }) {
  return (
    <div className={cx('infoTxt-wrap')}>
      <Icon width={w} height={h} viewBox={viewBox} />
      <div>
        {productName === '타로' && <span className={cx('desc')}>셔플당</span>}
        <span className={cx('txt')}>{txt}</span>
        {unit && <span className={cx('unit')}>{unit}</span>}
      </div>
    </div>
  );
}

export default InfoTxt;
