import React, { useState } from 'react';
import {
  Form, InputNumber, Select, message,
} from 'antd';
import HiddenItems from '../HiddenItems';

const { Option } = Select;
interface IProps {
  data: IImgTypeItems;
  itemInx: number;
  imageType: string;
}
interface IRange {
  max: number;
  min: number;
}
function ItemInput(props : IProps) {
  const { data, itemInx, imageType } = props;

  const getInitRange = () => {
    if (data.unit && data.unitList) {
      // 回显
      const { min, max } = data.unitList.filter((limitItem) => limitItem.unit === data.unit)[0];
      return { min, max };
    }
    // 初次打开或没值情况
    if (data?.unitList) {
      const { min, max } = data?.unitList?.[0]!;
      return { min, max };
    }
    return {
      min: 0,
      max: 99,
    };
  };
  const [range, setRange] = useState(getInitRange());
  const handleConfirmInput = (value: number, rangeVal: IRange) => {
    if (value < rangeVal.min || value > rangeVal.max) {
      message.error('超出允许填写范围！');
    }
  };

  const handleChangeUnit = (value: string) => {
    const { min, max } = data?.unitList?.filter((limitItem) => limitItem.unit === value)[0]!;
    setRange({ min, max });
  };
  // data
  console.log('imageType', imageType);
  return (
    <div>
      <HiddenItems inx={itemInx} />
      <div className="text-sm mt-10 mb-3">{data.name}</div>
      <div className="flex items-center item_input">
        <Form.Item
          name={`${itemInx}_value`}
          rules={
            [{
              message: '请正确填写!',
              required: false,
              min: +range.min,
              max: +range.max,
              type: 'number',
            }]
          }
        >
          <InputNumber onChange={(e) => { handleConfirmInput(e, range); }} />
        </Form.Item>
        {
          data?.unitList?.[0]?.unit && imageType !== 'GZ' && (
            <Form.Item
              name={`${itemInx}_unit`}
              noStyle
            >
              <Select onChange={handleChangeUnit} style={{ maxWidth: 100 }}>
                {
                  data.unitList?.map((item) => (
                    <Option key={item.unit} value={item.unit!}>{item.unit}</Option>
                  ))
                }
              </Select>
            </Form.Item>
          )
        }
      </div>
    </div>
  );
}

export default ItemInput;
