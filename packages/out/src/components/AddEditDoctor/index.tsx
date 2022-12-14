import type { FC } from 'react';
import React, { useState, useLayoutEffect } from 'react';
import DragModal from 'xzl-web-shared/dist/components/DragModal';
import UploadImageWithCrop from '@/components/UploadImageWithCrop';
import { Form, Input, Button, Avatar, Radio, Select, DatePicker, message } from 'antd';
import { useSelector /* useDispatch */ } from 'umi';
import moment from 'moment';
import { titleList, doctorRelated, defaultAvatar } from 'xzl-web-shared/dist/utils/consts';
import { /* formatCertificates2Server, */ formatCert2Local } from '@/utils/cert';
import CertificateEdit from '../CertificateEdit';
import { debounce } from 'lodash';

import styles from './index.scss';

const FormItem = Form.Item;
const { Option } = Select;
interface IProps {
  mode: string;
  // info?: Store;
}
const AddEditDoctor: FC<IProps> = (props) => {
  const { children, mode } = props;
  // const dispatch = useDispatch();
  // const curDepartmentId = useSelector((state: IState) => state.org_menu.department.id);
  const info = useSelector((state: IState) => state.department_tab.info);

  const [form] = Form.useForm();
  const [formInitValue, setFormInitValue] = useState({});
  const [avatar, setAvatar] = useState<string>(defaultAvatar);
  const [tel, setTel] = useState<string>('');
  // const [sid, setSid] = useState<string>('');
  const [certificates, setCertificates] = useState({});
  const [name] = useState<string>('');
  const [show, setShow] = useState<boolean>(false);
  // add => new, exist; edit;
  const [status, setStatsus] = useState<string>(mode);
  const handleSubmitAddDoctor = debounce(() => {
    form
      .validateFields()
      .then(async (_values) => {
        // const params = { ...values };
        // params.qcIssuingDate = new Date(params.qcIssuingDate).getTime();
        // params.pcIssuingDate = new Date(params.pcIssuingDate).getTime();
        // params.certificates = formatCertificates2Server(params?.certificates);
        // const { account, ...details } = params;
        // let data: Store = {
        //   account,
        //   details,
        //   nsId: curDepartmentId,
        //   roleType: Role.DOCTOR.id,
        // };
        // let request = window.$api.org.addDoctor;
        // if (status === 'edit') {
        //   data = { ...details, id: info?.sid };
        //   request = window.$api.org.editDoctor;
        // }
        // if (status === 'exist') {
        //   data.sid = sid;
        // }
        // const res = await request(data);
        // console.log(res);
        // if (status === 'edit') {
        //   dispatch({
        //     type: 'department_tab/changeUserInfo',
        //     payload: {
        //       ...info,
        //       ...details,
        //     },
        //   });
        // }
        message.success('????????????');
        setShow(false);
      })
      .catch((err) => console.log(err));
  }, 300);
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
    // const res = await window.$api.org.getDoctorDetail({
    //   account: form.getFieldValue('account'),
    // });
    setStatsus(/* res ? 'exist' : */ 'new');
    // if (res?.details) {
    //   const data = {
    //     ...res.details,
    //   };
    //   const params = handleUserInfo(data);
    //   setName(res.details.name);
    //   setSid(res.sid);
    //   form.setFieldsValue(params);
    //   // console.log(form.getFieldsValue());
    // }
  };

  useLayoutEffect(() => {
    let params: Store = {};
    if (show && info && status === 'edit') {
      params = handleUserInfo(info);
      setCertificates(params.certificates);
      setFormInitValue(params);
      setAvatar(params.avatarUrl || defaultAvatar);
      // form.setFieldsValue(params);
    }
    if (!show) {
      // form.resetFields();
      // form.setFieldsValue(params);
      if (['new', 'exist'].includes(status)) {
        setStatsus('add');
        form.resetFields();
      }
    }
  }, [show]);

  let modalProps: Store = {
    width: 520,
    wrapClassName: 'hide_modal_cancel',
    okText: '?????????',
    onOk: getDoctorByAccount,
    onCancel: () => setShow(!show),
  };
  if (status !== 'add') {
    modalProps = {
      width: 1100,
      onCancel: () => setShow(!show),
      onOk: handleSubmitAddDoctor,
      okText: <span>????????????</span>,
      cancelText: (
        <span
          onClick={(e) => {
            e.stopPropagation();
            setStatsus('add');
          }}
        >
          ?????????
        </span>
      ),
    };
  }
  if (status === 'edit') {
    modalProps = {
      ...modalProps,
      cancelText: '??????',
      okText: '??????',
      title: '????????????',
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
        title="????????????"
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
          {status !== 'edit' && (
            <div
              style={{
                display: status === 'add' ? 'block' : 'none',
                width: '100%',
              }}
            >
              <FormItem
                noStyle
                name="account"
                rules={[
                  { required: true, message: '?????????????????????!' },
                  {
                    pattern: /^1[3456789]\d{9}$/,
                    message: '??????????????????????????????!',
                  },
                ]}
              >
                <Input onChange={handleChangeTel} size="large" placeholder="????????????????????????" />
              </FormItem>
            </div>
          )}
          <div
            className={styles.base}
            style={{
              display: ['new', 'edit'].includes(status) ? 'flex' : 'none',
            }}
          >
            <div className={styles.left}>
              <Avatar shape="square" size={88} src={avatar} />
              <UploadImageWithCrop preview type="avatar" success={handleUploadAvatar}>
                <Button type="primary" ghost>
                  ????????????
                </Button>
              </UploadImageWithCrop>
              <FormItem name="avatarUrl">
                <Input type="hidden" />
              </FormItem>
            </div>
            <div className={styles.right}>
              <FormItem name="name" label="??????" rules={[{ required: true }]}>
                <Input style={{ width: 200 }} />
              </FormItem>
              <FormItem name="tel" label="?????????" rules={[{ required: true }]}>
                <Input style={{ width: 200 }} disabled />
              </FormItem>
              <Form.Item name="sex" label="??????" rules={[{ required: true }]}>
                <Radio.Group>
                  <Radio value="1">???</Radio>
                  <Radio value="0">???</Radio>
                </Radio.Group>
              </Form.Item>
              <Form.Item name="title" label="??????">
                <Select placeholder="???????????????" className="item" style={{ width: '100%' }}>
                  {titleList.map((item: string) => (
                    <Option value={item} key={item}>
                      {item}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item name="level">
                <Radio.Group>
                  <Radio value="1">??????</Radio>
                  <Radio value="2">??????</Radio>
                  <Radio value="3">??????</Radio>
                </Radio.Group>
              </Form.Item>
              <FormItem label="??????????????????" name="belongToGroup">
                <Input style={{ width: 200 }} />
              </FormItem>
              <Form.Item name="mentor" label="??????">
                <Radio.Group>
                  <Radio value="??????">??????</Radio>
                  <Radio value="??????">??????</Radio>
                </Radio.Group>
              </Form.Item>
              <FormItem label="?????????????????????????????????" name="doctorGroup">
                <Input style={{ width: 300 }} />
              </FormItem>
              <FormItem label="??????????????????" name="qcCode">
                <Input style={{ width: 300 }} />
              </FormItem>
              <FormItem label="????????????" name="qcIssuingDate">
                <DatePicker />
              </FormItem>
              <FormItem label="??????????????????" name="pcCode">
                <Input style={{ width: 300 }} />
              </FormItem>
              <FormItem label="????????????" name="pcIssuingDate">
                <DatePicker />
              </FormItem>
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
          <div className={styles.exist} style={{ display: status === 'exist' ? 'flex' : 'none' }}>
            <p>????????????????????????????????????????????????????????????</p>
            <ul>
              <li>
                <Avatar shape="square" size={80} src={avatar} alt="avatar" />
              </li>
              <li>{`?????????${name}`}</li>
              <li>{`????????????${tel}`}</li>
            </ul>
          </div>
        </Form>
      </DragModal>
    </>
  );
};
AddEditDoctor.defaultProps = { mode: 'new' };
export default AddEditDoctor;
