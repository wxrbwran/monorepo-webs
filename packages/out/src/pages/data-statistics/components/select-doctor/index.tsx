import React, { FC } from 'react';
import { Cascader } from 'antd';

const SelectDoctor: FC = () => {
  const options = [
    {
      label: 'Light',
      value: 'light',
      children: new Array(20)
        .fill(null)
        .map((_, index) => ({ label: `Number ${index}`, value: index })),
    },
    {
      label: 'Bamboo',
      value: 'bamboo',
      children: [
        {
          label: 'Little',
          value: 'little',
          children: [
            {
              label: 'Toy Fish',
              value: 'fish',
            },
            {
              label: 'Toy Cards',
              value: 'cards',
            },
            {
              label: 'Toy Bird',
              value: 'bird',
            },
          ],
        },
      ],
    },
  ];

  function handleChangeDoctor(value) {
    console.log(value);
  }
  function filter(inputValue, path) {
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
