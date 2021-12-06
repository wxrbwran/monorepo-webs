import React, { FC } from 'react';
import { Cascader } from 'antd';

export type IDocList = {
  doctorList: {
    label: string;
    value: string;
    children: {
      label: string;
      value: string;
    }[]
  }
};
type IProps = {
  handleSelect: (ids: string[]) => void;
} & IDocList;

const SelectDoctor: FC<IProps> = ({ handleSelect, doctorList }) => {
  const options = doctorList;

  function handleChangeDoctor(value) {
    console.log('=======12111', value);
    let doctors: string[] = [];
    value.forEach((item: string[]) => {
      if (item.length > 1) {
        doctors.push(item[1]);
      } else {
        doctors = [
          ...doctors,
          ...options.filter(dep => dep.value === item[0])[0].children.map(doc => doc.value),
        ];
      }
    });
    console.log('doctors11', doctors);
    handleSelect(doctors);
  }
  function filter(inputValue: string, path: any[]) {
    return path.some(option => option.label.toLowerCase().indexOf(inputValue.toLowerCase()) > -1);
  }
  return (
    <>
      <span className="mr-10">医生</span>
      <Cascader
        style={{ width: 233 }}
        options={options}
        onChange={handleChangeDoctor}
        multiple
        showSearch={{ filter }}
        maxTagCount="responsive"
        placeholder="请选择"
      />
    </>
  );
};

export default SelectDoctor;
