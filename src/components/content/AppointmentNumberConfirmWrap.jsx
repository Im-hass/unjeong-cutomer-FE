import React from 'react';
import { UserInfoInput } from '../ui';

function AppointmentNumberConfirmWrap({ userInfo, setUserInfo }) {
  return (
    <UserInfoInput
      inputType='text'
      inputId='appointmentNumber'
      labelContent='예약번호'
      appointmentInfo={userInfo}
      setAppointmentInfo={setUserInfo}
    />
  );
}

export default AppointmentNumberConfirmWrap;
