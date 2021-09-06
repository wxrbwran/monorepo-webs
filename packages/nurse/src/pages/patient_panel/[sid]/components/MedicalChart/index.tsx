import React from 'react';
import { useParams } from 'umi';
import dayjs from 'dayjs';
import * as api from '@/services/api';

interface Iprops {
  data: {
    measuredAt: number;
    abbreviation: string;
  };
}
function MedicalChart({ data }: Iprops) {
  const { abbreviation, measuredAt } = data;
  const { sid } = useParams<{ sid: string }>();
  // const [chartData, setChartData] = useState([]);
  // const [basicType, setBasicType] = useState('');

  const handleShowChart = () => {
    const params = {
      sid,
      wcId: window.$storage.getItem('patientWcId'),
      indexType: abbreviation,
    };
    api.medical.fetchMedicalIndex(params).then((res) => {
      console.log(1212, res);
      // setBasicType(res.type);
    });
  };
  return (
    <span className="date" onClick={handleShowChart}>
      {`(${dayjs(measuredAt).format('YY.MM.D')})`}
    </span>
  );
}

export default MedicalChart;
