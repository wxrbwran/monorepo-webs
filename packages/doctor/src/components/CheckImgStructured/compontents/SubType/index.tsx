import React, { FC, useEffect, useState } from 'react';
import { Select } from 'antd';
import * as api from '@/services/api';

// 子分类： 选择样品来源，检查部分
const { Option } = Select;
interface IProps {
  leve1Type: string;
  initSampleFrom: string[];
  handleChangeSubType: (params: string[]) => void;
}
const SubType: FC<IProps> = (props) => {
  const { leve1Type, handleChangeSubType, initSampleFrom } = props;
  const [subTypeList, setsubTypeList] = useState([]); // 子分类列表
  useEffect(() => {
    const params = {
      type: leve1Type,
      sourceSid: window.$storage.getItem('sid'),
    };
    api.indexLibrary.fetchIndexSampleFrom(params).then((res) => {
      setsubTypeList(res.list);
    });
  }, []);
  const handleChange = (selectType: string[]) => {
    handleChangeSubType(selectType);
  };
  return (
    <div className="flex justify-start items-center">
      <span className="font-bold mr-5 text-sm">
        选择样品来源:
      </span>
      <Select
        mode="multiple"
        allowClear
        style={{ flex: 1 }}
        placeholder="请选择"
        defaultValue={initSampleFrom}
        onChange={handleChange}
      >
        {
          subTypeList.map((item) => <Option key={item} value={item}>{item}</Option>)
        }
      </Select>
    </div>
  );
};

export default SubType;
