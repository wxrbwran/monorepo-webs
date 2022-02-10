import React, { FC, useState } from 'react';
import { Button, Input, Select, DatePicker, message } from 'antd';
import { DeleteOutlined, CheckCircleOutlined } from '@ant-design/icons';
import { IAddTopicProps, IQaItem } from '../type';
import * as api from '@/services/api';
import { msg } from '../utils';
import EditDdtkType from './EditDdtkType';
import styles from './index.scss';
import uuid from 'react-uuid';

const { Option } = Select;
const { TextArea } = Input;

const AddDdtkSenior: FC<IAddTopicProps & { closeModal: () => void }> = (props) => {
  const { actionType, handleDelQuestion, closeModal, templateId, handleSaveQuestion,
    initData, editGroupInx } = props;
  const formatInit = () => {
    if (initData) {
      let qatext = '';
      (initData as IQaItem[]).forEach((item, inx) => {
        if (inx !== (initData as IQaItem[]).length - 1) {
          qatext += item.question + '「」';
        } else {
          qatext += item.question;
        }
      });
      return qatext;
    } else {
      return '填空1「」, 填空2「」';
    }
  };
  const [loading, setLoading] = useState(false);
  const [question, setQuestion] = useState(formatInit()); // 问题文本
  const [qas, setQas] = useState<IQaItem[]>(initData ? initData as IQaItem[] : []); // 问题组
  const [cursorIndex, setCursorIndex] = useState(); // 光标位置
  const groupUuid = uuid();

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

  // 保存当前点击的位置
  const handleSaveIndex = () => {
    const dom = document.getElementsByClassName('ddtk_textarea')[0];
    // @ts-ignore
    dom?.focus();
    // @ts-ignore
    setCursorIndex(dom?.selectionStart);
  };
  // 内容变化时，保存光标位置
  const handleChangeVal = (ev: React.ChangeEventHandler<HTMLTextAreaElement>) => {
    setCursorIndex(ev.target.value.length);
    setQuestion(ev.target.value);
  };
  // 添加填空符
  const handleAddSymbol = () => {
    let newCont = `${question}「」`;
    if (cursorIndex) {
      newCont = `${question.slice(0, cursorIndex)}「」${question.slice(cursorIndex)}`;
    }
    setQuestion(newCont);
  };
  const handSaveType = (data) => {
    console.log('=====handSaveType', data);
    setQas(data);
  };

  const questionToQas = () => {
    const stemArr: string[] = question.split('「」');
    const newQas: IQaItem[] = stemArr.map((item, inx: number) => {
      const group = `4-1-${inx}`;
      if (qas[inx]) {
        return { ...qas[inx], question: item, group }; // 如果之前转换过存在，要保留之前的（题类型、选项等）
      } else {
        return {
          question: item,
          question_type: 'INLINE_COMPLETION',
          answer: [],
          uuid: groupUuid,
          group,
        };
      }
    });
    return newQas;
  };

  const handleSave = () => {
    console.log('========21d', questionToQas());
    console.log('d', question);
    if (question.trim() === '' || !question.includes('「」')) {
      message.error('请正确输入问题！');
    } else {
      const qasData = questionToQas().map((qaItem, inx) => {
        return {
          ...qaItem,
          answer: [],
          ...actionType === 'add' ?
            { action: 'ADD' }
            : { action: 'ALTER', createdTime: initData?.[0]?.createdTime },
        };
      });
      const params = {
        meta: { id: templateId },
        data: qasData,
      };
      //
      // const qasParams = qas.map(item => ({ ...item  }));
      // handleSaveQuestion(qasParams, actionType, editGroupInx);
      //
      api.image.postImageTemplate(params).then((res) => {
        msg('保存成功', 'success');
        const createdTime = res?.list?.[0]?.data?.[0]?.createdTime;
        const qasParams = qas.map(item => ({ ...item, createdTime  }));
        console.log('qasParamsqasParams', qasParams);
        handleSaveQuestion(qasParams, actionType, editGroupInx);
        closeModal();
        setLoading(false);
      }).catch(err => {
        msg(err?.result || '保存失败', 'error');
        setLoading(false);
      });
    }
  };
  const handleChangeQuestionType = () => {
    setQas(questionToQas());
  };
  return (
    <div className={`pr-15 ${styles.add_ddtk} ${styles.add_ddtk_senior}`}>
      <div className={styles.demo}>
        <span>示例</span>
        <div className="mt-8 mb-5">
          <span className="ml-50">{1}</span>
          <span>身高</span>
          <Input placeholder="请输入" />
          <span className='ml-20 mr-5'>性别</span>
          <Select defaultValue="1" style={{ width: 120 }}>
            <Option value="1">男</Option>
            <Option value="2">女</Option>
          </Select>
          <span className='ml-20 mr-5'>出生日期</span>
          <DatePicker />
        </div>
      </div>
      <div
        className={`topic-item ${styles.ddtk} edit`}
      >
        <div className="answer-wrap">
          <pre style={{ position: 'relative' }}>
            <div>{question}</div>
            <TextArea
              placeholder="请输入"
              value={question}
              onChange={(ev) => handleChangeVal(ev)}
              onClick={handleSaveIndex}
              className="ddtk_textarea"
            />
          </pre>
        </div>
        <div className="flex justify-between mt-20">
          <div className={styles.add_btn} onClick={handleAddSymbol}>+ 添加填空符</div>
          <Button type="primary" ghost onClick={handleChangeQuestionType}>
            <EditDdtkType
              qas={qas}
              onSuccess={handSaveType}
            ><span>修改填空题型</span></EditDdtkType>
          </Button>
        </div>
      </div>
      <div className={styles.ghost_btn}>
        <Button type="primary" ghost icon={<DeleteOutlined />}  onClick={handleDelete}>
          { actionType === 'add' ? '取消' : '删除' }
        </Button>
        <Button type="primary" ghost icon={<CheckCircleOutlined />} onClick={handleSave} loading={loading}>确认</Button>
      </div>
    </div>
  );
};

export default AddDdtkSenior;
