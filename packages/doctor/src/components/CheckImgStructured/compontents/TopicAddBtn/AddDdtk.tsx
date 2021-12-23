import React, { FC, useState, useRef } from 'react';
import styles from './index.scss';
import { ddtkExample, ddtkData, msg } from '../utils';
import { IAddTopicProps, IQaItem } from '../type';
import { Input, Button } from 'antd';
import { CheckCircleOutlined, DeleteOutlined, CloseCircleFilled } from '@ant-design/icons';
import * as api from '@/services/api';
import uuid from 'react-uuid';
import { cloneDeep } from 'lodash';

const TopicAddDdtk: FC<IAddTopicProps & { closeModal: () => void }> = (props) => {
  const { actionType, handleDelQuestion, closeModal, templateId, handleSaveQuestion,
    initData, editGroupInx } = props;
  console.log('====editDdtk', props);
  const curUuid = useRef(initData ? initData[0].uuid : uuid());
  let initQas = [];
  for (let i = 0; i < 4; i++) {
    initQas.push(ddtkData(curUuid.current));
  }
  const [qas, setQas] = useState<IQaItem[]>(initData ? cloneDeep(initData as IQaItem[]) : initQas);
  const handleEditCont = (e: any, type: string, inx: number) => {
    if (type === 'question') {
      qas[inx][type] = e.target.value;
    } else {
      qas[inx][type][0] = e.target.value;
    }
    setQas(cloneDeep(qas));
  };
  const handleAddQa = () => {
    setQas([ ...qas, ddtkData(curUuid.current)]);
  };
  const handleDelQa = (inx: number) => {
    qas.splice(inx, 1);
    setQas([...qas]);
  };
  const handleSave = () => {
    console.log('------qas', qas);
    if (qas[0].question === '') {
      msg('请输入题目', 'error');
    } else if (qas.find(qaItem => qaItem.question === '')) {
      msg('请输入问题', 'error');
    } else {
      const qasData = qas.map((qaItem, inx) => {
        const qa = {
          ...qaItem,
          group: inx === 0 ?  '1-1' : `1-1-${inx - 1}`,
          answer: [],
          ...actionType === 'add' ?
            { action: 'ADD' }
            : { action: 'ALTER', createdTime: initData?.[0]?.createdTime },
        };
        if (initData) {
          qa.createdTime = initData[0].createdTime;
        }
        return qa;
      });
      const params = {
        meta: { id: templateId },
        data: qasData,
      };
      api.image.postImageTemplate(params).then(() => {
        msg('保存成功', 'success');
        handleSaveQuestion(qas, actionType, editGroupInx);
        closeModal();
      });
    }

  };
  const handleDelete = () => {
    if (actionType === 'edit' && editGroupInx !== undefined && initData) {
      const qasData = initData.map((qaItem) => {
        return { ...qaItem, action: 'DELETE' };
      });
      const params = {
        meta: { id: templateId },
        data: qasData,
      };
      api.image.postImageTemplate(params).then(() => {
        msg('删除成功', 'success');
        handleDelQuestion(editGroupInx);
      });
    }
    closeModal();
  };
  return (
    <div className={`pr-15 ${styles.add_ddtk}`}>
      <div className={styles.demo}>
        <span>示例 肝脏描述</span>
        {
          ddtkExample.map((item, inx) => (
            <div key={item.q} className="mt-8">
              <span className={`${styles.order_number} ml-50`}>{inx + 1}</span>
              <span>{item.q}</span>
              <Input placeholder="请输入答案" />
            </div>
          ))
        }
      </div>
      <div className={styles.qa_list}>
        {
          qas.map((item, inx: number) => {
            if (inx === 0) {
              return <Input key={inx} placeholder="请输入题目" value={item.question} onChange={(e) => handleEditCont(e, 'question', inx)} />;
            }  else {
              return (
                <div className={styles.qa_item} key={inx}>
                  <span className={styles.order_number}>{inx} </span>
                  <Input
                    value={item.question}
                    onChange={(e) => handleEditCont(e, 'question', inx)}
                    placeholder="请输入问题"
                    style={{ marginRight: 15 }}
                  />
                  <Input
                    value={item.answer?.[0]}
                    onChange={(e) => handleEditCont(e, 'answer', inx)}
                    placeholder="请输入答案"
                  />
                  <CloseCircleFilled onClick={() => handleDelQa(inx)} />
                </div>
              );
            }
          })
        }
      </div>
      <div className={styles.add_btn} onClick={() => handleAddQa()}>+ 添加问题</div>
      <div className={styles.ghost_btn}>
        <Button type="primary" ghost icon={<DeleteOutlined />}  onClick={handleDelete}>
          { actionType === 'add' ? '取消' : '删除' }
        </Button>
        <Button type="primary" ghost icon={<CheckCircleOutlined />} onClick={handleSave}>确认</Button>
      </div>
    </div>
  );
};

export default TopicAddDdtk;
