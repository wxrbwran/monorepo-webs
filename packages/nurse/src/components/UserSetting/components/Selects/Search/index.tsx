import React, { useState } from 'react';
import { getCondition } from '@/utils/utils';
import { Input } from 'antd';

interface IProps {
  changeSelect: (val: ISelectItem, index: number) => void;
  deleteSelect: (inx: number) => void;
  index: number;
}
function Search(props: IProps) {
  const {
    changeSelect, deleteSelect, index,
  } = props;
  const [keyword, setKeyword] = useState<string>('');

  const searchPatients = (val: string) => {
    setKeyword(val);
    const searchData = getCondition("sj.details->>'name',sj.details->>'tel'", val, 'like');
    if (val) {
      changeSelect(searchData, index);
    } else {
      deleteSelect(index);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setKeyword(val);
  };
  return (
    <Input.Search
      placeholder="输入姓名或手机号进行搜索"
      style={{ width: 200 }}
      value={keyword}
      onChange={handleChange}
      onSearch={searchPatients}
    />
  );
}
export default Search;
