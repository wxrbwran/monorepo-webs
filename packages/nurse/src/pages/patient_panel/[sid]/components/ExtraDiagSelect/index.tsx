import React, { useState } from 'react';
import debounce from 'lodash/debounce';
import { message, Select, Spin } from 'antd';
import * as api from '@/services/api';

const { Option } = Select;
interface Iprops {
  disease: string;
  changeDiagnose: Function;
}
interface IDisease {
  name: string;
  id: string;
}

function ExtraDiagSelect({ disease, changeDiagnose }: Iprops) {
  const [fetching, setFetching] = useState(false);
  const [diseaseList, setDiseaseList] = useState<IDisease[]>([]);

  const fetchDisease = (val: string) => {
    setFetching(true);
    if (val.trim()) {
      const params = { name: val };
      api.diagnosis.fetchDisease(params).then((res) => {
        if (res.diseaseInfos.length === 0) {
          message.warn('没有该诊断信息');
          setFetching(false);
        }
        setDiseaseList(res.diseaseInfos);
      });
    }
  };

  return (
    <>
      <Select
        showSearch
        placeholder="请输入诊断"
        showArrow={false}
        filterOption={false}
        onSearch={debounce((value) => {
          fetchDisease(value);
        }, 500)}
        onChange={(values, option) => changeDiagnose(values, option)}
        notFoundContent={fetching ? <Spin size="small" /> : null}
        style={{ width: 258, marginBottom: 5 }}
        value={disease ? disease.diseaseName : undefined}
      >
        {diseaseList.map((dis) => (
          <Option
            key={dis.id}
            value={dis.id}
            title={dis.name}
          >
            {dis.name}
          </Option>
        ))}
      </Select>
    </>
  );
}

export default ExtraDiagSelect;
