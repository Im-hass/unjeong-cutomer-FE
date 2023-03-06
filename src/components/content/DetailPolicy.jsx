import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';

import styles from './detailPolicy.module.scss';
import MarkdownViewer from '../ui/MarkdownViewer';
import { getDetailPolicyContent } from '../../store/api/policy';

const cx = classNames.bind(styles);

function DetailPolicy({ selectPolicy, setOpenPolicy }) {
  const [policyContent, setPolicyContent] = useState();

  useEffect(() => {
    getDetailPolicyContent(selectPolicy)
      .then(res => {
        setPolicyContent(res.data.data.contents);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  const handleClose = () => {
    setOpenPolicy(false);
  };

  return (
    <div className={cx('detailPolicy-wrap')}>
      <div className={cx('header-wrap')}>
        <div className={cx('title')}>{selectPolicy}</div>
        <button type='button' onClick={handleClose} className={cx('btn')}>
          닫기
        </button>
      </div>
      {policyContent && (
        <div className={cx('markdownViewer-wrap')}>
          <MarkdownViewer value={policyContent} />
        </div>
      )}
    </div>
  );
}

export default DetailPolicy;
