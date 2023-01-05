import React from 'react';
import classNames from 'classnames/bind';
import StoreImg from '../components/content/StoreImg';
import imgUrl from '../assets/img/1000x1000.png';

import styles from './main.module.scss';
import Title from '../components/common/Title';

const cx = classNames.bind(styles);

function Main() {
  return (
    <div className={cx('main-wrap')}>
      <Title txt='가게정보' />

      <div className={cx('imgs-wrap')}>
        <StoreImg url={imgUrl} alt='가게외부사진1' desc='가게 외부1' />
        <StoreImg url={imgUrl} alt='가게외부사진2' desc='가게 외부2' />
        <StoreImg url={imgUrl} alt='가게외부사진3' desc='가게 내부1' />
        <StoreImg url={imgUrl} alt='가게외부사진3' desc='가게 내부2' />
      </div>
    </div>
  );
}

export default Main;
