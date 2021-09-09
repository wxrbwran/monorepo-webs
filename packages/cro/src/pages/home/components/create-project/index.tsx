import React, { useState } from 'react';
import { Button, Form, Input, message, Select, Radio } from 'antd';
import DragModal from '@/components/DragModal';
import UploadImageWithCrop from '@/components/UploadImageWithCrop';
import * as api from '@/services/api';
import { useDispatch } from 'react-redux';
import { projectDefaultImg } from '@/utils/consts';
import { history } from 'umi';

import './index.scss';

const { Option } = Select;
interface IUploadParams {
  imageURL: string;
}
interface IProps {
  onCloseModal: () => void;
}
interface IfromVal {
  duration: string;
  intro: string;
  name: string;
  type: string;
}
function CreateProject({ onCloseModal }: IProps) {
  const defaultImg = projectDefaultImg[Math.floor(Math.random()*(0 - 5) + 5)];
  const dispatch = useDispatch()
  const [showUpload, setShowUPload] = useState(false);
  const [avatarUrl, setAvatar] = useState(defaultImg);
  const [loading, setLoading] = useState(false);
  const uploadSuccess = (params: IUploadParams) => {
    console.log('上传成功', params);
    message.success('上传成功');
    setShowUPload(false)
    setAvatar(params.imageURL)
  }
  const handleCreatePro = (fromVal: IfromVal) => {
    setLoading(true);
    const { name, duration, intro, type } = fromVal;
    const params = {
      name,
      type,
      detail: {
        avatarUrl,
        duration,
        intro
      }
    }
    api.project.postCroProject(params).then(res => {
      setLoading(false);
      message.success('创建成功');
      // 更新项目列表
      dispatch({
        type: 'project/fetchProjectList',
        payload: null,
      });
      onCloseModal(); // 关闭弹框
      window.$storage.setItem('projectSid', res.projectSid);
      history.push(`/proj_detail?projectSid=${res.projectSid}&projectName=${fromVal.name}`)
    })
  };

  const testType = [
    {
      key: 1,
      value: '单中心临床试验',
    }, {
      key: 2,
      value: '多中心临床试验',
    }
  ];
  return (
    <div className="create-project">
      <div className="left">
        <div className="project-logo">
          <img src={avatarUrl} alt="" />
        </div>
        <Button onClick={() => setShowUPload(true)}>上传图片</Button>
      </div>
      <div className="right create-project-form">
        <Form
          name="basic"
          initialValues={{ remember: true }}
          onFinish={handleCreatePro}
        >
          <Form.Item
            label="项目名称"
            name="name"
            rules={[{ required: true, message: '请输入项目名称!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="项目周期"
            name="duration"
            rules={[{ required: true, message: '请输入项目周期!' }]}
          >
            <Input suffix="天"/>
          </Form.Item>
          <Form.Item
            label="项目类型"
            name="type"
            rules={[{ required: true, message: '请选择项目类型!' }]}
            style={{ textAlign: 'left' }}
          >
           <Radio.Group>
            {testType.map(item => (
              <Radio
                value={item.key}
                key={item.key}
              >
                {item.value}
              </Radio>
            ))}
          </Radio.Group>
          </Form.Item>
          <Form.Item
            name='intro'
            label="项目简介"
          >
            <Input.TextArea />
          </Form.Item>
          <Form.Item style={{ textAlign: 'center' }}>
            <Button loading={loading} type="primary" htmlType="submit"> 完成并创建 </Button>
          </Form.Item>
        </Form>
      </div>
      {showUpload && (
        <DragModal
          title="头像设置"
          footer={null}
          width={770}
          onCancel={() => setShowUPload(false)}
          visible={showUpload}
        >
          <UploadImageWithCrop
            preview
            type="avatar"
            aspectRatio={1 / 1}
            close={() => setShowUPload(false)}
            success={uploadSuccess}
          />
        </DragModal>
      )}
    </div>
  )
}

export default CreateProject;
