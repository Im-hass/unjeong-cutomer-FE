import React from 'react';
import { useLocation } from 'react-router-dom';
import classNames from 'classnames/bind';

import styles from './appointmentDone.module.scss';
import Pagination from '../components/common/Pagination';
import ShareIcon from '../assets/img/share-icon.png';
import KakaoIcon from '../assets/img/kakao-icon.png';
import FacebookIcon from '../assets/img/facebook-icon.png';

const cx = classNames.bind(styles);

function AppointmentDone() {
  const location = useLocation();

  return (
    <div className={cx('wrap')}>
      <Pagination pageNum={3} />
      <h2>
        <strong>예약완료</strong> 되었습니다.🎉
      </h2>
      <div className={cx('content-wrap')}>
        <dl>
          <div className={cx('content-li')}>
            <dt>이름</dt>
            <dd>{location.state.name}</dd>
          </div>
          <div className={cx('content-li')}>
            <dt>연락처</dt>
            <dd>{location.state.phone}</dd>
          </div>
          <div className={cx('content-li')}>
            <dt>상담종류</dt>
            <dd>
              {location.state.appointmentType === 'CALL'
                ? '전화상담'
                : '방문상담'}
            </dd>
          </div>
          <div className={cx('content-li')}>
            <dt>상담인원</dt>
            <dd>{location.state.numberOfPeople}</dd>
          </div>
          <div className={cx('content-li')}>
            <dt>상담날짜</dt>
            <dd>
              {location.state.appointmentDate} /{' '}
              {location.state.appointmentHour}:00
            </dd>
          </div>
        </dl>
      </div>
      <div className={cx('share-wrap')}>
        <h3>공유하기</h3>
        <div className={cx('share-btn-wrap')}>
          <button type='button'>
            <img src={ShareIcon} alt='공유하기' />
            <span>URL</span>
          </button>
          <button type='button'>
            <img src={KakaoIcon} alt='카카오톡 공유하기' />
            <span>카카오톡</span>
          </button>
          <button type='button'>
            <img src={FacebookIcon} alt='페이스북 공유하기' />
            <span>페이스북</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default AppointmentDone;
