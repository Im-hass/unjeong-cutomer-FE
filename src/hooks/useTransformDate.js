import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import 'dayjs/locale/ko';

const TODAY = new Date();
const DAY_ARR = ['일', '월', '화', '수', '목', '금', '토'];

function useTransformDate() {
  let day = dayjs(TODAY).format('d');
  const [sevenDayArr, setSevenDayArr] = useState([]);

  useEffect(() => {
    for (let i = 0; i < DAY_ARR.length; i += 1) {
      if (i === Number(day)) {
        day = DAY_ARR[i];
      }
    }

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
  }, [TODAY]);
  // console.log('커스텀훅', sevenDayArr);

  return [sevenDayArr];
}

export default useTransformDate;
