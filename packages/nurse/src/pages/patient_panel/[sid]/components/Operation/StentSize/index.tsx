import React, { useEffect, useState } from 'react';
import {
  Input, InputNumber, Radio, Button, message,
} from 'antd';
import { RadioChangeEvent } from 'antd/lib/radio';
import DragModal from 'xzl-web-shared/dist/components/DragModal';
import styles from './index.scss';

const RadioGroup = Radio.Group;
interface Iprops {
  parent: Number;
  index: Number;
  handleSetFieldsVal: (key: string, val: any) => void;
  initValue: string | undefined;
}
function Size({
  parent, handleSetFieldsVal, index, initValue,
}: Iprops) {
  const [showSize, setShowSize] = useState(false);
  const [size, setSize] = useState<string>();
  const [sizeAfter, setSizeAfter] = useState<number | undefined>();
  const [sizeBefore, setSizeBefore] = useState<number | undefined>();
  const [sizeOfRadio, setSizeOfRadio] = useState<null | string>();
  const sizeOptions = ['13 x 25 mm', '18 x 27mm', '23 x 30 mm', '29 x 35 mm',
    '33 x 40 mm', '尺寸不详'];
  useEffect(() => {
    if (initValue) {
      if (sizeOptions.includes(initValue)) {
        setSizeOfRadio(initValue);
      } else {
        const valArr = initValue.split(' ');
        setSizeBefore(Number(valArr[0]) as number);
        setSizeAfter(Number(valArr[2]) as number);
      }
    }
  }, [initValue]);
  const handleToggleSize = () => {
    setShowSize(!showSize);
  };
  const handleSizeNumber = (value: any, type: string) => {
    if (type === 'sizeBefore') {
      setSizeBefore(value);
    } else {
      setSizeAfter(value);
    }
    setSizeOfRadio(null);
  };
  const onChangeModalSize = (e: RadioChangeEvent) => {
    const { value } = e.target;
    setSizeOfRadio(value);
    setSizeBefore(undefined);
    setSizeAfter(undefined);
  };
  const saveModalSize = () => {
    let saveSize = '';
    if (sizeOfRadio) {
      saveSize = sizeOfRadio;
    } else if (!!sizeBefore && !!sizeAfter) {
      saveSize = `${sizeBefore} x ${sizeAfter} mm`;
    } else {
      message.error('请完善尺寸信息！');
      return false;
    }
    setShowSize(false);
    setSize(saveSize);
    handleSetFieldsVal(`stentSize_${parent}_${index}`, saveSize);
    return true;
  };
  return (
    <div className={styles.size_wrap}>
      <Input value={size} onClick={handleToggleSize} defaultValue={initValue} />
      <DragModal
        wrapClassName="ant-modal-wrap-center"
        title="支架尺寸"
        footer={null}
        width="520px"
        visible={showSize}
        onCancel={handleToggleSize}
        maskClosable
      >
        <div className={styles.content}>
          <div className={styles.item}>
            <InputNumber
              placeholder="添加尺寸"
              value={sizeBefore}
              min={1}
              max={99}
              onChange={(value) => handleSizeNumber(value, 'sizeBefore')}
            />
            <span className={styles.sign}>x</span>
            <InputNumber
              value={sizeAfter}
              min={1}
              max={99}
              placeholder="添加尺寸"
              onChange={(value) => handleSizeNumber(value, 'sizeAfter')}
            />
            mm
          </div>
          <RadioGroup
            options={sizeOptions}
            className={styles.radio}
            size="large"
            onChange={onChangeModalSize}
            value={sizeOfRadio}
          />
          <div className={styles.item}>
            <Button type="primary" onClick={saveModalSize}>保存</Button>
          </div>
        </div>
      </DragModal>
    </div>
  );
}

export default Size;
