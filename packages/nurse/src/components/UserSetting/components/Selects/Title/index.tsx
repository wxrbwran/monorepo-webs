import React, { useState } from 'react';
import { titleList } from '@/utils/tools';
import { getCondition } from '@/utils/utils';
import { Select } from 'antd';

const { Option } = Select;
interface IProps {
  changeSelect: (val: ISelectItem, index: number) => void;
  deleteSelect: (inx: number) => void;
  index: number;
}
function Title(props: IProps) {
  const {
    changeSelect, deleteSelect, index,
  } = props;
  const [title, setTitle] = useState<string>('');
  const handleChange = (val: string) => {
    setTitle(val);
    const titleData = getCondition("sj.details->>'title'", val, 'like');
    if (val) {
      changeSelect(titleData, index);
    } else {
      deleteSelect(index);
    }
  };
  return (
    <Select
      placeholder="请选择"
      style={{ width: 120, marginRight: 15 }}
      onChange={(value) => handleChange(value)}
      value={title}
    >
      <Option value="">全部职称</Option>
      {(Object.keys(titleList)).map((t) => (
        <Option
          key={t}
          value={titleList[t]}
          title={titleList[t]}
        >
          {titleList[t]}
        </Option>
      ))}
    </Select>
  );
}
export default Title;
