import React, { FC, useState } from 'react';
import { Row, Col, Button, Form } from 'antd';
// import { Link } from 'umi';
// import { useRequest } from 'ahooks';
import {
  name,
  sex,
  age,
  province,
  upperDoctor,
  lowerDoctor,
} from 'xzl-web-shared/dist/utils/columns';
import { Province, Sex, Age, Search } from 'xzl-web-shared/dist/components/Selects';

// import SelectGroup from '@/components/SelectGroup';
import XzlTable from 'xzl-web-shared/dist/components/XzlTable';
import GroupMsg from '../components/GroupMsg';
import styles from './index.scss';

const columns = [name, sex, age, province, upperDoctor, lowerDoctor];

const SendGroupMsg: FC = () => {
  const [options, setOptions] = useState<Store>({});
  const [form] = Form.useForm();
  const handleValuesChange = (_, allValues) => {
    console.log('SendGroupMsg allValues', allValues);
    setOptions({ ...options, allValues });
  };
  return (
    <div className={styles.send_msg}>
      <div className={styles.content}>
        <Row justify="space-between" align="middle" className={styles.item}>
          <Col />
          <Col>
            <GroupMsg>
              <Button>群发消息</Button>
            </GroupMsg>
          </Col>
        </Row>
        <Row justify="space-between" align="middle" className={styles.item}>
          <Form
            className="xzl-uni-selects"
            form={form}
            onValuesChange={handleValuesChange}
            style={{ width: '100%' }}
          >
            <Province />
            <Sex />
            <Age />
            <Search form={form} searchKey="searchByDoctorOrPatientName" />
          </Form>
        </Row>
        <XzlTable
          columns={columns}
          dataKey="list"
          request={window.$api.patients.getPatients}
          depOptions={options}
        />
      </div>
    </div>
  );
};
SendGroupMsg.title = '群发消息';

export default SendGroupMsg;
