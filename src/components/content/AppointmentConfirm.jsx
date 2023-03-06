import React, { useState } from 'react';
import classNames from 'classnames/bind';
import toast from 'react-hot-toast';

import styles from '../../pages/appointmentForm.module.scss';
import { getMyAppointmentList } from '../../store/api/appointment';
import Title from '../common/Title';
import { Button } from '../ui/index';
import AppointmentList from './AppointmentList';
import AppointmentConfirmToggle from '../ui/AppointmentConfirmToggle';
import NameConfirmWrap from './NameConfirmWrap';
import AppointmentNumberConfirmWrap from './AppointmentNumberConfirmWrap';

const cx = classNames.bind(styles);

function AppointmentConfirm() {
  const [isActive, setIsActive] = useState(false);
  const [userInfo, setUserInfo] = useState();
  const [userAppointmentNumber, setUserAppointmentNumber] = useState('');
  const [getAppointmentList, setGetAppointmentList] = useState();
  const [clickToggle, setClickToggle] = useState('name');

  const onHandleSubmit = e => {
    e.preventDefault();
    if (clickToggle === 'name') {
      if (userInfo.name !== '' && userInfo.phone !== '') {
        setUserInfo(userInfo);
        getMyAppointmentList(userInfo)
          .then(res => {
            setGetAppointmentList(res.data.data.appointmentList);
            setIsActive(true);
          })
          .catch(err => toast.error(err.response.data.errorMessage));
      }
    } else {
      console.log(userAppointmentNumber);
    }
  };

  return (
    <div className={cx('wrap')}>
      <Title name='예약확인' />
      <AppointmentConfirmToggle
        clickToggle={clickToggle}
        setClickToggle={setClickToggle}
      />
      {isActive ? (
        <AppointmentList
          userInfo={userInfo}
          appointmentList={getAppointmentList}
          setAppointmentList={setGetAppointmentList}
        />
      ) : (
        <form onSubmit={onHandleSubmit}>
          {clickToggle === 'name' ? (
            <NameConfirmWrap userInfo={userInfo} setUserInfo={setUserInfo} />
          ) : (
            <AppointmentNumberConfirmWrap
              userInfo={userAppointmentNumber}
              setUserInfo={setUserAppointmentNumber}
            />
          )}
          <Button content='예약조회' />
        </form>
      )}
    </div>
  );
}

export default AppointmentConfirm;
