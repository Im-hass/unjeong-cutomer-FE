import React from 'react';
import classNames from 'classnames/bind';
import StoreImg from '../ui/StoreImg';

import styles from './storeInfo.module.scss';
import Title from '../common/Title';
import { STORE_IMG_LIST } from '../../assets/data/StoreImgData';

const cx = classNames.bind(styles);

function StoreInfo() {
  return (
    <>
      <Title name='가게정보' />

      <div className={cx('imgs-wrap')}>
        {STORE_IMG_LIST.map(v => (
          <StoreImg key={v.id} url={v.url} alt={v.alt} desc={v.desc} />
        ))}
      </div>
    </>
  );
}

export default StoreInfo;
