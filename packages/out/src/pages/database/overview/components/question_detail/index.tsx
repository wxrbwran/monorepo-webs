import React, { useState } from 'react';
import { Checkbox, Input } from 'antd';
import DragModal from 'xzl-web-shared/dist/src/components/DragModal';
import styles from './index.scss';
import type { IQuestions } from 'xzl-web-shared/dist/src/utils/consts';

const { TextArea } = Input;
interface IProps {
  children: React.ReactElement;
  name: string;
  questions: IQuestions[];
  scaleName: string;
}

function QuestionDetail(props: IProps) {
  const { questions, scaleName } = props;
  const [isShowModal, setIsShowModal] = useState(false);
  return (
    <>
      <span onClick={() => setIsShowModal(!isShowModal)}>{props.children}</span>
      <DragModal
        wrapClassName="ant-modal-wrap-center detail"
        width="800px"
        className={styles.detail}
        visible={isShowModal}
        title=''
        onCancel={() => setIsShowModal(false)}
        footer={null}
      >
        <div className={styles.list}>
          <p className={styles.first_title}>{scaleName}</p>
          <p className={styles.second_title}>请您认真填写，谢谢合作</p>
          {
            questions.map((item: IQuestions, index) => {
              return (
                <div className={styles.item} key={index}>
                  <div className={styles.item__issue}>
                    {item.type === 'END' && <span className={styles.end}>终点事件</span>}
                    {item.code}、{item.detail.stem}
                  </div>
                  <div>
                    {
                      item.type === 'RADIO' && (
                        item.detail.options.map((option, oIndex) => (
                          <Checkbox key={oIndex} checked={option.content === item.detail.checkedArr}>{option.content}</Checkbox>
                        ))
                      )
                    }
                    {
                      item.type === 'CHECKBOX' && (
                        item.detail.options.map((option, oIndex) => (
                          <Checkbox
                            key={oIndex}
                            checked={item.detail.checkedArr && item.detail.checkedArr.includes(option.content)}
                          >
                            {option.content}
                          </Checkbox>
                        ))
                      )
                    }
                    {
                      ['TEXT', 'END'].includes(item.type) && (
                        <TextArea placeholder="请输入" value={item.detail.answer}/>
                      )
                    }
                  </div>
                </div>
              );
            })
          }
        </div>
      </DragModal>
    </>
  );
}

export default QuestionDetail;
