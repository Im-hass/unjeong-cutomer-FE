import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import toast from 'react-hot-toast';

import { useParams } from 'react-router-dom';
import styles from '../../pages/appointmentForm.module.scss';
import {
  getMyAppointmentList,
  getViewAppointment,
} from '../../store/api/appointment';
import Title from '../common/Title';
import { Button } from '../ui/index';
import AppointmentList from './AppointmentList';
import AppointmentItem from '../ui/AppointmentItem';
import AppointmentConfirmToggle from '../ui/AppointmentConfirmToggle';
import NameConfirmWrap from './NameConfirmWrap';
import AppointmentNumberConfirmWrap from './AppointmentNumberConfirmWrap';

const cx = classNames.bind(styles);

function AppointmentConfirm() {
  const { code } = useParams();
  const [isActive, setIsActive] = useState(false);
  const [userInfo, setUserInfo] = useState({
    name: '',
    phone: '',
  });
  const [userAppointmentNumber, setUserAppointmentNumber] = useState('');
  const [getAppointment, setGetAppointment] = useState('');
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
    } else if (clickToggle === 'appointmentNumber') {
      if (userAppointmentNumber !== '')
        getViewAppointment(userAppointmentNumber).then(res => {
          setGetAppointment(res.data.data);
          setIsActive(true);
        });
    }
  };

  useEffect(() => {
    if (code !== undefined) {
      getViewAppointment(code).then(res => {
        setClickToggle('appointmentNumber');
        setGetAppointment(res.data.data);
        setIsActive(true);
      });
    }
  }, []);

  return (
    <div className={cx('wrap')}>
      <Title name='예약확인' />
      {isActive &&
        (clickToggle === 'name' ? (
          <AppointmentList
            userInfo={userInfo}
            appointmentList={getAppointmentList}
            setAppointmentList={setGetAppointmentList}
          />
        ) : (
          <AppointmentItem page='view' list={getAppointment} />
        ))}
      {!isActive && (
        <>
          <AppointmentConfirmToggle
            clickToggle={clickToggle}
            setClickToggle={setClickToggle}
          />

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
        </>
      )}
    </div>
  );
}

export default AppointmentConfirm;
