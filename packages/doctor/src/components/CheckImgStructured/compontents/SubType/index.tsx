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
  const { initSampleFrom, handleChangeSubType } = props;
  const [subTypeList, setSubTypeList] = useState([]); // 子分类列表
  const [form] = Form.useForm();
  useEffect(() => {
    const params = {
      keyWord: '',
    };
    api.indexLibrary.fetchIndexSampleFrom(params).then((res: any) => {
      setSubTypeList(res.list);
    });
  }, []);

  const handleValueChange = (_, allValues: any) => {
    console.log(allValues);
    handleChangeSubType([
      ...(allValues?.checkbox || []),
      ...(allValues?.selects || []),
    ].filter(v => v !== '其他'));
  };
  return (
    <div className="flex justify-start items-center">
      <span className="font-bold mr-5 text-sm">选择样品来源:</span>
      <Form
        form={form}
        onValuesChange={handleValueChange}
        initialValues={{
          checkbox: [...initSampleFrom],
          selects: [...initSampleFrom.filter((s) => !['血液', '其他'].includes(s))],
        }}
      >
        <Form.Item name="checkbox" noStyle>
          <Checkbox.Group>
            <Checkbox value="血液">血液</Checkbox>
            <Checkbox value="其他">其他</Checkbox>
          </Checkbox.Group>
        </Form.Item>
        <ProFormDependency name={['checkbox']}>
          {({ checkbox }: any) => {
            if (checkbox?.includes('其他')) {
              return (
                <Form.Item name="selects" noStyle>
                  <Select
                    mode="multiple"
                    allowClear
                    style={{ flex: 1, width: 200 }}
                    placeholder="请选择"
                    // onChange={handleChange}
                  >
                    {subTypeList
                      .filter((s) => !['血液', '其他'].includes(s))
                      .map((item) => (
                        <Option key={item} value={item}>
                          {item}
                        </Option>
                      ))}
                  </Select>
                </Form.Item>
              );
            }
            return null;
          }}
        </ProFormDependency>
      </Form>
    </div>
  );
};

export default SubType;
