/* eslint-disable react/no-array-index-key */
import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import toast from 'react-hot-toast';
import classNames from 'classnames/bind';
import dayjs from 'dayjs';
import 'dayjs/locale/ko';

import styles from './appointmentDate.module.scss';
import { AppointmentIcon, CheckIcon, TimeIcon } from '../assets/svg';
import { getAvailableAppointmentTime } from '../store/api/appointment';
import Pagination from '../components/common/Pagination';
import Title from '../components/common/Title';

const cx = classNames.bind(styles);

const TODAY = new Date();
const DAY_ARR = ['일', '월', '화', '수', '목', '금', '토'];

function AppointmentDate() {
  const location = useLocation();
  const navigate = useNavigate();
  let day = dayjs(TODAY).format('d');

  const [prevAppointmentInfo, setPrevAppointmentInfo] = useState();
  const [sevenDayArr, setSevenDayArr] = useState([]);
  const [availableTimeArr, setAvailableTimeArr] = useState([]);
  const [clickDateBtn, setClickDateBtn] = useState('');
  const [clickDateBtnDay, setClickDateBtnDay] = useState('');
  const [clickTimeBtn, setClickTimeBtn] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [userInfo, setUserInfo] = useState('');
  const [clickNotChangeBtn, setClickNotChangeBtn] = useState(false);

  const transformDayHandler = () => {
    for (let i = 0; i < DAY_ARR.length; i += 1) {
      if (i === Number(day)) {
        day = DAY_ARR[i];
      }
    }
  };

  const availableDateArrHandler = () => {
    const tmpDateArr = [];

    for (let i = 0; i < 8; i += 1) {
      const tmpArr = [];
      const transformDay = Number(dayjs().add(i, 'day').format('d'));
      tmpArr.push(dayjs().add(i, 'day').format('YYYY'));
      tmpArr.push(dayjs().add(i, 'day').format('MM-DD'));
      tmpArr.push(DAY_ARR[transformDay]);
      tmpDateArr.push(tmpArr);
    }
    setSevenDayArr(tmpDateArr);
  };

  useEffect(() => {
    if (location.state) {
      setUserInfo(location.state.userInfo);
      setPrevAppointmentInfo(location.state.appointmentInfo);
    }

    setIsLoading(true);

    transformDayHandler();
    availableDateArrHandler();

    let params;
    if (clickDateBtn) {
      params = clickDateBtn;
      getAvailableAppointmentTime(params)
        .then(res => {
          setAvailableTimeArr(res.data.data);
        })
        .catch(err => console.log(err));
    }
    setIsLoading(false);
  }, [clickDateBtn]);

  const dateClickHandler = e => {
    const { name } = e.currentTarget;
    const tmpArr = name.split(' ');
    setClickDateBtnDay(`${tmpArr[1]} ${tmpArr[2]}`);
    setClickDateBtn(`${tmpArr[0]}-${tmpArr[1]}`);
  };

  const timeClickHandler = e => {
    const time = Number(e.currentTarget.name);
    setClickTimeBtn(time);
  };

  const notChangeBtnClickHandler = e => {
    setClickNotChangeBtn(e.target.checked);
  };

  const submitHandler = e => {
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
  };

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
                sevenDayArr.map((dates, i) => (
                  <li key={`date-${i}`}>
                    <button
                      type='button'
                      name={`${dates[0]} ${dates[1]} ${dates[2]}`}
                      className={cx(
                        clickDateBtnDay === `${dates[1]} ${dates[2]}`
                          ? 'active'
                          : '',
                        dates[2] === '일' ? 'disable' : '',
                      )}
                      disabled={dates[2] === '일'}
                      onClick={dateClickHandler}
                    >
                      {dates[1]} <span>({dates[2]})</span>
                    </button>
                  </li>
                ))}
            </ul>
            <h3 className={cx('sub-tit')}>
              <TimeIcon className={cx('icon', 'time')} />
              <span>시간 선택</span>
            </h3>
            <ul className={cx('time-btn-wrap')}>
              {availableTimeArr &&
                availableTimeArr.map((timeArr, i) => (
                  <li key={`time-${i}`}>
                    <button
                      type='button'
                      name={timeArr.time}
                      className={cx(
                        clickTimeBtn === timeArr.time ? 'active' : '',
                        !timeArr.isAvailable ? 'disable' : '',
                      )}
                      disabled={!timeArr.isAvailable}
                      onClick={timeClickHandler}
                    >
                      {timeArr.time}:00
                    </button>
                  </li>
                ))}
            </ul>
            {location.state && (
              <div className={cx('checkbox-wrap')}>
                <div className={cx('check-wrap')}>
                  <input
                    type='checkbox'
                    id='check'
                    onChange={notChangeBtnClickHandler}
                  />
                  <CheckIcon className={cx('icon')} />
                </div>
                <label htmlFor='check'>날짜와 시간을 변경하지 않음</label>
              </div>
            )}
            <button type='submit' className={cx('submit-btn')}>
              다음으로
            </button>
          </form>
        </>
      )}
    </div>
  );
}

export default AppointmentDate;
