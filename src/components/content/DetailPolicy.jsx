import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';

import styles from './detailPolicy.module.scss';
import MarkdownViewer from '../ui/MarkdownViewer';
import { getDetailPolicyContent } from '../../store/api/policy';

const cx = classNames.bind(styles);

function DetailPolicy({ selectPolicy, setOpenPolicy }) {
  const [policyContent, setPolicyContent] = useState();

  useEffect(() => {
    setPolicyContent(
      "# Title1\n## Title2\n### Title3\n#### Title4\n##### Title5\n###### Title6\n\n\n----------\n\n\n**Bold**\n\n*Italic*\n\nst~~rike~~through\n\n[link](https://www.naver.com/)\n\n> Quote\n\n`console.log('hello, world!');`\n\n<!-- comment -->\n\n![img](https://example.com/your-image.png)\n\n- line1\n- line2\n- line3\n\n1. ordered list1\n2. ordered list2\n3. ordered list3\n\n- [ ] check list\n- [ ] check list\n- [ ] check list\n\n\n\n",
    );
    // getDetailPolicyContent(selectPolicy)
    //   .then(res => {
    //     console.log(res);
    //   })
    //   .catch(err => {
    //     console.log(err);
    //   });
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
