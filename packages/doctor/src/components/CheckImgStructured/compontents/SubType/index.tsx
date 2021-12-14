import React, { FC, useEffect, useState } from 'react';
import { Select, Form, Checkbox } from 'antd';
import { ProFormDependency } from '@ant-design/pro-form';
import * as api from '@/services/api';

// 子分类： 选择样品来源，检查部分
const { Option } = Select;
interface IProps {
  leve1Type: string;
  initSampleFrom: string[];
  handleChangeSubType: (params: string[]) => void;
}
const SubType: FC<IProps> = (props) => {
  const { leve1Type, initSampleFrom } = props;
  const [subTypeList, setsubTypeList] = useState([]); // 子分类列表
  const [form] = Form.useForm();
  useEffect(() => {
    const params = {
      type: leve1Type,
      sourceSid: window.$storage.getItem('sid'),
    };
    api.indexLibrary.fetchIndexSampleFrom(params).then((res: any) => {
      setsubTypeList(res.list);
    });
  }, []);
  // const handleChange = (selectType: string[]) => {
  //   handleChangeSubType(selectType);
  // };
  const handleValueChange = (changedValues, allValues) => {
    console.log(changedValues, allValues);
  };
  return (
    <div className="flex justify-start items-center">
      <span className="font-bold mr-5 text-sm">选择样品来源:</span>
      <Form form={form} onValuesChange={handleValueChange}>
        <Form.Item name="checkbox" noStyle>
          <Checkbox.Group>
            <Checkbox value="血液">血液</Checkbox>
            <Checkbox value="其他">其他</Checkbox>
          </Checkbox.Group>
        </Form.Item>
        <ProFormDependency name="checkbox">
          {({ checkbox }: any) => {
            console.log('checkbox', checkbox);
          } }
        </ProFormDependency>
        <Form.Item name="selects" noStyle>
          <Select
            mode="multiple"
            allowClear
            style={{ flex: 1 }}
            placeholder="请选择"
            defaultValue={initSampleFrom}
            // onChange={handleChange}
          >
            {subTypeList.map((item) => (
              <Option key={item} value={item}>
                {item}
              </Option>
            ))}
          </Select>
        </Form.Item>
      </Form>
    </div>
  );
};

export default SubType;
