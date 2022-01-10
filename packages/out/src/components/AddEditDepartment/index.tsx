import type { FC } from 'react';
import React, { useState, useLayoutEffect } from 'react';
import DragModal from 'xzl-web-shared/dist/components/DragModal';
// import StopService from '@/components/StopService';
import { Form, Input, message, Radio } from 'antd';
import { useDispatch } from 'umi';
import { labelCol, departmentType } from 'xzl-web-shared/dist/utils/consts';
import { debounce } from 'lodash';

const FormItem = Form.Item;
const RadioGroup = Radio.Group;

interface IProps {
  mode?: string;
  info?: Department;
  refresh: () => void;
}

const AddEditDepartment: FC<IProps> = (props) => {
  const { children, mode, info, refresh } = props;

  const [form] = Form.useForm();
  const [show, setShow] = useState<boolean>(false);
  // const orgBase = useSelector((state: IState) => state.org.currentOrg.orgBase);
  const dispatch = useDispatch();
  const text = mode === 'edit' ? '编辑科室' : '添加科室';
  const initialValues: Store = {};
  useLayoutEffect(() => {
    if (mode === 'edit' && show) {
      initialValues.name = info?.name;
      const labelType = departmentType.filter((type) => {
        const typeKey = type.key.toLowerCase();
        return info.labels.includes(typeKey);
      })?.[0]?.key;
      console.log(labelType);
      initialValues.labelType = labelType;
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
          params.nsId = window.$storage.getItem('nsId');
        }
        console.log(params);
        await window.$api.org.addOrEditDepartment(params);
        message.success(`${text}成功`);
        dispatch({
          type: 'org/getOrgMenu',
          payload: {
            nsId: window.$storage.getItem('nsId'),
            sid: window.$storage.getItem('sid'),
          },
        });
        setShow(false);
        refresh();
      })
      .catch((err) => console.log(err));
  };
  // const handlePatchHospital = (e) => {
  //   e.stopPropagation();
  //   handleSubmit();
  // };
  let modalProps: Store = {
    okText: mode === 'edit' ? '保存' : '添加',
    cancelText: '退出',
    onOk: form.submit,
    onCancel: () => setShow(!show),
  };
  if (mode === 'edit') {
    // modalProps = {
    //   onCancel: () => setShow(!show),
    //   okText: (
    //     <StopService>
    //       <span>停止服务</span>
    //     </StopService>
    //   ),
    //   okButtonProps: { danger: true },
    //   cancelText: <span onClick={handlePatchHospital}>完成</span>,
    // };
  }
  /* eslint-disable react/jsx-props-no-spreading */
  return (
    <>
      <div style={{ display: 'inline' }} onClick={() => setShow(!show)}>
        {children}
      </div>
      {
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
          onFinish={debounce(handleSubmit, 300)}
          form={form}
          labelCol={labelCol}
          initialValues={initialValues}
          preserve={true}
        >
          <div>
            <FormItem label="科室名称" name="name" rules={[{ required: true, message: '请填写科室名称!' }]}>
              <Input placeholder="请填写科室名称" type="text" maxLength={20} />
            </FormItem>
            <FormItem label="科室类型" name="labelType" rules={[{ required: true, message: '请选择科室类型!' }]}>
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
      }

    </>
  );
};

AddEditDepartment.defaultProps = { mode: 'add', info: {} };

export default AddEditDepartment;
