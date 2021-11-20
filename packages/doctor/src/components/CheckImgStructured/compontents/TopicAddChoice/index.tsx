import React, { FC, useState } from 'react';
import { Radio, Input, RadioChangeEvent, Button } from 'antd';
import { CloseCircleFilled, BorderOutlined, CheckSquareFilled, DeleteOutlined, CheckCircleOutlined } from '@ant-design/icons';
import { checkboxData, msg } from '../utils';
import { IAddTopicProps } from '../type';
import uuid from 'react-uuid';
import { cloneDeep } from 'lodash';
import styles from './index.scss';

interface IChoiceItem {
  uuid: string;
  question_type: string;
  question: string;
  answer: string[];
  options: string[];
}
const TopicAddChoice: FC<IAddTopicProps & { closeModal: () => void }> = (props) => {
  const { actionType, handleDelQuestion, editInx, closeModal, templateId } = props;
  const [qa, setQa] = useState<IChoiceItem>({ ...cloneDeep(checkboxData), uuid: uuid() });
  const handleEditCont = (e: any, type: string) => {
    if (type === 'question') {
      qa[type] = e.target.value;
    } else {
      qa[type][0] = e.target.value;
    }
    setQa({ ...qa });
  };
  const handleSaveOption = (e: React.ChangeEvent<HTMLInputElement>, inx: number) => {
    qa.options[inx] = e.target.value;
    setQa({ ...qa });
  };
  const handleDelOptions = (optionIndex: number, option?: string) => {
    if (option) {
      qa.answer = qa.answer!.filter((item: string) => item !== option);
    }
    qa.options.splice(optionIndex, 1);
    setQa({ ...qa });
  };
  // 添加选项 index表示第几题
  const handleAddOptions = () => {
    qa.options.push('');
    setQa({ ...qa });
  };
  // 修改题型
  const handleChangeType = (e:RadioChangeEvent) => {
    qa.question_type = e.target.value;
    qa.answer = [];
    setQa({ ...qa });
  };
  const handleChangeChecked = (content: string) => {
    if (qa.answer.includes(content)) {
      qa.answer = qa.answer.filter(item => item !== content);
    } else {
      qa.answer.push(content);
    }
    setQa({ ...qa });
  };
  const handleSave = () => {
    console.log('------qas', qa);
    if (qa.question === '') {
      msg('请输入问题', 'error');
    } else if (qa.options.includes('')) {
      msg('内容不得为空', 'error');
    } else if ([...new Set(qa.options)].length !== qa.options.length){
      msg('存在重复选项', 'error');
    } else {
      const params = {
        meta: { id: templateId },
        data: [ qa ],
      };
      console.log('------1', params);
      // api.image.postImageTemplate(params).then(res => {
      //   console.log('添加成功', res);
      //   // handleSaveQuestion(qas, actionType);
      //   // closeModal();
      // });
    }
  };
  const handleDelete = () => {
    if (actionType === 'edit' && editInx) {
      handleDelQuestion(editInx);
    }
    closeModal();
  };
  return (
    <div
      className={styles.choice}
      onClick={(e) => e.stopPropagation()}
    >
      <div className="bg-gray-50 p-10 mb-15">
        <span className="mr-40 pl-5">示例: 肺动脉端</span>
        <Radio.Group>
          <Radio value={1}>突出</Radio>
          <Radio value={2}>不突出</Radio>
        </Radio.Group>
        <span className="ml-30">单选</span>
      </div>
      <div className="input-empty pl0 border-b">
        <Input
          placeholder="请输入问题"
          value={qa.question}
          onChange={(e) => handleEditCont(e, 'question')}
        />
      </div>
      <div className="options-list">
        {qa.options!.map((option, oIndex) => {
          return (
            <div className="flex items-center border-b h-37 mb-10" key={oIndex}>
              <span onClick={() => handleChangeChecked(option)}>
                { option && qa.answer.includes(option) ? <CheckSquareFilled /> : <BorderOutlined />}
              </span>
              <Input
                placeholder={`请输入选项${oIndex + 1}`}
                onChange={(ev: Event) => handleSaveOption(ev, oIndex)}
                value={option}
              />
              <CloseCircleFilled className="text-md" onClick={() => handleDelOptions(oIndex, option)} />
            </div>
          );
        })}
      </div>
      <div className="flex justify-between mt-10">
        <div className={styles.add_option} onClick={handleAddOptions}>+添加选项</div>
        <div>
          <Radio.Group onChange={handleChangeType} defaultValue={qa.question_type}>
            <Radio value="RADIO">单选</Radio>
            <Radio value='CHECKBOX'>多选</Radio>
          </Radio.Group>
        </div>
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

export default TopicAddChoice;
