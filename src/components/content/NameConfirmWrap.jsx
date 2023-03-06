import React from 'react';
import { UserInfoInput } from '../ui';

function NameConfirmWrap({ userInfo, setUserInfo }) {
  return (
    <>
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
    </>
  );
}

export default NameConfirmWrap;
