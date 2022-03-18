import React, { useEffect, useState } from 'react';
import {
  Form, Input, Radio, InputNumber, RadioChangeEvent, message,
} from 'antd';
import HiddenItems from '../HiddenItems';

interface IProps {
  setFieldsValue: (params: object) => void;
  getFieldValue: (params: string) => number;
  data: IImgTypeItems;
  itemInx: number;
  imageType: string;
}
function ItemRadio(props: IProps) {
  const {
    setFieldsValue, data, itemInx, imageType, getFieldValue,
  } = props;
  const [inputNumVal, setInputNum] = useState<number>();
  const [radioVal, setRadioVal] = useState<Number>();
  useEffect(() => {
    setTimeout(() => {
      const val = getFieldValue(`${itemInx}_value`);
      // 如果值大于0，表示为阳性
      setRadioVal(val > 0 ? 1 : getFieldValue(`${itemInx}_value`));
      if (val > 0 && val !== 1) {
      // 值大于0为阳性，且值不等于1，表示input框输入了内容值，此时回显
        setInputNum(val);
      }
    }, 300);
  }, [itemInx]);
  const onChange = (e: RadioChangeEvent) => {
    console.log(e.target.value);
    const { value } = e.target;
    setRadioVal(value);
    setFieldsValue({
      [`${itemInx}_value`]: value,
    });
  };
  const onChangeNum = (value: number) => {
    if (value > 0) {
      setInputNum(value);
      setFieldsValue({
        [`${itemInx}_value`]: value,
      });
    } else {
      message.error('请输入大于1的数值');
    }
  };
  return (
    <div>
      <HiddenItems inx={itemInx} />
      <div className="text-sm mt-10 mb-3">{data.name}</div>
      <Form.Item name={`${itemInx}_value`} noStyle>
        <Input type="hidden" />
      </Form.Item>
      <div>
        {/* defaultValue={1} */}
        <Radio.Group onChange={onChange} value={radioVal}>
          <Radio value={-1}>阴性</Radio>
          {
            // 原项目弱阳性写的0.现在用表单，如果是0回显有问题。目前先写-1，后面在具体看
            data.name === '潜血' && imageType === 'NCG' && <Radio value={-2}>弱阳性+/-</Radio>
          }
          <Radio value={1}>阳性</Radio>
        </Radio.Group>
        {
          imageType === 'NCG' && (
            <InputNumber
              min={0}
              style={{ width: 50, height: 25 }}
              disabled={radioVal !== 1}
              onChange={onChangeNum}
              value={inputNumVal}
            />
          )
        }
        +
      </div>
    </div>
  );
}

export default ItemRadio;
