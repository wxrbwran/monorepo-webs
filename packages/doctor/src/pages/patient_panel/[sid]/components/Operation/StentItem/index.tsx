import React, { useEffect, useState } from 'react';
import { Form, Input, Select } from 'antd';
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons';
import * as api from '@/services/api';
import StentSize from '../StentSize';
import styles from '../PlaceItem/index.scss';

interface IProps {
  item: number;
  parent: number;
  delStent: (index: number) => void;
  addStent: () => void;
  initData: CommonData;
  handleSetFieldsVal: (key: string, val: any) => void;
}

interface IStents {
  id: string;
  name: string;
}
const { Option } = Select;
function StentItem(props: IProps) {
  const {
    item, parent, delStent, addStent, initData, handleSetFieldsVal,
  } = props;
  const [stents, setStents] = useState <IStents[]>([]);

  useEffect(() => {
    // 获取支架列表
    api.diagnosis.fetchStent({ name: '' }).then((res) => {
      setStents(res.stents);
    });
  }, []);
  const handleSelect = (values: string, option: any, inx: number) => {
    console.log(values);
    const trea = {
      stentId: option.key,
      stentName: option.title,
    };
    handleSetFieldsVal(`stent_${parent}_${inx}`, trea);
  };
  return (
    <div className={styles.stents}>
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
  );
}

export default StentItem;
