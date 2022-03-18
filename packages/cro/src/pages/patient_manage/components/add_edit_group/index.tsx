import React, { FC, useState } from 'react';
import DragModal from 'xzl-web-shared/dist/components/DragModal';
import { Form, Input, Button, message } from 'antd';
import * as api from '@/services/api';
import styles from './index.scss';

interface IProps {
  type: string;
  projectNsId: string;
  onSuccess: () => void;
  initData?: IFormVal;
  className?: string;
}
interface IFormVal {
  groupName: string;
  addGroupNum: number;
  groupId: string;
  note: {
    note1: string | number;
  }
}
interface IApiParams {
  projectNsId?: string;
  groupName: string;
  groupId?: string;
  note: {
    note1: string | number;
  }
}
const AddEditGroup: FC<IProps> = (props) => {
  const { children, type, projectNsId, onSuccess, initData, className } = props;
  console.log('initData1111', initData);
  const [showModal, setshowModal] = useState(false);
  // const [loading, setloading] = useState(false);
  const loading = false;

  const actionName = type === 'add' ? '添加' : '编辑';
  const handleShowModal = () => {
    setshowModal(true);
  };
  const handleCreatePro = (values: IFormVal) => {
    const { groupName, note1 } = values;
    const params: IApiParams = { groupName, note: { note1: Number(note1) } };
    if (type === 'add') {
      params.projectNsId = projectNsId;
      api.patientManage.postAddGroup(params).then((_res: any) => {
        message.success('添加成功');
        onSuccess();
        window.$log.handleOperationLog({
          type: 0,
          copyWriting: `创建试验分组 - ${groupName}`,
        });
      });
    } else if (type === 'edit' && initData) {
      params.groupId = initData.groupId;
      api.patientManage.modifyGroup(params).then((_res: any) => {
        message.success('修改成功');
        onSuccess();
        window.$log.handleOperationLog({
          type: 1,
          copyWriting: '编辑试验分组',
          businessType: window.$log.businessType.UPDATE_TEST_GROUPING.code,
          oldParams: {
            content: {
              groupName: initData.groupName,
              note: initData.note,
            },
          },
          newParams: {
            content: params,
          },
        });
      });
    }
    setshowModal(false);
  };

  return (
    <div className={className}>
      <div onClick={handleShowModal}>{children}</div>
      <DragModal
        visible={showModal}
        title={`${actionName}分组`}
        width={700}
        wrapClassName="ant-modal-wrap-center"
        onCancel={() => setshowModal(false)}
        maskClosable
        footer={null}
      >
        <div className={styles.add_wrap}>
          <Form
            preserve={false}
            name="basic"
            initialValues={{ ...initData, note1: initData?.note?.note1 }}
            onFinish={handleCreatePro}
          >
            <Form.Item
              label="分组名称"
              name="groupName"
              rules={[{ required: true, message: '请输入分组名!' }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="目标人数"
              name="note1"
              rules={[{ required: true, message: '请输入目标人数!' }, {
                validator(_rule, value, callback) {

                  if (!/^\d+$/.test(value)) {
                    callback('请输入正整数');
                  } else {
                    callback();
                  }
                },
              }]}
            >
              <Input type={'text'} />
            </Form.Item>
            <Form.Item style={{ textAlign: 'center' }}>
              <div className={styles.btn}>
                <Button onClick={() => setshowModal(false)}> 取消 </Button>
                <Button loading={loading} type="primary" htmlType="submit">
                  {' '}
                  确定{' '}
                </Button>
              </div>
            </Form.Item>
          </Form>
        </div>
      </DragModal >
    </div >
  );
};

export default AddEditGroup;
