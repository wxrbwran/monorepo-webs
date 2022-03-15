// 冠状动脉支架列表
import React, { useState, useEffect } from 'react';
import {
  Form, Select, Input,
} from 'antd';
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons';
import SearchHospital from '@/components/SearchHospital';
import Calendar from '@/components/Calendar';
import * as api from '@/services/api';
import StentSize from '../StentSize';
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
interface Istents {
  id: string;
  name: string;
}
let subUuid = 0;
function PlaceItem({
  setFieldsValue, parent, add, remove, initData, initQueue,
}: Iprops) {
  // console.log('initData11111', initData);
  const [stents, setStents] = useState <Istents[]>([]);
  const [initialQueue, setInitialQueue] = useState<number[]>(initQueue || [0]); // 选择的支架列表
  const locationList = ['位置不详', '左主干', '右主干', '前降支', '后降支', '回旋支', '对角支'];
  useEffect(() => {
    if (initQueue) {
      subUuid = initQueue.length;
    }
  }, [initQueue]);
  useEffect(() => {
    // 获取支架列表
    api.diagnosis.fetchStent({ name: '' }).then((res) => {
      setStents(res.stents);
    });
  }, []);
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
  const handleSelect = (values: string, option: any, item: number) => {
    console.log(values);
    const trea = {
      stentId: option.key,
      stentName: option.title,
    };
    handleSetFieldsVal(`stent_${parent}_${item}`, trea);
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
            <div className={styles.stents} key={`coronary-${item}`}>
              <div className={styles.stents_form_item}>
                <Form.Item
                  name={`stent_${parent}_${item}`}
                  className={styles.coronary}
                  rules={[{ required: true, message: '请选择支架!' }]}
                >
                  <Input type="hidden" />
                </Form.Item>
                <Select
                  placeholder="选择支架"
                  filterOption={false}
                  onChange={(val, option) => handleSelect(val, option, item)}
                  defaultValue={initData[`stent_${parent}_${item}`] && initData[`stent_${parent}_${item}`].stentName}
                >
                  <Option key="dev.aeJk0w" value="型号不详" title="型号不详" data="型号不详">
                    型号不详
                  </Option>
                  {stents.map((c) => (
                    <Option key={c.id} value={c.name} title={c.name} data={c}>
                      {c.name}
                    </Option>
                  ))}
                </Select>
              </div>

              <div className={styles.size}>
                <Form.Item
                  name={`stentSize_${parent}_${item}`}
                  rules={[{ required: true, message: '请选择尺寸!' }]}
                >
                  <StentSize
                    parent={parent}
                    index={item}
                    handleSetFieldsVal={handleSetFieldsVal}
                    initValue={initData[`stentSize_${parent}_${item}`]}
                  />
                </Form.Item>

              </div>
              <PlusOutlined onClick={addStent} />
              <DeleteOutlined onClick={() => delStent(item)} />
            </div>
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
          // year={getDateVal(initData[`diagnosisAt_${parent}`], 'year')}
          // month={getDateVal(initData[`diagnosisAt_${parent}`], 'month')}
          // day={getDateVal(initData[`diagnosisAt_${parent}`], 'day')}
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
