import React, { useState } from 'react';
import {
  Form, Select, Input, Button, Radio,
} from 'antd';
import { debounce } from 'lodash';
import DragModal from 'xzl-web-shared/dist/src/components/DragModal';
import { departmentType } from 'xzl-web-shared/dist/src/utils/consts';

interface Iprops {
  setFieldsValue: (params: any) => void;
  getFieldValue: (params: any) => void;
  nameKey: string;
  idKey: string;
  disabled: boolean;
  field: any;
}
export interface Ihospital {
  id: string;
  name: string;
}

const { Option } = Select;
const RadioGroup = Radio.Group;
function Department(props: Iprops) {
  const {
    setFieldsValue, getFieldValue, nameKey, idKey, disabled, field,
  } = props;
  console.log('field', field);
  const [department, setDepartment] = useState <Ihospital[]>([]);
  const [showModal, setshowModal] = useState(false);

  const fetchDeparment = (name: string) => {
    const params = {
      name,
      pageAt: 1,
      pageSize: 999999,
    };
    window.$api.base.fetchSearchDepartments(params).then((res) => {
      setDepartment(res.departmentList);
    });
  };
  const handleSearch = (value: string) => {
    if (value) {
      fetchDeparment(value);
    }
  };
  const handleSelect = (value: string, option: any) => {
    if (value === 'unresult') {
      // 显示弹框
      setshowModal(true);
    } else {
      const practiceAreas = getFieldValue('practiceAreas');
      practiceAreas[field.name] = {
        ...practiceAreas[field.name],
        [nameKey]: option.children,
        [idKey]: value,
      };
      setFieldsValue({ practiceAreas });
    }
  };
  const handleAddDep = (values: { labelType: string, departmentName: string }) => {
    const { labelType, departmentName } = values;
    const practiceAreas = getFieldValue('practiceAreas');
    practiceAreas[field.name] = {
      ...practiceAreas[field.name],
      labelType,
      [nameKey]: departmentName,
      [idKey]: null,
    };
    setFieldsValue({ practiceAreas });
    setshowModal(false);
  };
  console.log(disabled);
  return (
    <>
      <Form.Item
         name={[field.name, 'labelType']}
        noStyle
      >
        <Input type="hidden" />
      </Form.Item>
      <Form.Item
        name={[field.name, idKey]}
        noStyle
      >
        <Input type="hidden" />
      </Form.Item>
      <Form.Item
        label=""
        name={[field.name, nameKey]}
      >
        <Select
          showSearch
          onSearch={debounce((value) => handleSearch(value), 500)}
          placeholder="请输入科室名称"
          showArrow={false}
          filterOption={false}
          onSelect={handleSelect}
          style={{ width: '285px' }}
          // disabled={disabled}
          allowClear
        >
          {department.map((medicine) => (
            <Option key={medicine.id} value={medicine.id}>
              {medicine.name}
            </Option>
          ))}
          <Option
            value="unresult"
            style={{ display: (department.length === 0) ? 'block' : 'none' }}
          >
            未找到想要的科室，点击添加新科室
          </Option>
        </Select>
      </Form.Item>
      {
        showModal && (
          <DragModal
            wrapClassName="ant-modal-wrap-center"
            width="580px"
            visible={showModal}
            title="添加科室"
            onCancel={() => setshowModal(false)}
            footer={null}
          >
            <div>
              <Form
                name="addDepartment"
                labelCol={{ span: 4 }}
                wrapperCol={{ span: 20 }}
                initialValues={{ remember: true }}
                onFinish={handleAddDep}
                id="height42"
              >
                <Form.Item
                  label="科室名称"
                  name="departmentName"
                  rules={[{ required: true, message: '请填写科室名称!' }]}
                >
                  <Input placeholder="请输入科室名" />
                </Form.Item>
                <Form.Item label="科室类型" name="labelType" rules={[{ required: true, message: '请选择科室类型!' }]}>
                  <RadioGroup>
                    {departmentType.map((type) => (
                      <Radio key={type.key} value={type.key}>
                        {type.text}
                      </Radio>
                    ))}
                  </RadioGroup>
                </Form.Item>
                <div className="common__btn">
                  <Button onClick={() => setshowModal(false)}>取消</Button>
                  <Button
                    type="primary"
                    htmlType="submit"
                    className="finish"
                  >
                    确定
                  </Button>
                </div>
              </Form>
            </div>
          </DragModal>
        )
      }
    </>
  );
}

export default Department;
