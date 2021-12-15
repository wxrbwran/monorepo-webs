import React, { FC, useState, useLayoutEffect } from 'react';
import DragModal from 'xzl-web-shared/dist/src/components/DragModal';
import StopService from '@/components/StopService';
import { Form, Radio, Input, message } from 'antd';
import { useSelector, useDispatch } from 'umi';
import { labelCol, departmentType } from 'xzl-web-shared/dist/src/utils/consts';

const FormItem = Form.Item;
const RadioGroup = Radio.Group;

interface IProps {
  mode?: string;
  info?: Department;
}

const AddEditDepartment: FC<IProps> = (props) => {
  const { children, mode, info } = props;
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [show, setShow] = useState<boolean>(false);
  // const orgBase = useSelector((state: IState) => state.org.currentOrg.orgBase);
  const infoByList = useSelector((state: IState) => state.org.infoByList);

  const text = mode === 'edit' ? '编辑科室' : '添加科室';
  const { nsId } = infoByList;
  const initialValues: Store = {};
  useLayoutEffect(() => {
    if (mode === 'edit' && show) {
      initialValues.name = info?.name;
      const labelType = departmentType.filter((type) => {
        const typeKey = type.key.toLowerCase();
        return info.labels.includes(typeKey);
      })[0]?.key;
      console.log(labelType);
      initialValues.labelType = labelType;
      form.setFieldsValue({
        ...initialValues,
      });
    }
  }, [show]);
  const handleSubmit = async () => {
    form
      .validateFields()
      .then(async (values) => {
        const params = { ...values };
        if (mode === 'edit') {
          params.id = (info as Department).id;
        } else if (mode === 'add') {
          params.nsId = nsId;
        }
        console.log(params);
        await window.$api.org.addOrEditDepartment(params);
        message.success(`${text}成功`);
        dispatch({
          type: 'org/getOrgMenu',
          payload: {
            nsId: infoByList.nsId,
            sid: infoByList.sid,
          },
        });
        setShow(false);
      })
      .catch((err) => console.log(err));
  };
  const handlePatchHospital = (e) => {
    e.stopPropagation();
    handleSubmit();
  };
  let modalProps: Store = {
    okText: '添加',
    cancelText: '退出',
    onOk: form.submit,
    onCancel: () => setShow(!show),
  };
  if (mode === 'edit') {
    modalProps = {
      onCancel: () => setShow(!show),
      okText: (
        <StopService>
          <span>停止服务</span>
        </StopService>
      ),
      okButtonProps: { danger: true },
      cancelText: <span onClick={handlePatchHospital}>完成</span>,
    };
  }
  /* eslint-disable react/jsx-props-no-spreading */
  return (
    <>
      <div style={{ display: 'inline' }} onClick={() => setShow(!show)}>
        {children}
      </div>
      <DragModal
        {...modalProps}
        width={520}
        visible={show}
        maskClosable
        centered
        title={text}
        destroyOnClose
      >
        <Form
          colon={false}
          onFinish={handleSubmit}
          form={form}
          labelCol={labelCol}
          initialValues={initialValues}
          preserve={false}
        >
          <div>
            <FormItem label="科室名称" name="name">
              <Input placeholder="请填写科室名称" type="text" maxLength={20} />
            </FormItem>
            <FormItem label="科室类型" name="labelType">
              <RadioGroup>
                {departmentType.map((type) => (
                  <Radio key={type.key} value={type.key}>
                    {type.text}
                  </Radio>
                ))}
              </RadioGroup>
            </FormItem>
          </div>
        </Form>
      </DragModal>
    </>
  );
};

AddEditDepartment.defaultProps = { mode: 'add', info: {} };

export default AddEditDepartment;
