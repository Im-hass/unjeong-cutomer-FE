import React, { useCallback } from 'react';
import classNames from 'classnames/bind';

import styles from './termsInputBtn.module.scss';
import { CheckIcon } from '../../assets/svg';

const cx = classNames.bind(styles);

function TermsInputBtn({
  inputId,
  defaultCheck,
  labelContent,
  appointmentInfo,
  setAppointmentInfo,
}) {
  const termClickHandler = useCallback(
    e => {
      const { id } = e.target;
      if (id === 'term1')
        setAppointmentInfo({
          ...appointmentInfo,
          personalInformationCollectionAndUsageAgreement:
            !appointmentInfo.personalInformationCollectionAndUsageAgreement,
        });
      else if (id === 'term2')
        setAppointmentInfo({
          ...appointmentInfo,
          privacyPolicyRead: !appointmentInfo.privacyPolicyRead,
        });
    },
    [appointmentInfo],
  );

  return (
    <div className={cx('term')}>
      <div className={cx('term-left')}>
        <div className={cx('checkbox-wrap')}>
          <input
            type='checkbox'
            id={inputId}
            onClick={termClickHandler}
            defaultChecked={defaultCheck}
          />
          <CheckIcon className={cx('icon')} />
        </div>
        <label htmlFor={inputId}>
          <span>(필수)</span> {labelContent}
        </label>
      </div>
      <button type='button'>상세</button>
    </div>
  );
}

export default TermsInputBtn;
