import React, { FC, useState } from 'react';
import styles from './index.scss';
import { textData, msg } from '../utils';
import { IAddTopicProps, IQaItem } from '../type';
import { Input, Button } from 'antd';
import { CheckCircleOutlined, DeleteOutlined } from '@ant-design/icons';
// import * as api from '@/services/api';
import uuid from 'react-uuid';
import { cloneDeep } from 'lodash';

const { TextArea } = Input;
const TopicAddProblem: FC<IAddTopicProps & { closeModal: () => void }> = (props) => {
  const { actionType, handleDelQuestion, handleSaveQuestion, closeModal, templateId, editGroupInx, initData } = props;
  const initQa = initData ? cloneDeep(initData as IQaItem) : { ...cloneDeep(textData), uuid: uuid() };
  const [qa, setQa] = useState<IQaItem>(initQa);
  const handleEditCont = (e: any, type: string) => {
    if (type === 'question') {
      qa[type] = e.target.value;
    } else {
      qa[type][0] = e.target.value;
    }
    setQa(cloneDeep(qa));
  };
  const handleSave = () => {
    console.log('------qas', qa);
    if (qa.question === '') {
      msg('请输入问题', 'error');
    } else {
      const paramsQa = {
        ...qa,
        action: actionType === 'add' ? 'ADD' : 'ALTER',
        answer: [],
      };
      if (initData) {
        paramsQa.createdTime = (initData as IQaItem)?.createdTime;
      }
      const params = {
        meta: { id: templateId },
        data: [ paramsQa ],
      };
      window.$api.image.postImageTemplate(params).then(() => {
        msg('保存成功', 'success');
        handleSaveQuestion(qa, actionType, editGroupInx);
        closeModal();
      });
    }
  };
  const handleDelete = () => {
    if (actionType === 'edit' && editGroupInx && initData) {
      const qasData = { ...initData, action: 'DELETE' };
      const params = { meta: { id: templateId }, data: [qasData] };
      window.$api.image.postImageTemplate(params).then(() => {
        msg('删除成功', 'success');
        handleDelQuestion(editGroupInx);
      });
    }
    closeModal();
  };
  return (
    <div className={styles.add_problem}>
      <div className="bg-gray-50 mb-15 p-10">
        <div className="mr-40 pl-5">示例 影像表现</div>
        <div className="p-5 pl-37"> 膀胱充盈良好，膀胱充盈良好 </div>
      </div>
      <div className="input-empty pl0">
        <Input
          placeholder="请输入问题"
          value={qa.question}
          onChange={(e) => handleEditCont(e, 'question')}
        />
      </div>
      <div className="mb-35">
        <TextArea
          placeholder="请输入"
          onChange={(e) => handleEditCont(e, 'answer')}
          value={qa.answer?.[0]}
          className={styles.answer}
        />
      </div>
      <div className={styles.ghost_btn}>
        <Button type="primary" ghost icon={<DeleteOutlined />}  onClick={handleDelete}>
          { actionType === 'add' ? '取消' : '删除' }
        </Button>
        <Button type="primary" ghost icon={<CheckCircleOutlined />} onClick={handleSave}>确认</Button>
      </div>
    </div>
  );
};

export default TopicAddProblem;
