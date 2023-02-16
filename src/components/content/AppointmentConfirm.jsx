import React, { useState } from 'react';
import classNames from 'classnames/bind';
import toast from 'react-hot-toast';

import styles from '../../pages/appointmentForm.module.scss';
import { getMyAppointmentList } from '../../store/api/appointment';
import Title from '../common/Title';
import { Button, UserInfoInput } from '../ui/index';
import AppointmentList from './AppointmentList';

const cx = classNames.bind(styles);

function AppointmentConfirm() {
  const [isActive, setIsActive] = useState(false);
  const [userInfo, setUserInfo] = useState();
  const [getAppointmentList, setGetAppointmentList] = useState();

  const onHandleSubmit = e => {
    e.preventDefault();
    if (userInfo.name !== '' && userInfo.phone !== '') {
      setUserInfo(userInfo);
      getMyAppointmentList(userInfo)
        .then(res => {
          setGetAppointmentList(res.data.data.appointmentList);
          setIsActive(true);
        })
        .catch(err => toast.error(err.response.data.errorMessage));
    }
  };

  return (
    <div className={cx('wrap')}>
      <Title name='예약확인' />

      {isActive ? (
        <AppointmentList
          userInfo={userInfo}
          appointmentList={getAppointmentList}
          setAppointmentList={setGetAppointmentList}
        />
      ) : (
        <form onSubmit={onHandleSubmit}>
          <UserInfoInput
            inputType='text'
            inputId='name'
            labelContent='이름'
            appointmentInfo={userInfo}
            setAppointmentInfo={setUserInfo}
          />
          <UserInfoInput
            inputType='tel'
            inputId='phone'
            labelContent='연락처'
            appointmentInfo={userInfo}
            setAppointmentInfo={setUserInfo}
          />
          <Button content='예약조회' />
        </form>
      )}
    </div>
  );
}

export default AppointmentConfirm;
