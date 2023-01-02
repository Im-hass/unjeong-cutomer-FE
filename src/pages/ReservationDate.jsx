import React from 'react';
import classNames from 'classnames/bind';

import styles from './reservationDate.module.scss';

const cx = classNames.bind(styles);

function ReservationDate() {
  return (
    <div className={cx('wrap')}>
      <p>2</p>
    </div>
  );
}

export default ReservationDate;
