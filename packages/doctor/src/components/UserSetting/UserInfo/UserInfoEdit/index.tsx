import React, { useState } from 'react';
import {
  Form, Button, Input, Select, Radio, DatePicker, message,
} from 'antd';
import { useSelector, useDispatch } from 'umi';
import moment from 'moment';
import { IState } from 'typings/model';
import UploadAvatar from '@/components/UploadAvatar';
import { titleList, banksName } from '@/utils/tools';
import config from '@/config';
import EditTextArea from '../EditTextArea';
import CertificateEdit from '../CertificateEdit';
import formatCert from '../formatCert';
import Hospitial from '../Hospitial';
import Department from '../Department';
import { PlusSquareOutlined, DeleteOutlined } from '@ant-design/icons';
import styles from './index.scss';

interface Iporps {
  toggleEdit: () => void;
}

const { Option } = Select;
const RadioGroup = Radio.Group;
function UserInfoEdit({ toggleEdit }: Iporps) {
  const { userInfo } = useSelector((state:IState) => state.user);
  const [avatar, setAvatar] = useState<string>(userInfo.avatarUrl || config.defaultAvatar);
  const [form] = Form.useForm();
  const { getFieldValue, setFieldsValue } = form;
  const dispatch = useDispatch();

  const initForm = {
    doctorGroup: '心之力医院',
    sex: null,
    level: 0,
    mentor: '',
    ...userInfo,
    certificates: formatCert(userInfo.certificates as ICert),
  };
  const formatCertificates = (certificates: any) => {
    const certObj: CommonData = {};
    if (certificates) {
      Object.keys(certificates).forEach((key) => {
        certificates[key].forEach((imgUrl: string, index: number) => {
          certObj[`${key}${index}`] = imgUrl;
        });
      });
      return certObj;
    }
    return null;
  };
  const onFinish = (values: any) => {
    toggleEdit();
    console.log('valuessss', values);
    const params = {
      ...values,
      certificates: formatCertificates(values?.certificates),
      avatarUrl: avatar,
    };
    // patchUserInfo
    window.$api.user.patchUserInfo(params).then(() => {
      message.success('保存成功');
      dispatch({
        type: 'user/getUserWclDetail',
        payload: { wcIds: [window.$storage.getItem('wcId')] },
      });
    }).catch((err: any) => {
      console.log('保存个人资料失败', err);
    });
  };
  const uploadSuccess = ({ imageURL }: { imageURL: string }) => {
    setAvatar(imageURL);
  };
  const changeQcDate = (data: any, dataString: string) => {
    console.log(data);
    setFieldsValue({
      qcIssuingDate: (new Date(dataString)).getTime(),
    });
  };
  const changePcDate = (data: any, dataString: string) => {
    console.log(data, dataString);
    setFieldsValue({
      pcIssuingDate: (new Date(dataString)).getTime(),
    });
  };
  const formantInitDate = (date: number | undefined) => {
    const dateFormat = 'YYYY/MM/DD';
    if (date) {
      const momentDate = moment(date).format('YYYY/MM/DD');
      return moment(momentDate, dateFormat);
    }
    return undefined;
  };
  const handleMentor = (e: { target: { value: string } }) => {
    if (getFieldValue('mentor') === e.target.value) {
      setFieldsValue({ mentor: '' });
    }
  };
  return (
    <div className={styles.far_doctor}>
      <Form
        // {...layout}
        name="userInfo"
        initialValues={initForm}
        onFinish={onFinish}
        form={form}
      >
        <div className={styles.info_wrap}>
          <div className={styles.left}>
            <UploadAvatar uploadSuccess={uploadSuccess}>
              <img className="w-70 h-70 rounded-md" src={avatar} alt="头像" />
              <Button className={styles.upload_avatar}>上传头像</Button>
            </UploadAvatar>
          </div>
          <div className={styles.right}>
            <div className={styles.form_list}>
              <Form.Item
                label="姓名"
                name="name"
                rules={[{ required: true, message: '请输入姓名!' }]}
                className={styles.left_input}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="性别"
                name="sex"
                className={styles.right_input}
              >
                <RadioGroup>
                  <Radio value={1}>男</Radio>
                  <Radio value={0}>女</Radio>
                </RadioGroup>
              </Form.Item>
              <Form.Item
                label="手机号"
                name="tel"
                rules={[{ required: true, message: '请输入手机号!' }]}
                className={styles.left_input}
              >
                <Input disabled />
              </Form.Item>
              <Form.Item
                label="职称"
                name="title"
                className={styles.right_input}
              >
                <Select
                  placeholder="请选择职称"
                  className="item"
                  style={{ width: 260 }}
                >
                  {
                    titleList.map((item: string) => (
                      <Option value={item} key={item}>{item}</Option>
                    ))
                  }
                </Select>
              </Form.Item>
              <Form.Item
                label="导师"
                name="mentor"
                className={styles.left_input}
              >
                <RadioGroup>
                  <Radio onClick={handleMentor} value="博导">博导</Radio>
                  <Radio onClick={handleMentor} value="硕导">硕导</Radio>
                </RadioGroup>
              </Form.Item>
              <div className="flex">
                <Hospitial
                  setFieldsValue={setFieldsValue}
                  nameKey="name"
                  idKey="standardId"
                  request={window.$api.base.fetchHospitals}
                  disabled={!!userInfo.firstProfessionCompany}
                />
                <Department
                  setFieldsValue={setFieldsValue}
                  nameKey="firstPracticeDepartment"
                  idKey="firstPracticeDepartmentId"
                  disabled={!!userInfo.firstPracticeDepartment}
                />
                <PlusSquareOutlined />
                <DeleteOutlined />
              </div>
              <div className={styles.line_input}>
                <Form.Item
                  label="所在互联网医院"
                  name="doctorGroup"
                >
                  <Input disabled />
                </Form.Item>
              </div>
              <div className={styles.line_input}>
                <Form.Item
                    label="所属医生集团"
                    name="belongToGroup"
                  >
                    <Input />
                  </Form.Item>
              </div>
              <Form.Item
                label="银行卡号"
                name="bankCardNum"
                className={styles.left_input}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="持卡银行:"
                name="bankName"
                className={styles.right_input}
              >
                <Select
                  placeholder="请选择银行"
                  className="item"
                  style={{ width: '100%', minWidth: 260 }}
                // onChange={value => this.handleBaseChange('bank', value)}
                >
                  {banksName.map((bank) => (
                    <Option key={bank} value={bank}>{bank}</Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item
                label="资格证书编码"
                name="qcCode"
                className={styles.left_input}
              >
                <Input />
              </Form.Item>
              <div className={styles.form_item}>
                <Form.Item
                  label="发证日期"
                  name="qcIssuingDate"
                  className={styles.right_input}
                >
                  <Input type="hidden" />
                </Form.Item>
                <DatePicker
                  onChange={changeQcDate}
                  defaultValue={formantInitDate(initForm?.qcIssuingDate)}
                />
              </div>
              <Form.Item
                label="执业证书编码"
                name="pcCode"
                className={styles.left_input}
              >
                <Input />
              </Form.Item>
              <div className={styles.form_item}>
                <Form.Item
                  label="发证日期"
                  name="pcIssuingDate"
                  className={styles.right_input}
                >
                  <Input type="hidden" />
                </Form.Item>
                <DatePicker
                  onChange={changePcDate}
                  defaultValue={formantInitDate(initForm?.pcIssuingDate)}
                />
              </div>
            </div>
            <EditTextArea />
          </div>
        </div>
        <CertificateEdit
          setFieldsValue={setFieldsValue}
          certificates={initForm?.certificates}
          getFieldValue={getFieldValue}
        />
        <div className="common__btn">
          <Form.Item>
            <Button onClick={toggleEdit}>退出</Button>
            <Button type="primary" htmlType="submit">
              确定
            </Button>
          </Form.Item>
        </div>
      </Form>
    </div>
  );
}

export default UserInfoEdit;
