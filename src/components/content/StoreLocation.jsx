import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './storeLocation.module.scss';
import Title from '../common/Title';
import InfoTxt from '../ui/InfoTxt';
import { SpotIcon, TimeIcon } from '../../assets/svg/index';
import { getStoreInfo } from '../../store/api/storeInfo';
import { STORE_MAP_IMG } from '../../assets/data/StoreImgData';

const cx = classNames.bind(styles);

function StoreLocation() {
  const [datas, setDatas] = useState(null);

  useEffect(() => {
    if (datas === null) {
      getStoreInfo().then(res => {
        setDatas(res.data.data);
      });
    }
  }, []);

  return (
    <>
      <Title name='가게위치' />

      <div className={cx('storeLocation-wrap')}>
        <div className={cx('img-wrap')}>
          {STORE_MAP_IMG && (
            <img src={STORE_MAP_IMG.url} alt={STORE_MAP_IMG.alt} />
          )}
        </div>

        {datas && (
          <>
            <InfoTxt
              Icon={TimeIcon}
              w={23}
              h={23}
              viewBox='-2 0 18 18'
              productInfo={false}
              productName='운영시간'
              txt={`${datas.openingHour}:00 ~ ${datas.closingHour}:00`}
              shopclosingDay={datas.storeClosingDayOfWeekList}
            />

            <InfoTxt
              Icon={SpotIcon}
              w={23}
              h={23}
              viewBox='1 0 18 18'
              productInfo={false}
              productName='위치'
              address={datas.address}
            />
          </>
        )}
      </div>
    </>
  );
}

export default StoreLocation;
