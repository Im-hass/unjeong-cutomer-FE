import React, { useCallback } from 'react';
import classNames from 'classnames/bind';

import styles from '../../pages/appointmentForm.module.scss';

const cx = classNames.bind(styles);

function KindBtn({
  btnName,
  btnContent,
  userInfo,
  appointmentInfo,
  setAppointmentInfo,
  changeAppointmentInfo,
  setChangeAppointmentInfo,
}) {
  const clickKindBtnHandler = useCallback(
    e => {
      setAppointmentInfo({
        ...appointmentInfo,
        appointmentType: e.target.name,
      });
      if (userInfo)
        setChangeAppointmentInfo({
          ...changeAppointmentInfo,
          appointmentType: e.target.name,
        });
    },
    [appointmentInfo, changeAppointmentInfo],
  );

  return (
    <button
      type='button'
      className={cx(
        appointmentInfo.appointmentType === btnName ? 'active' : '',
      )}
      name={btnName}
      onClick={clickKindBtnHandler}
    >
      {btnContent}
    </button>
  );
}

export default KindBtn;
