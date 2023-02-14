import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import Title from '../common/Title';
import ProductCard from '../ui/ProductCard';
import magicBallImg from '../../assets/img/magic-ball.png';
import tarotImg from '../../assets/img/tarot.png';

import styles from './productInfo.module.scss';
import { getProductInfo } from '../../store/api/storeInfo';

const cx = classNames.bind(styles);

function ProductInfo() {
  const tags = ['궁합', '애정', '취업', '사업'];
  const [datas, setDatas] = useState(null);

  useEffect(() => {
    if (datas === null) {
      getProductInfo().then(res => {
        setDatas(res.data);
      });
    }
  }, []);

  return (
    <>
      <Title name='상품정보' />

      <div className={cx('productCard-wrap')}>
        {datas &&
          datas.map(data => (
            <ProductCard
              key={data.index}
              imgUrl={data.productName === 'SAJU' ? magicBallImg : tarotImg}
              productName={data.productName === 'SAJU' ? '사주' : '타로'}
              tags={tags}
              price={data.price.toLocaleString()}
              time={
                data.requiredMinuteFrom === data.requiredMinuteTo
                  ? data.requiredMinuteFrom
                  : `${data.requiredMinuteFrom}~${data.requiredMinuteTo}`
              }
            />
          ))}
      </div>
    </>
  );
}

export default ProductInfo;
