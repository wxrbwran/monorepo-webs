import React, { useState, useEffect } from 'react';
import { Form, Checkbox, Tooltip } from 'antd';
import { useSelector } from 'umi';

const FormItem = Form.Item;
const CheckboxGroup = Checkbox.Group;
interface IProps {
  form: Store;
}

function SendGroup({ form }: IProps) {
  const pureDepartmentList = useSelector((state: Store) => state?.org?.currentOrg?.pureDepartmentList);
  const [checkAll, setCheckAll] = useState(false);
  const [val, setCurrVal] = useState('');
  // const [group, setGroup] = useState<string[]>([]);

  const options = pureDepartmentList.map((item: { name: string, id: string })=> ({
    label: item.name,
    value: item.id,
  }));

  // options.unshift(
  //   {
  //     label: "全部患者",
  //     value: 'PATIENT_ALL',
  //   }
  // )

  const onChangeAll = (e: { target: { checked: any; }; }) => {
    setCurrVal('PATIENT_ALL');
    if (e.target.checked){
      setCheckAll(true);
    } else {
      setCheckAll(false);
    }
  };

  const onChange = (e: { target: { checked: any; value: string }; }) => {
    setCurrVal(e.target.value);
    if (!e.target.checked){
      setCheckAll(false);
    }
  };

  const changeGroup = (arr: string[]) => {
    console.log('arr', arr);
    // setGroup(arr);
  };

  useEffect(() => {
    if (checkAll){
      form.setFieldsValue({ group:  ['PATIENT_ALL', ...pureDepartmentList.map(item => item.id)] });
    } else if (val === 'PATIENT_ALL'){
      form.setFieldsValue({ group:  [] });
    } else {
      form.setFieldsValue({
        group: form.getFieldValue('group')?.filter(item => item !== 'PATIENT_ALL'),
      });
    }
  }, [checkAll]);
  return (
    <div className='mb-30'>
      <p className='font-bold text-base mb-15 mt-30'>·发送对象：</p>
      {/* <FormItem
        name={'group'}
        // noStyle
        rules={[{ required: true, message: '请选择发送对象' }]}
      >
        <CheckboxGroup
          options={options}
        />
      </FormItem> */}
      <FormItem
        name={'group'}
        // noStyle
        rules={[{ required: true, message: '请选择发送对象' }]}
      >
        <CheckboxGroup onChange={changeGroup}>
          <Checkbox
            value="PATIENT_ALL"
            onChange={onChangeAll}
          >
            全部患者
          </Checkbox>
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
  );
}

export default SendGroup;
