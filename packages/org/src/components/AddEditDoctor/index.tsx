import React, { FC, useState, useLayoutEffect } from 'react';
import DragModal from 'xzl-web-shared/src/components/DragModal';
import UploadImageWithCrop from '@/components/UploadImageWithCrop';
import { Form, Input, Button, Avatar, Radio, Select, DatePicker, message } from 'antd';
import { useSelector, useDispatch } from 'umi';
import moment from 'moment';
import { titleList, doctorRelated, defaultAvatar } from 'xzl-web-shared/src/utils/consts';
import { Role } from 'xzl-web-shared/src/utils/role';
import { formatCertificates2Server, formatCert2Local } from '@/utils/cert';
import { banksName } from '@/utils/tools';
import CertificateEdit from '../CertificateEdit';

import styles from './index.scss';

const FormItem = Form.Item;
const { Option } = Select;
interface IProps {
  mode: string;
  // info?: Store;
}
const AddEditDoctor: FC<IProps> = (props) => {
  const { children, mode } = props;
  const dispatch = useDispatch();
  const curDepartmentId = useSelector((state: IState) => state.org_menu.department.id);
  const info = useSelector((state: IState) => state.department_tab.info);

  const [form] = Form.useForm();
  const [formInitValue, setFormInitValue] = useState();
  const [avatar, setAvatar] = useState<string>(defaultAvatar);
  const [tel, setTel] = useState<string>('');
  const [sid, setSid] = useState<string>('');
  const [certificates, setCertificates] = useState({});
  const [name, setName] = useState<string>('');
  const [show, setShow] = useState<boolean>(false);
  // ADD => NEW, EXIST; EDIT;
  const [status, setStatsus] = useState<string>(mode);
  const handleSubmitAddDoctor = () => {
    form
      .validateFields()
      .then(async (values) => {
        const params = { ...values };
        params.qcIssuingDate = new Date(params.qcIssuingDate).getTime();
        params.pcIssuingDate = new Date(params.pcIssuingDate).getTime();
        params.certificates = formatCertificates2Server(params?.certificates);
        const { account, ...details } = params;
        let data: Store = {
          account,
          details,
          nsId: curDepartmentId,
          roleType: Role.DOCTOR.id,
        };
        let request = window.$api.org.addDoctor;
        if (status === 'EDIT') {
          data = { ...details, id: info?.sid };
          request = window.$api.org.editDoctor;
        }
        if (status === 'EXIST') {
          data.sid = sid;
        }
        const res = await request(data);
        console.log(res);
        if (status === 'EDIT') {
          dispatch({
            type: 'department_tab/changeUserInfo',
            payload: {
              ...info,
              ...details,
            },
          });
        }
        message.success('操作成功');
        setShow(false);
      })
      .catch((err) => console.log(err));
  };
  const handleChangeTel = (e) => {
    const telString = e.target.value;
    setTel(telString);
    form.setFieldsValue({
      tel: telString,
    });
  };
  const handleUploadAvatar = (params: any) => {
    const imgUrl = params.imageURL;
    setAvatar(imgUrl);
    form.setFieldsValue({
      avatarUrl: imgUrl,
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
  const handleUserInfo = (data: Store): Store => {
    const params = { ...data };
    params.sex = `${params.sex ?? 0}`;
    params.qcIssuingDate = formantInitDate(params.qcIssuingDate);
    params.pcIssuingDate = formantInitDate(params.pcIssuingDate);
    params.certificates = formatCert2Local(params.certificates);
    return params;
  };
  const getDoctorByAccount = async () => {
    if (/^1[3456789]\d{9}$/.test(tel)) {
      const res = await window.$api.org.getDoctorDetail({
        account: form.getFieldValue('account'),
      });
      setStatsus(res ? 'EXIST' : 'NEW');
      if (res?.details) {
        const data = {
          ...res.details,
        };
        const params = handleUserInfo(data);
        setName(res.details.name);
        setAvatar(res.details.avatarUrl);
        setSid(res.sid);
        form.setFieldsValue(params);
      }
    } else {
      message.warn('请输入正确手机号');
    }
  };

  useLayoutEffect(() => {
    let params: Store = {};
    if (show && info && status === 'EDIT') {
      params = handleUserInfo(info);
      setCertificates(params.certificates);
      setFormInitValue({ ...params, doctorGroup: '心之力医院' });
      setAvatar(params.avatarUrl || defaultAvatar);
      // form.setFieldsValue(params);
    }
    if (!show) {
      // form.resetFields();
      // form.setFieldsValue(params);
      if (['NEW', 'EXIST'].includes(status)) {
        setStatsus('ADD');
        form.resetFields();
      }
    }
  }, [show]);

  let modalProps: Store = {
    width: 520,
    wrapClassName: 'hide_modal_cancel',
    okText: '下一步',
    onOk: getDoctorByAccount,
    onCancel: () => setShow(!show),
  };
  if (status !== 'ADD') {
    modalProps = {
      width: 1100,
      onCancel: () => setShow(!show),
      onOk: handleSubmitAddDoctor,
      okText: <span>添加医生</span>,
      cancelText: (
        <span
          onClick={(e) => {
            e.stopPropagation();
            setStatsus('ADD');
          }}
        >
          上一步
        </span>
      ),
    };
  }
  if (status === 'EDIT') {
    modalProps = {
      ...modalProps,
      cancelText: '退出',
      okText: '确定',
      title: '修改资料',
    };
  }
  /* eslint-disable react/jsx-props-no-spreading */
  return (
    <>
      <div
        style={{ display: 'inline' }}
        onClick={(e) => {
          e.stopPropagation();
          setShow(!show);
        }}
      >
        {children}
      </div>
      <DragModal
        width={1100}
        visible={show}
        centered
        title="添加医生"
        {...modalProps}
        destroyOnClose
      >
        <Form
          colon={false}
          form={form}
          onFinish={handleSubmitAddDoctor}
          layout="inline"
          initialValues={formInitValue}
        >
          <div className={styles.form_list}>
            {status !== 'EDIT' && (
              <div
                style={{
                  display: status === 'ADD' ? 'block' : 'none',
                  width: '100%',
                }}
              >
                <FormItem
                  noStyle
                  name="account"
                  rules={[
                    { required: true, message: '请输入手机号码!' },
                    {
                      pattern: /^1[3456789]\d{9}$/,
                      message: '请填写正确的手机号码!',
                    },
                  ]}
                >
                  <Input onChange={handleChangeTel} size="large" placeholder="请输入医生手机号" />
                </FormItem>
              </div>
            )}
            <div
              className={styles.base}
              style={{
                display: ['NEW', 'EDIT'].includes(status) ? 'flex' : 'none',
              }}
            >
              <div className={styles.left}>
                <Avatar shape="square" size={88} src={avatar} />
                <UploadImageWithCrop preview type="avatar" success={handleUploadAvatar}>
                  <Button type="primary" ghost>
                    上传头像
                  </Button>
                </UploadImageWithCrop>
                <FormItem name="avatarUrl">
                  <Input type="hidden" />
                </FormItem>
              </div>
              <div className={styles.right}>
                <FormItem name="name" label="姓名" rules={[{ required: true }]}>
                  <Input style={{ width: 200 }} />
                </FormItem>
                <FormItem name="tel" label="手机号" rules={[{ required: true }]}>
                  <Input style={{ width: 200 }} disabled />
                </FormItem>
                <Form.Item name="sex" label="性别" rules={[{ required: true }]}>
                  <Radio.Group>
                    <Radio value="1">男</Radio>
                    <Radio value="0">女</Radio>
                  </Radio.Group>
                </Form.Item>
                <Form.Item label="银行卡号" name="bankCardNum">
                  <Input />
                </Form.Item>
                <Form.Item label="持卡银行" name="bankName">
                  <Select
                    placeholder="请选择银行"
                    className="item"
                    style={{ width: '100%', minWidth: 140 }}
                    // onChange={value => this.handleBaseChange('bank', value)}
                  >
                    {banksName.map((bank) => (
                      <Option key={bank} value={bank}>
                        {bank}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
                <Form.Item name="title" label="职称">
                  <Select placeholder="请选择职称" className="item" style={{ width: '100%' }}>
                    {titleList.map((item: string) => (
                      <Option value={item} key={item}>
                        {item}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
                <Form.Item label="第一执业医院" name="firstProfessionCompany">
                  <Input disabled />
                </Form.Item>
                <Form.Item label="第一执业医院所在科室" name="firstPracticeDepartment">
                  <Input disabled />
                </Form.Item>
                <Form.Item name="level">
                  <Radio.Group>
                    <Radio value="1">一级</Radio>
                    <Radio value="2">二级</Radio>
                    <Radio value="3">三级</Radio>
                  </Radio.Group>
                </Form.Item>
                <FormItem label="所属医生集团" name="belongToGroup">
                  <Input style={{ width: 200 }} />
                </FormItem>
                <Form.Item name="mentor" label="导师">
                  <Radio.Group>
                    <Radio value="博导">博导</Radio>
                    <Radio value="硕导">硕导</Radio>
                  </Radio.Group>
                </Form.Item>
                <FormItem label="所在互联网医院" name="doctorGroup">
                  <Input disabled />
                </FormItem>
                <div className={styles.form_item}>
                  <FormItem label="资格证书编码" name="qcCode">
                    <Input />
                  </FormItem>
                  <FormItem label="发证日期" name="qcIssuingDate">
                    <DatePicker />
                  </FormItem>
                </div>
                <div className={styles.form_item}>
                  <FormItem label="职业证书编码" name="pcCode">
                    <Input />
                  </FormItem>
                  <FormItem label="发证日期" name="pcIssuingDate">
                    <DatePicker />
                  </FormItem>
                </div>
                {Object.keys(doctorRelated).map((relate) => (
                  <FormItem key={relate} label={doctorRelated[relate]} name={relate}>
                    <Input.TextArea style={{ width: 350 }} />
                  </FormItem>
                ))}
                <CertificateEdit
                  setFieldsValue={form.setFieldsValue}
                  getFieldValue={form.getFieldValue}
                  certificates={certificates}
                />
              </div>
            </div>
            <div className={styles.exist} style={{ display: status === 'EXIST' ? 'flex' : 'none' }}>
              <p>手机号已有医生注册，请确认是否加入该医生</p>
              <ul>
                <li>
                  <Avatar shape="square" size={80} src={avatar} alt="avatar" />
                </li>
                <li>{`姓名：${name}`}</li>
                <li>{`手机号：${tel}`}</li>
              </ul>
            </div>
          </div>
        </Form>
      </DragModal>
    </>
  );
};
AddEditDoctor.defaultProps = { mode: 'NEW' };
export default AddEditDoctor;
