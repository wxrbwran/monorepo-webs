import React, { useState } from 'react';
import { Form, Checkbox, Tooltip } from 'antd';
import { useSelector } from 'umi';

const FormItem = Form.Item;
const CheckboxGroup = Checkbox.Group;
interface IProps {
  form: Store;
}

function SendGroup({ form }: IProps) {
  const pureDepartmentList = useSelector((state: Store) => state?.org?.currentOrg?.pureDepartmentList);
  const [indeterminate, setIndeterminate] = useState(true);
  const [checkAll, setCheckAll] = useState(false);

  const options = pureDepartmentList.map((item: {name: string, id: string})=> ({
    label: item.name,
    value: item.id,
  }));

  // options.unshift(
  //   {
  //     label: "全部患者",
  //     value: 'PATIENT_ALL',
  //   }
  // )

  const onChange = list => {
    setIndeterminate(!!list.length && list.length < options.length);
    setCheckAll(list.length === options.length);
    if(list.length === options.length){
      form.setFieldsValue({ group: ['PATIENT_ALL', ...list]})
    }else{
      form.setFieldsValue({ group: list})
    }
  };

  const onCheckAllChange = e => {
    form.setFieldsValue({
      group:  e.target.checked ? ['PATIENT_ALL', ...options.map(item => item.value)] : []
    })
    setIndeterminate(false);
    setCheckAll(e.target.checked);
  };

  return (
    <div className='mb-30'>
      <p className='font-bold text-base mt-30'>·发送对象：</p>
      <Checkbox
        value="PATIENT_ALL"
        indeterminate={indeterminate}
        onChange={onCheckAllChange}
        checked={checkAll}
      >
        全部患者
      </Checkbox>
      <FormItem
        name={'group'}
        // noStyle
        rules={[{ required: true, message: '请选择发送对象' }]}
      >
        <CheckboxGroup
          onChange={onChange}
        >
          {
            options.map(item => (
              <Tooltip title={item.label}>
                <Checkbox value={item.value} onChange={onChange}> {item.label}</Checkbox>
              </Tooltip>
            ))
          }
        </CheckboxGroup>
      </FormItem>
    </div>
  )
}

export default SendGroup;
