import React, { useState, FC } from 'react';
import { Radio, Input, Form, message } from 'antd';
import DragModal from 'xzl-web-shared/src/components/DragModal';
// import StopService from '@/components/StopService';
import AddressForm from '@/components/AddressForm';
import { labelCol, orgType, orgGrade } from 'xzl-web-shared/src/utils/consts';
import { Role } from '@/utils/role';
import { getCondition } from '@/utils/tools';
import BaseDepartments from './components/BaseDepartments';
import styles from './index.scss';

interface IProps {
  mode?: string;
  info?: {
    nsId: string;
  };
  refresh?: () => void;
}
const RadioGroup = Radio.Group;
const FormItem = Form.Item;

const AddEditHospital: FC<IProps> = (props) => {
  const { children, mode, refresh, info } = props;
  const [showModal, setShowModal] = useState(false);
  const [initForm, setInitForm] = useState<ISubject>({});
  const [adminSid, setAdminSid] = useState<string>();
  const [form] = Form.useForm();
  const { setFieldsValue } = form;

  const handleShowModal = async () => {
    if (mode === 'edit' && info) {
      const params = {
        conditions: [getCondition('cr.namespace', info.nsId)],
      };
      const orgInfo = await window.$api.org.fetchAdminOrgDetails(params);
      let initFormVal: ISubject = {};
      orgInfo.members.forEach((item: ISubject) => {
        if (item.role === Role.ORG.id) {
          initFormVal = { ...initFormVal, ...item };
        } else if (item.role === Role.ORG_ADMIN.id) {
          initFormVal.tel = item.name;
          setAdminSid(item.id);
        }
      });
      setInitForm({ ...initFormVal }); // 地址回显使用
      setFieldsValue(initFormVal);
      setShowModal(true);
    } else {
      setShowModal(true);
    }
  };
  const submitSuccess = () => {
    message.success('保存成功');
    setShowModal(false);
    if (refresh) {
      refresh();
    }
    setInitForm({});
    form.resetFields();
  };
  const handleSubmit = (values: any) => {
    const orgInfo = { ...values };
    delete orgInfo.tel;
    const params = {
      members: [
        {
          ...orgInfo,
          role: Role.ORG.id,
        },
        {
          role: Role.ORG_ADMIN.id,
          name: values.tel,
          tel: values.tel,
        },
      ],
    };
    if (mode === 'edit') {
      params.members[0].id = initForm.id;
      params.members[1].id = adminSid;
      window.$api.org.patchAdminOrganization(params).then(() => {
        submitSuccess();
      });
    } else {
      window.$api.org.postAdminOrganization(params).then(() => {
        submitSuccess();
      });
    }
  };
  const handleRegion = (region: object) => {
    setFieldsValue({
      ...region,
    });
  };
  // const handlePatchHospital = (e) => {
  //   e.stopPropagation();
  // };
  const modalProps: Store = {
    okText: mode === 'edit' ? '保存' : '添加',
    cancelText: '退出',
    onOk: form.submit,
    onCancel: () => setShowModal(!showModal),
  };
  // if (mode === 'edit') {
  //   modalProps = {
  //     onCancel: () => setShowModal(!showModal),
  //     okText: (
  //       <StopService>
  //         <span>停止服务</span>
  //       </StopService>
  //     ),
  //     okButtonProps: { danger: true },
  //     cancelText: <span onClick={handlePatchHospital}>完成</span>,
  //     // okType: 'danger',
  //   };
  // }
  const radioRender = (radioSrc: string[]) => (
    <>
      {radioSrc.map((opt: string) => (
        <Radio value={opt} key={opt}>
          {opt}
        </Radio>
      ))}
    </>
  );
  /* eslint-disable react/jsx-props-no-spreading */
  return (
    <>
      <div style={{ display: 'inline' }} onClick={handleShowModal}>
        {children}
      </div>
      {showModal && (
        <DragModal
          width={720}
          visible={showModal}
          wrapClassName="ant-modal-wrap-center"
          maskClosable
          {...modalProps}
          centered
          title={mode === 'edit' ? '编辑医院' : '添加医院'}
        >
          <Form
            colon={false}
            onFinish={handleSubmit}
            form={form}
            labelCol={labelCol}
            style={{ width: 600, margin: '0 auto' }}
          >
            <div>
              {/* {mode !== 'edit' && (
              <>
                <FormItem label="机构业务" name="category">
                  <RadioGroup>
                    <Radio value="ORDINARY">慢病管理</Radio>
                    <Radio value="CLINICAL">临床实验</Radio>
                  </RadioGroup>
                </FormItem>
                <FormItem label="是否随访" name="suifang">
                  <Checkbox>患者随访</Checkbox>
                </FormItem>
              </>
            )} */}
              <FormItem
                label="管理员账号"
                name="tel"
                rules={[{ required: true, message: '请填写管理员账号!' }]}
              >
                <Input
                  placeholder="请填写管理员账号"
                  type="text"
                  maxLength={20}
                  disabled={mode === 'edit'}
                />
              </FormItem>
              <FormItem
                label="组织机构代码"
                name="firstProfessionCompanyCode"
                rules={[{ required: true, message: '请填写组织机构代码!' }]}
              >
                <Input placeholder="请填写组织机构代码" type="text" maxLength={30} />
              </FormItem>
              <FormItem
                label="机构名称"
                name="name"
                rules={[{ required: true, message: '请填写机构名称!' }]}
              >
                <Input placeholder="请填写机构名称" type="text" maxLength={20} autoFocus />
              </FormItem>
              <div>
                <FormItem label="是否互联网医院" name="isOnlineHos">
                  <RadioGroup>
                    <Radio value={1}> 是 </Radio>
                    <Radio value={0}> 否 </Radio>
                  </RadioGroup>
                </FormItem>
                <FormItem label="医院级别" name="type">
                  <RadioGroup>{radioRender(orgType)}</RadioGroup>
                </FormItem>
                <FormItem label="医院等次" name="grade">
                  <RadioGroup>{radioRender(orgGrade)}</RadioGroup>
                </FormItem>
                {/* <FormItem label="机构类别">
                <Select showSearch style={{ width: 200 }} />
              </FormItem> */}
                <FormItem label="法人" name="legalPerson">
                  <Input placeholder="请填写法人" type="text" maxLength={20} />
                </FormItem>
                <div className={styles.form_item}>
                  <AddressForm getRegion={handleRegion} initData={initForm} />
                </div>
                <FormItem label="详细地址" name="detailAddress">
                  <Input placeholder="请填写详细地址" type="text" />
                </FormItem>
                {mode === 'add' && <BaseDepartments />}
              </div>
            </div>
          </Form>
        </DragModal>
      )}
    </>
  );
};

AddEditHospital.defaultProps = {
  mode: 'add',
  // info: {},
};

export default AddEditHospital;
