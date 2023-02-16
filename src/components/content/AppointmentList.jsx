import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';

import styles from './appointmentList.module.scss';
import { getMyAppointmentList } from '../../store/api/appointment';
import { ALERT_DATA, ALERT_DATA2 } from '../../assets/data/AppointmentListData';
import AppointmentItem from '../ui/AppointmentItem';
import ConfirmAlert from '../common/ConfirmAlert';

const cx = classNames.bind(styles);

function AppointmentList({ userInfo, appointmentList, setAppointmentList }) {
  const [openAlert, setOpenAlert] = useState(false);
  const [clickAppointment, setClickAppointment] = useState();
  const [prevPage, setPrevPage] = useState('changeConfirm');

  useEffect(() => {
    getMyAppointmentList(userInfo).then(res => {
      setAppointmentList(res.data.data.appointmentList);
    });
  }, [openAlert]);

  return (
    <>
      {openAlert && (
        <ConfirmAlert
          page={prevPage}
          alertInfo={prevPage === 'changeConfirm' ? ALERT_DATA : ALERT_DATA2}
          userInfo={userInfo}
          setOpenAlert={setOpenAlert}
          appointmentInfo={clickAppointment}
        />
      )}

      <div className={cx('appointmentList-wrap')}>
        <div className={cx('info-wrap')}>
          <div className={cx('name-wrap')}>
            <span className={cx('name')}>🌟 {userInfo.name}</span>
            <span>님의 예약정보</span>
          </div>
          <ul className={cx('types')}>
            <li className={cx('standby')}>상담대기중</li>
            <li className={cx('cancelled')}>예약취소됨</li>
            <li className={cx('completed')}>상담완료</li>
          </ul>
          <div className={cx('info')}>
            ※ 예약변경/취소는 상담대기중인 경우에만 가능합니다
          </div>
        </div>

        <ul className={cx('items-wrap')}>
          {appointmentList.map(list => (
            <AppointmentItem
              key={list.index}
              list={list}
              setOpenAlert={setOpenAlert}
              setClickAppointment={setClickAppointment}
              setPrevPage={setPrevPage}
            />
          ))}
        </ul>
      </div>
    </>
  );
}

export default AppointmentList;
