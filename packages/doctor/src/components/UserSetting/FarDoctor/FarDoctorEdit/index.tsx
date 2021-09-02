import React from 'react';
import {
  Form, Button, Input, Select, Radio,
} from 'antd';
import config from '@/config';
import { titleList } from '@/utils/tools';
import styles from './index.scss';

interface Iporps {
  cancelSave: () => void;
  type: string;
}
const { Option } = Select;
const RadioGroup = Radio.Group;
function FarDoctorEdit({ cancelSave, type }: Iporps) {
  console.log(cancelSave, type);

  const onFinish = (values: any) => {
    console.log(values);
    cancelSave();
  };
  const initialValues = {
    name: '高',
    daa: 23,
  };

  return (
    <div className={styles.far_doctor}>
      <div className={styles.info_wrap}>
        <div className={styles.left}>
          <img src={config.defaultAvatar} alt="头像" />
        </div>
        <div className={styles.right}>
          <Form
            // {...layout}
            name="basic"
            initialValues={initialValues}
            onFinish={onFinish}
          >
            <div className={styles.form_item}>
              <Form.Item
                label="姓名"
                name="name"
                rules={[{ required: true, message: 'Please input your username!' }]}
                className={styles.name}
              >
                <Input style={{ width: 140 }} />
              </Form.Item>

              <Form.Item
                label="性别"
                name="sex"
                rules={[{ required: true, message: 'Please input your password!' }]}
              >
                <RadioGroup
                  defaultValue={1}
                >
                  <Radio value={1}>男</Radio>
                  <Radio value={0}>女</Radio>
                </RadioGroup>
              </Form.Item>

              <Form.Item
                label="职称"
                name="title"
              >
                <Select
                  placeholder="请选择职称"
                  className="item"
                  defaultValue="主任医师"
                  style={{ width: 257, height: 40 }}
                  size="large"
                >
                  {
                    titleList.map((item: string) => (
                      <Option value={item} key={item}>{item}</Option>
                    ))
                  }
                </Select>
              </Form.Item>
            </div>
            <div className={styles.form_item}>
              <Form.Item
                label="科室"
                name="department"
              >
                <Input style={{ width: 300 }} />
              </Form.Item>
              <Form.Item
                label="第一执业医院"
                name="firstProfessionCompany"
              >
                <Input style={{ width: 300 }} />
              </Form.Item>
            </div>
            <div className="form_item_area">
              <Form.Item
                label="个人简介"
                name="biography"
              >
                <Input.TextArea
                  autoSize={{ minRows: 2, maxRows: 2 }}
                  style={{ width: '395' }}
                />
              </Form.Item>
              <Form.Item
                label="擅长领域"
                name="expertise"
              >
                <Input.TextArea
                  autoSize={{ minRows: 2, maxRows: 2 }}
                  style={{ width: '395' }}
                />
              </Form.Item>
            </div>
            <div className="form_item_area">
              <Form.Item
                label="科研成果"
                name="experience"
              >
                <Input.TextArea
                  className="item"
                  autoSize={{ minRows: 2, maxRows: 2 }}
                  style={{ width: '395' }}
                />
              </Form.Item>
              <Form.Item
                label="会议讲课"
                name="meetingLecture"
              >
                <Input.TextArea
                  className="item"
                  autoSize={{ minRows: 2, maxRows: 2 }}
                  style={{ width: '395' }}
                />
              </Form.Item>
            </div>
            <div className="form_item_area">
              <Form.Item
                label="第一执业医院简介"
                name="hospitalIntroduction"
              >
                <Input.TextArea
                  className="item"
                  autoSize={{ minRows: 2, maxRows: 2 }}
                  style={{ width: '395' }}
                />
              </Form.Item>
            </div>
            <div className="common__btn">
              <Form.Item>
                <Button onClick={cancelSave}>退出</Button>
                <Button type="primary" htmlType="submit">
                  保存
                </Button>
              </Form.Item>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default FarDoctorEdit;
