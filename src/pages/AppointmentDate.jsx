/* eslint-disable react/no-array-index-key */
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import classNames from 'classnames/bind';
import dayjs from 'dayjs';
import 'dayjs/locale/ko';

import styles from './appointmentDate.module.scss';
import { AppointmentBtn, TimeBtn } from '../assets/svg';
import Pagination from '../components/common/Pagination';
import Title from '../components/common/Title';
import { getAppointmentTime } from '../store/api/appointment';
import Nav from '../components/common/Nav';

const cx = classNames.bind(styles);

const TODAY = new Date();
const DAY_ARR = ['일', '월', '화', '수', '목', '금', '토'];

function AppointmentDate() {
  const navigate = useNavigate();
  const todayApiParam = dayjs(TODAY).format('YYYY-MM-DD');
  let day = dayjs(TODAY).format('d');

  const [availableTimeArr, setAvailableTimeArr] = useState([]);
  const [sevenDayArr, setSevenDayArr] = useState([]);
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
    } else params = todayApiParam;

    getAppointmentTime(params)
      .then(res => {
        setAvailableTimeArr(res.data.data.availableTime);
        console.log('API호출');
      })
      .catch(err => console.log(err));
    setIsLoading(false);
  }, [clickDateBtn]);

  const dateClickHandler = e => {
    const { name } = e.currentTarget;
    const tmpArr = name.split(' ');
    setClickDateBtnDay(tmpArr[2]);
    setClickDateBtn(`${tmpArr[0]}-${tmpArr[1]}`);
  };

  const timeClickHandler = e => {
    const name = Number(e.currentTarget.name);
    setClickTimeBtn(name);
  };

  const submitHandler = e => {
    e.preventDefault();
    navigate('/appointmentForm', {
      date: clickDateBtn,
      time: clickTimeBtn,
    });
  };

  return (
    <>
      <Nav menus={[]} />

      <div className={cx('wrap')}>
        <Pagination pageNum={1} />
        <Title name='예약하기' />
        {!isLoading && (
          <form className={cx('date-wrap')} onSubmit={submitHandler}>
            <h3 className={cx('sub-tit')}>
              <AppointmentBtn className={cx('icon')} />
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
                        clickDateBtnDay === dates[2] ? 'active' : '',
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
              <TimeBtn className={cx('icon', 'time')} />
              <span>시간 선택</span>
            </h3>
            <ul className={cx('time-btn-wrap')}>
              {availableTimeArr &&
                availableTimeArr.map((time, i) => (
                  <li key={`time-${i}`}>
                    <button
                      type='button'
                      name={time}
                      className={cx(clickTimeBtn === time ? 'active' : '')}
                      onClick={timeClickHandler}
                    >
                      {time}:00
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
    </>
  );
}

export default AppointmentDate;
