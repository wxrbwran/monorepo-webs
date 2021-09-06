import React, { useState, useEffect } from 'react';
import { Form, Row, Col, Checkbox } from 'antd';
import styles from '../../index.scss';

const FormItem = Form.Item;
const CheckboxGroup = Checkbox.Group;
interface IDep {
  id: number;
  name: string;
}
interface IDepartment {
  name: string;
  standardId: number;
}
function BaseDepartments() {
  const [departments, setDepartments] = useState<IDepartment[]>([]);
  useEffect(() => {
    window.$api.base.fetchBaseDepartments().then((res: { departments: IDep[] }) => {
      console.log(res);
      const depList: IDepartment[] = [];
      res.departments.forEach(({ id, name }: IDep) => {
        depList.push({
          name,
          standardId: id,
        });
      });
      setDepartments(depList);
    });
  }, []);

  return (
    <FormItem label="科室名称" name="departments">
      <CheckboxGroup>
        <Row className={styles.departments}>
          {departments.map((item) => (
            <Col span={6} key={item.standardId}>
              <Checkbox key={item.standardId} value={item}>
                {item.name}
              </Checkbox>
            </Col>
          ))}
        </Row>
      </CheckboxGroup>
    </FormItem>
  );
}

export default BaseDepartments;
