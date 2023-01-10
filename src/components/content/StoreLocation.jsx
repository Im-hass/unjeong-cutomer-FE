import React from 'react';
import classNames from 'classnames/bind';
import styles from './storeLocation.module.scss';
import Title from '../common/Title';
import InfoTxt from '../ui/InfoTxt';
import { SpotIcon, TimeIcon } from '../../assets/svg/index';
import temp from '../../assets/img/1000x1000.png';

const cx = classNames.bind(styles);

function StoreLocation() {
  return (
    <>
      <Title name='가게위치' />

      <div className={cx('storeLocation-wrap')}>
        <div className={cx('img-wrap')}>
          <img src={temp} alt='1000x1000' />
        </div>

        <InfoTxt
          Icon={TimeIcon}
          w={23}
          h={23}
          viewBox='-2 0 18 18'
          productInfo={false}
          productName='운영시간'
          txt='12:00 ~ 20:00'
        />

        <InfoTxt
          Icon={SpotIcon}
          w={23}
          h={23}
          viewBox='1 0 18 18'
          productInfo={false}
          productName='위치'
          // txt='부산 금정구 금정로52번길 46'
        />
      </div>
    </>
  );
}

export default StoreLocation;
