/* eslint-disable react/no-array-index-key */
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import classNames from 'classnames/bind';
import dayjs from 'dayjs';
import 'dayjs/locale/ko';

import styles from './appointmentDate.module.scss';
import { AppointmentIcon, TimeIcon } from '../assets/svg';
import Pagination from '../components/common/Pagination';
import Title from '../components/common/Title';
import { getAppointmentTime } from '../store/api/appointment';

const cx = classNames.bind(styles);

const TODAY = new Date();
const DAY_ARR = ['일', '월', '화', '수', '목', '금', '토'];

function AppointmentDate() {
  const navigate = useNavigate();
  let day = dayjs(TODAY).format('d');

  const [sevenDayArr, setSevenDayArr] = useState([]);
  const [availableTimeArr, setAvailableTimeArr] = useState([]);
  const [clickDateBtn, setClickDateBtn] = useState('');
  const [clickDateBtnDay, setClickDateBtnDay] = useState('');
  const [clickTimeBtn, setClickTimeBtn] = useState('');
  const [isLoading, setIsLoading] = useState(true);

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
    setIsLoading(true);

    transformDayHandler();
    availableDateArrHandler();

    let params;
    if (clickDateBtn) {
      params = clickDateBtn;
      getAppointmentTime(params)
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
    const name = Number(e.currentTarget.name);
    setClickTimeBtn(name);
  };

  const submitHandler = e => {
    e.preventDefault();
    if (clickDateBtn === '' || clickTimeBtn === '')
      toast.error('예약일자 또는 예약시간을 선택해주세요.');
    else if (clickDateBtn && clickDateBtn) {
      const passData = {
        date: clickDateBtn,
        time: clickTimeBtn,
      };
      navigate('/appointmentForm', { state: passData });
    }
  };

  return (
    <div className={cx('wrap')}>
      <Pagination pageNum={1} />
      <Title name='예약하기' />
      {!isLoading && (
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
          <button type='submit' className={cx('submit-btn')}>
            다음으로
          </button>
        </form>
      )}
    </div>
  );
}

export default AppointmentDate;
