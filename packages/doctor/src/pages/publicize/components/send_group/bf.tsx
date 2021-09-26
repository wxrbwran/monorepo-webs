import React from 'react';
import { Form, Checkbox } from 'antd';
import { useSelector } from 'umi';

const FormItem = Form.Item;
const CheckboxGroup = Checkbox.Group;
// interface IProps {
//   form: Store;
// }

function SendGroup() {
  const pureDepartmentList = useSelector((state: Store) => state?.org?.currentOrg?.pureDepartmentList);
  const [indeterminate, setIndeterminate] = React.useState(true);
  const [checkAll, setCheckAll] = React.useState(false);
  const [checkedList, setCheckedList] = React.useState();

  const options = pureDepartmentList.map((item: { name: string, id: string })=> ({
    label: item.name,
    value: item.id,
  }));

  const onCheckAllChange = e => {
    setCheckedList(e.target.checked ? options : []);
    setIndeterminate(false);
    setCheckAll(e.target.checked);
  };

  const onChange = list => {
    setCheckedList(list);
    setIndeterminate(!!list.length && list.length < options.length);
    setCheckAll(list.length === options.length);
  };

  // options.unshift(
  //   {
  //     label: "全部患者",
  //     value: 'PATIENT_ALL',
  //   }
  // )
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
        <CheckboxGroup value={checkedList}>
          <Checkbox
            value="PATIENT_ALL"
            indeterminate={indeterminate}
            onChange={onCheckAllChange}
            checked={checkAll}
          >
            全部患者
          </Checkbox>
          {
            options.map(item => (
              <Checkbox
                value={item.value}
                onChange={onChange}
              >
                {item.label}
              </Checkbox>
            ))
          }
        </CheckboxGroup>
      </FormItem>
    </div>
  );
}

export default SendGroup;
