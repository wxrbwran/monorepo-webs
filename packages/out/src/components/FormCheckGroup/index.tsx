import type { FC } from 'react';
import React, { useState } from 'react';
import { Form, Row, Checkbox, Col } from 'antd';
import type { Store } from 'antd/lib/form/interface';

interface IProps {
  form: Store;
  label: string;
  name: string;
  menus: Store[];
  errorMsg?: string;
  labelField?: string;
  valField?: string;
}

const FormCheckGroup: FC<IProps> = (props) => {
  const { form, menus, label, errorMsg, name, valField, labelField } = props;
  const [indeterminate, setIndeterminate] = useState(true);
  const [checkAll, setCheckAll] = useState(false);
  const checkBoxVals = menus.map((menu) => menu[valField]);

  const onCheckAllChange = (e) => {
    if (e.target.checked) {
      form.setFields([
        {
          name,
          value: checkBoxVals,
        },
      ]);
    } else {
      form.setFields([
        {
          name,
          value: [],
        },
      ]);
    }
    setIndeterminate(false);
    setCheckAll(e.target.checked);
  };
  const onCheckChange = (list) => {
    setIndeterminate(!!list.length && list.length < checkBoxVals.length);
    setCheckAll(list.length === checkBoxVals.length);
  };

  return (
    <Form.Item label={label}>
      <Row className="mb-10">
        <Checkbox indeterminate={indeterminate} onChange={onCheckAllChange} checked={checkAll}>
          全选
        </Checkbox>
      </Row>
      <Form.Item
        noStyle
        name={name}
        rules={[
          {
            required: true,
            message: errorMsg,
          },
        ]}
      >
        <Checkbox.Group onChange={onCheckChange} style={{ width: '100%' }}>
          <Row className="w-full">
            {menus.map((menu: Store) => (
              <Col span={8} key={menu[valField]}>
                <Checkbox value={menu[valField]}>{menu[labelField]}</Checkbox>
              </Col>
            ))}
          </Row>
        </Checkbox.Group>
      </Form.Item>
    </Form.Item>
  );
};

FormCheckGroup.defaultProps = { labelField: 'text', valField: 'val' };
export default FormCheckGroup;
