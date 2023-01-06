import React from 'react';
import classNames from 'classnames/bind';
import Title from '../common/Title';
import ProductCard from '../ui/ProductCard';
import magicBallImg from '../../assets/img/magic-ball.png';
import tarotImg from '../../assets/img/tarot.png';

import styles from './productInfo.module.scss';

const cx = classNames.bind(styles);

function ProductInfo() {
  const tags = ['궁합', '애정', '취업', '사업'];

  return (
    <>
      <Title txt='상품정보' />

      <div className={cx('productCard-wrap')}>
        <ProductCard
          imgUrl={magicBallImg}
          productName='사주'
          tags={tags}
          price='30,000'
          time='30'
        />

        <ProductCard
          imgUrl={tarotImg}
          productName='타로'
          tags={tags}
          price='5,000'
          time='5~10'
        />
      </div>
    </>
  );
}

export default ProductInfo;
