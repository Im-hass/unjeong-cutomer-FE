/* eslint-disable no-nested-ternary */
/* eslint-disable react/no-array-index-key */
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import classNames from 'classnames/bind';
import toast from 'react-hot-toast';

import styles from './appointmentDone.module.scss';
import Pagination from '../components/common/Pagination';
import ShareBtn from '../components/ui/ShareBtn';
import { SHARE_BTN_DATA } from '../assets/data/ShareBtnData';

const cx = classNames.bind(styles);

function AppointmentDone() {
  const location = useLocation();
  const [info, setInfo] = useState();
  const [isFetching, setIsFetching] = useState(false);
  const userInfo = location.state.userInfo || null;
  const changeInfo = location.state.changeAppointmentInfo || null;
  const appointmentType = location.state.changeAppointmentInfo
    ? location.state.changeAppointmentInfo.appointmentType
      ? location.state.changeAppointmentInfo.appointmentType
      : location.state.appointmentInfo.appointmentType
    : location.state.appointmentType;

  const handleCopyClipBoard = async text => {
    try {
      await navigator.clipboard.writeText(text);
      toast('클립보드로 복사되었습니다!', {
        icon: '📋',
      });
    } catch (e) {
      console.log(e);
    }
  };

  const handleShare = e => {
    const { alt } = e.target;
    if (alt === '공유하기') {
      handleCopyClipBoard(window.location.href);
    } else if (alt === '카카오톡 공유하기') {
      console.log('카카오톡 공유하기');
    } else if (alt === '페이스북 공유하기') {
      console.log('페이스북 공유하기');
    }
  };

  useEffect(() => {
    setIsFetching(false);
    if (location.state.appointmentInfo) setInfo(location.state.appointmentInfo);
    else setInfo(location.state);
    setIsFetching(true);
  }, []);

  return (
    <div className={cx('wrap')}>
      <Pagination pageNum={3} />
      <h2>
        <strong>{userInfo ? '예약변경' : '예약완료'}</strong> 되었습니다.🎉
      </h2>
      {isFetching && (
        <>
          <div className={cx('content-wrap')}>
            <dl>
              <div className={cx('content-li')}>
                <dt>이름</dt>
                <dd>{userInfo ? userInfo.name : info.name}</dd>
              </div>
              <div className={cx('content-li')}>
                <dt>연락처</dt>
                <dd>
                  {userInfo
                    ? userInfo.phone.replace(
                        /^(\d{2,3})(\d{3,4})(\d{4})$/,
                        `$1-$2-$3`,
                      )
                    : info.phone.replace(
                        /^(\d{2,3})(\d{3,4})(\d{4})$/,
                        `$1-$2-$3`,
                      )}
                </dd>
              </div>
              <div
                className={cx(
                  'content-li',
                  location.state.page === 'change' && changeInfo.appointmentType
                    ? 'changed'
                    : '',
                )}
              >
                <dt>상담종류</dt>
                <dd>{appointmentType === 'CALL' ? '전화상담' : '방문상담'}</dd>
              </div>
              <div
                className={cx(
                  'content-li',
                  location.state.page === 'change' && changeInfo.numberOfPeople
                    ? 'changed'
                    : '',
                )}
              >
                <dt>상담인원</dt>
                <dd>
                  {location.state.page === 'change' && changeInfo.numberOfPeople
                    ? changeInfo.numberOfPeople
                    : info.numberOfPeople}
                  명
                </dd>
              </div>
              <div
                className={cx(
                  'content-li',
                  location.state.page === 'change' && changeInfo.appointmentDate
                    ? 'changed'
                    : '',
                )}
              >
                <dt>상담날짜</dt>
                <dd>
                  {location.state.page === 'change' &&
                  changeInfo.appointmentDate
                    ? changeInfo.appointmentDate
                    : info.appointmentDate}{' '}
                  /{' '}
                  {location.state.page === 'change' &&
                  changeInfo.appointmentHour
                    ? changeInfo.appointmentHour
                    : info.appointmentHour}
                  :00
                </dd>
              </div>
            </dl>
          </div>
          <div className={cx('share-wrap')}>
            <h3>공유하기</h3>
            <div className={cx('share-btn-wrap')}>
              {SHARE_BTN_DATA.map((share, i) => (
                <ShareBtn
                  key={`share-${i}`}
                  data={share}
                  handleShare={handleShare}
                />
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default AppointmentDone;
