import React, { useEffect } from 'react';
import { Form, Checkbox } from 'antd';
import { useSelector } from 'umi';

const FormItem = Form.Item;
const CheckboxGroup = Checkbox.Group;
interface IProps {
  form: Store;
}

function SendGroup({ form }: IProps) {
  const pureDepartmentList = useSelector((state: Store) => state?.org?.currentOrg?.pureDepartmentList);
  const [checkAll, setCheckAll] = React.useState(false);

  const options = pureDepartmentList.map((item: {name: string, id: string})=> ({
    label: item.name,
    value: item.id,
  }));

  const onChangeAll = e => {
    setCheckAll(e.target.checked);
    if(e.target.checked){
      console.log('666', pureDepartmentList.map(item => item.id));
      // form.setFieldsValue({ group:  pureDepartmentList.map(item => item.id)})
    }else{
      form.setFieldsValue({ group:  []})
    }
  };
  const onChange = (e) => {
    console.log('eeeee', e);
    // setCheckAll(false);
    form.setFieldsValue({ group:  pureDepartmentList.map(item => item.id)})
    if(e.target.checked && e.target.value === 'PATIENT_ALL'){
      setCheckAll(true)
    }
    if(!e.target.checked && e.target.value === 'PATIENT_ALL'){
      setCheckAll(false)
    }
  }
  const changeGroup = (_e, ev) => {
    console.log('ev', ev);
    // form.setFieldsValue({ group:  pureDepartmentList.map(item => item.id)})
  }

  useEffect(() => {
    if(checkAll){
      form.setFieldsValue({ group:  pureDepartmentList.map(item => item.id)})
    }else{
      form.setFieldsValue({ group:  []})
    }
  }, [checkAll])

  options.unshift(
    {
      label: "全部患者",
      value: 'PATIENT_ALL',
    }
  )
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
          onChange={onChange}
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
              <Checkbox value={item.value} onChange={onChange}> {item.label}</Checkbox>
            ))
          }
        </CheckboxGroup>
      </FormItem>
    </div>
  )
}

export default SendGroup;
