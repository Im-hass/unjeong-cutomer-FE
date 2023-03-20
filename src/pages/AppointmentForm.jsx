import React, { useEffect, useState, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import toast from 'react-hot-toast';
import classNames from 'classnames/bind';

import styles from './appointmentForm.module.scss';
import {
  ALERT_DATA,
  ALERT_CHANGE_DATA,
} from '../assets/data/AppointmentFormData';
import { Pagination, Title, ConfirmAlert } from '../components/common/index';
import {
  Button,
  TermsInputBtn,
  UserInfoInput,
  SelectBox,
  KindBtn,
} from '../components/ui/index';
import DetailPolicy from '../components/content/DetailPolicy';

const cx = classNames.bind(styles);

function AppointmentForm() {
  const location = useLocation();

  const userInfo = location.state.prevParams?.userInfo;
  const prevAppointmentInfo = location.state.prevParams?.prevAppointmentInfo;

  const [changeAppointmentInfo, setChangeAppointmentInfo] = useState({
    appointmentType: 'CALL',
    numberOfPeople: 1,
  });
  const [openAlert, setOpenAlert] = useState(false);
  const [openPolicy, setOpenPolicy] = useState(false);
  const [policyKeyList] = useState([
    {
      index: 0,
      key: '개인정보 수집 및 이용 동의',
    },
    {
      index: 1,
      key: '개인정보 처리방침',
    },
  ]);
  const [selectPolicy, setSelectPolicy] = useState();
  const [appointmentInfo, setAppointmentInfo] = useState({
    name: '',
    phone: '',
    appointmentType: 'CALL',
    numberOfPeople: 1,
    appointmentDate: '',
    appointmentHour: 0,
    personalInformationCollectionAndUsageAgreement: false,
    privacyPolicyRead: false,
  });

  useEffect(() => {
    if (location.state.newParams)
      setChangeAppointmentInfo({
        ...changeAppointmentInfo,
        appointmentDate: location.state.newParams.date,
        appointmentHour: location.state.newParams.time,
      });
    if (location.state.date)
      setAppointmentInfo({
        ...appointmentInfo,
        appointmentDate: location.state.date,
        appointmentHour: location.state.time,
      });
  }, []);

  const isChangeAppointment = key => {
    let answer = false;
    if (prevAppointmentInfo[key] === appointmentInfo[key]) {
      if (key === 'appointmentType')
        setChangeAppointmentInfo(current => {
          const { appointmentType, ...rest } = current;
          return rest;
        });
      if (key === 'numberOfPeople')
        setChangeAppointmentInfo(current => {
          const { numberOfPeople, ...rest } = current;
          return rest;
        });
      answer = true;
    }
    return answer;
  };

  const submitHandler = useCallback(
    e => {
      e.preventDefault();

      let allCheck = false;

      if (
        appointmentInfo.personalInformationCollectionAndUsageAgreement &&
        appointmentInfo.privacyPolicyRead
      ) {
        if (!userInfo) setOpenAlert(true);
        else allCheck = true;
      } else {
        toast.error('필수 동의를 체크해주세요.');
        allCheck = false;
      }

      if (allCheck && userInfo) {
        isChangeAppointment('appointmentType');
        isChangeAppointment('numberOfPeople');
        const isTrue =
          isChangeAppointment('appointmentType') &&
          isChangeAppointment('numberOfPeople') &&
          !Object.keys(changeAppointmentInfo).includes('appointmentDate') &&
          !Object.keys(changeAppointmentInfo).includes('appointmentHour');
        if (isTrue) toast.error('기존 예약과 같습니다');
        else setOpenAlert(true);
      }
    },
    [appointmentInfo, changeAppointmentInfo, openAlert],
  );

  const handleDetailPolicy = labelContent => {
    setOpenPolicy(true);
    setSelectPolicy(labelContent);
  };

  return (
    <>
      {openAlert && (
        <ConfirmAlert
          page={userInfo ? 'change' : 'create'}
          alertInfo={userInfo ? ALERT_CHANGE_DATA : ALERT_DATA}
          userInfo={userInfo}
          appointmentInfo={userInfo ? prevAppointmentInfo : appointmentInfo}
          changeAppointmentInfo={userInfo && changeAppointmentInfo}
          appointmentCode={userInfo && prevAppointmentInfo.appointmentCode}
          setOpenAlert={setOpenAlert}
        />
      )}
      {openPolicy && (
        <DetailPolicy
          selectPolicy={selectPolicy}
          setOpenPolicy={setOpenPolicy}
        />
      )}
      <div className={cx('wrap')}>
        <Pagination pageNum={2} />
        <Title name={userInfo ? '예약변경' : '예약하기'} />
        <form onSubmit={submitHandler}>
          <UserInfoInput
            inputType='text'
            inputId='name'
            labelContent='이름'
            userInfo={userInfo}
            appointmentInfo={appointmentInfo}
            setAppointmentInfo={setAppointmentInfo}
          />
          <UserInfoInput
            inputType='text'
            inputId='phone'
            labelContent='전화번호'
            userInfo={userInfo}
            appointmentInfo={appointmentInfo}
            setAppointmentInfo={setAppointmentInfo}
          />
          <div className={cx('kind-wrap', 'input-wrap')}>
            <span className={cx('left')}>상담종류</span>
            <div className={cx('btn-wrap', 'right')}>
              <KindBtn
                btnName='CALL'
                btnContent='전화상담'
                userInfo={userInfo}
                appointmentInfo={appointmentInfo}
                setAppointmentInfo={setAppointmentInfo}
                changeAppointmentInfo={changeAppointmentInfo}
                setChangeAppointmentInfo={setChangeAppointmentInfo}
              />
              <KindBtn
                btnName='VISIT'
                btnContent='방문상담'
                userInfo={userInfo}
                appointmentInfo={appointmentInfo}
                setAppointmentInfo={setAppointmentInfo}
                changeAppointmentInfo={changeAppointmentInfo}
                setChangeAppointmentInfo={setChangeAppointmentInfo}
              />
            </div>
          </div>
          <SelectBox
            userInfo={userInfo}
            appointmentInfo={appointmentInfo}
            setAppointmentInfo={setAppointmentInfo}
            changeAppointmentInfo={changeAppointmentInfo}
            setChangeAppointmentInfo={setChangeAppointmentInfo}
          />
          <div className={cx('terms-wrap')}>
            {policyKeyList && (
              <>
                <TermsInputBtn
                  inputId='term1'
                  defaultCheck={
                    appointmentInfo.personalInformationCollectionAndUsageAgreement
                  }
                  labelContent={policyKeyList[0].key}
                  appointmentInfo={appointmentInfo}
                  setAppointmentInfo={setAppointmentInfo}
                  handleDetailPolicy={handleDetailPolicy}
                />

                <TermsInputBtn
                  inputId='term2'
                  defaultCheck={appointmentInfo.privacyPolicyRead}
                  labelContent={policyKeyList[1].key}
                  appointmentInfo={appointmentInfo}
                  setAppointmentInfo={setAppointmentInfo}
                  handleDetailPolicy={handleDetailPolicy}
                />
              </>
            )}
          </div>
          <Button content={userInfo ? '예약변경' : '예약확정'} />
        </form>
      </div>
    </>
  );
}

export default AppointmentForm;
