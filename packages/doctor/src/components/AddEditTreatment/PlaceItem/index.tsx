// 冠状动脉支架列表
import React, { useState, useEffect } from 'react';
import {
  Form, Select, Input,
} from 'antd';
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons';
import SearchHospital from '@/components/SearchHospital';
import Calendar from '@/components/Calendar';
import StentItem from '../StentItem';
import styles from './index.scss';

const { Option } = Select;
interface Iprops{
  setFieldsValue: (val: object) => void;
  parent: number;
  add: () => void;
  remove: (index: number) => void;
  initData: CommonData;
  initQueue: number[];
}

let subUuid = 0;
function PlaceItem({
  setFieldsValue, parent, add, remove, initData, initQueue,
}: Iprops) {
  // console.log('initData11111', initData);
  const [initialQueue, setInitialQueue] = useState<number[]>(initQueue || [0]); // 选择的支架列表
  const locationList = ['位置不详', '左主干', '右主干', '前降支', '后降支', '回旋支', '对角支'];
  useEffect(() => {
    if (initQueue) {
      subUuid = initQueue.length;
    }
  }, [initQueue]);

  const handleSetFieldsVal = (key: string, val: any) => {
    if (key.startsWith('diagnosisAt')) {
      const dateArr = val.split('/');
      if (!!dateArr[0] && !!dateArr[1]) {
        setFieldsValue({
          [key]: val,
        });
      }
    } else {
      setFieldsValue({
        [key]: val,
      });
    }
  };
  const addStent = () => {
    // console.log('subUuid', subUuid);
    // console.log(4343, initQueue);
    // console.log(222, subUuid);
    subUuid++;
    setInitialQueue([...initialQueue, subUuid]);
  };
  const delStent = (index: number) => {
    // console.log('delindex', index);
    if (initialQueue.length !== 1) {
      const newInitQueue = [...initialQueue.filter((i) => i !== index)];
      // console.log('newInitQueue', newInitQueue);
      setInitialQueue(newInitQueue);
    }
  };
  return (
    <div key={`location-${parent}`}>
      <div className={styles.location_wrap}>
        <div className={styles.location_item}>
          <Form.Item
            name={`location_${parent}`}
            rules={[{ required: true, message: '请选择位置!' }]}
          >

            <Select
              className={styles.select}
              placeholder="选择位置"
              // defaultValue={initData[`location_${parent}`]}
            >
              {locationList.map((loc) => (
                <Option key={loc} value={loc} title={loc}>
                  {loc}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <span>
            <PlusOutlined onClick={add} />
            <DeleteOutlined onClick={() => remove(parent)} />
          </span>
        </div>
        {
          initialQueue.map((item) => (
            <StentItem
              key={`coronary-${item}`}
              parent={parent}
              item={item}
              addStent={addStent}
              delStent={delStent}
              handleSetFieldsVal={handleSetFieldsVal}
              initData={initData}
            />
          ))
          }
      </div>
      <div className="form_item">
        <Form.Item
          label="诊断日期"
          name={`diagnosisAt_${parent}`}
          rules={[{ required: true, message: '请输入诊断日期!' }]}
        >
          <Input type="hidden" />
        </Form.Item>
        <Calendar
          needInit={false}
          value={initData[`diagnosisAt_${parent}`]}
          onChange={(dateString) => handleSetFieldsVal(`diagnosisAt_${parent}`, dateString)}
        />
      </div>
      <div className="form_item">
        <Form.Item
          label="处理医院"
          name={`hospital_${parent}`}
        >
          <Input type="hidden" />
        </Form.Item>
        <SearchHospital
          placeholder="请输入处理医院"
          callback={handleSetFieldsVal}
          fieldName={`hospital_${parent}`}
          style={{ width: '376px' }}
          defaultValue={initData[`hospital_${parent}`]}
        />
      </div>
    </div>
  );
}

export default PlaceItem;
