/* eslint-disable react/no-array-index-key */
import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import toast from 'react-hot-toast';
import classNames from 'classnames/bind';

import styles from './appointmentDate.module.scss';
import useTransformDate from '../hooks/useTransformDate';
import { getAvailableAppointmentTime } from '../store/api/appointment';
import { getStoreHolidayInfo } from '../store/api/storeInfo';
import { Pagination, Title } from '../components/common/index';
import { DateBtn, TimeBtn, CheckInput, Button } from '../components/ui/index';
import { AppointmentIcon, TimeIcon } from '../assets/svg';

const cx = classNames.bind(styles);

function AppointmentDate() {
  const location = useLocation();
  const navigate = useNavigate();

  const [transformDateArr] = useTransformDate();
  const [isLoading, setIsLoading] = useState(true);
  const [sevenDayArr, setSevenDayArr] = useState();
  const [availableTimeArr, setAvailableTimeArr] = useState([]);
  const [clickDateBtn, setClickDateBtn] = useState('');
  const [clickDateBtnDay, setClickDateBtnDay] = useState('');
  const [clickTimeBtn, setClickTimeBtn] = useState('');
  const [userInfo, setUserInfo] = useState('');
  const [prevAppointmentInfo, setPrevAppointmentInfo] = useState();
  const [clickNotChangeBtn, setClickNotChangeBtn] = useState(false);

  useEffect(() => {
    if (location.state) {
      setUserInfo(location.state.userInfo);
      setPrevAppointmentInfo(location.state.appointmentInfo);
    }

    setIsLoading(true);
    setSevenDayArr(transformDateArr);
    let params;

    if (clickDateBtn) {
      params = clickDateBtn;
      getAvailableAppointmentTime(params)
        .then(res => {
          setAvailableTimeArr(res.data.data);
        })
        .catch(err => console.log(err));
    } else if (clickDateBtn === '' && sevenDayArr !== undefined) {
      if (sevenDayArr[0] !== undefined) {
        setClickDateBtnDay(`${sevenDayArr[0][1]} ${sevenDayArr[0][2]}`);
        setClickDateBtn(`${sevenDayArr[0][0]}-${sevenDayArr[0][1]}`);
      }
    }
    setIsLoading(false);
  }, [clickDateBtn, sevenDayArr]);

  const submitHandler = useCallback(
    e => {
      e.preventDefault();
      const prevParams = {
        userInfo,
        prevAppointmentInfo,
      };

      if (clickDateBtn === '' || clickTimeBtn === '')
        if (clickNotChangeBtn) {
          const params = {
            prevParams,
          };
          navigate('/appointmentForm', { state: params });
        } else toast.error('예약날짜 또는 예약시간을 선택해주세요.');
      else if (clickDateBtn && clickDateBtn) {
        const newParams = {
          date: clickDateBtn,
          time: clickTimeBtn,
        };
        if (location.state) {
          const changeParams = {
            newParams,
            prevParams,
          };
          navigate('/appointmentForm', { state: changeParams });
        } else {
          navigate('/appointmentForm', { state: newParams });
        }
      }
    },
    [clickDateBtn, clickTimeBtn, clickNotChangeBtn],
  );

  return (
    <div className={cx('wrap')}>
      <Pagination pageNum={1} />
      <Title name={userInfo ? '예약변경' : '예약하기'} />
      {!isLoading && (
        <>
          {location.state && (
            <div className={cx('prev-appointment-wrap')}>
              기존예약 :{' '}
              <strong>
                {prevAppointmentInfo.appointmentDate} /{' '}
                {prevAppointmentInfo.appointmentHour}:00
              </strong>
            </div>
          )}
          <form className={cx('date-wrap')} onSubmit={submitHandler}>
            <h3 className={cx('sub-tit')}>
              <AppointmentIcon className={cx('icon')} />
              <span>날짜 선택</span>
            </h3>
            <ul className={cx('date-btn-wrap')}>
              {sevenDayArr &&
                sevenDayArr.map((date, i) => (
                  <DateBtn
                    key={`date-${i}`}
                    date={date}
                    clickDateBtn={clickDateBtn}
                    setClickDateBtn={setClickDateBtn}
                    clickDateBtnDay={clickDateBtnDay}
                    setClickDateBtnDay={setClickDateBtnDay}
                  />
                ))}
            </ul>
            <h3 className={cx('sub-tit')}>
              <TimeIcon className={cx('icon', 'time')} />
              <span>시간 선택</span>
            </h3>
            <ul className={cx('time-btn-wrap')}>
              {availableTimeArr &&
                availableTimeArr.map((time, i) => (
                  <TimeBtn
                    key={`time-${i}`}
                    time={time}
                    clickTimeBtn={clickTimeBtn}
                    setClickTimeBtn={setClickTimeBtn}
                  />
                ))}
            </ul>
            {location.state && (
              <CheckInput
                clickNotChangeBtn={clickNotChangeBtn}
                setClickNotChangeBtn={setClickNotChangeBtn}
              />
            )}
            <Button content='다음으로' />
          </form>
        </>
      )}
    </div>
  );
}

export default AppointmentDate;
