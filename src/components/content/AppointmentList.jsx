import React, { useState } from 'react';
import classNames from 'classnames/bind';
import AppointmentItem from '../ui/AppointmentItem';

import styles from './appointmentList.module.scss';
import ConfirmAlert from '../common/ConfirmAlert';

const cx = classNames.bind(styles);
const ALERT_DATA = {
  subTit: '아래의 예약을',
  tit: '변경하시겠습니까?',
  btnContent: '예약변경',
};

function AppointmentList({ enteredData, appointmentList }) {
  const [openAlert, setOpenAlert] = useState(false);
  const [clickAppointment, setClickAppointment] = useState();

  return (
    <>
      {openAlert && (
        <ConfirmAlert
          page='change'
          info={ALERT_DATA}
          enteredData={enteredData}
          setOpenAlert={setOpenAlert}
          appointmentInfo={clickAppointment}
        />
      )}

      <div className={cx('appointmentList-wrap')}>
        <div className={cx('info-wrap')}>
          <div className={cx('name-wrap')}>
            <span className={cx('name')}>{enteredData.name}</span>
            <span>님의 예약정보</span>
          </div>
          <ul className={cx('types')}>
            <li className={cx('standby')}>상담대기중</li>
            <li className={cx('cancelled')}>예약취소됨</li>
            <li className={cx('completed')}>상담완료</li>
          </ul>
          <div>※ 예약변경/취소는 상담대기중인 경우에만 가능합니다</div>
        </div>

        <ul className={cx('items-wrap')}>
          {appointmentList.map(list => (
            <AppointmentItem
              key={list.index}
              list={list}
              setOpenAlert={setOpenAlert}
              setClickAppointment={setClickAppointment}
            />
          ))}
        </ul>
      </div>
    </>
  );
}

export default AppointmentList;
