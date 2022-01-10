import React from 'react';
import styles from './index.scss';
import { Checkbox, Input } from 'antd';
import { FormOutlined } from '@ant-design/icons';
import type { IQuestions } from '../../const';
import { useDispatch, history } from 'umi';

const { TextArea } = Input;

interface IProps {
  title: string;
  subTitle: string;
  questions: IQuestions[];
  source?: number,
  id?: string;
  isShowEdit?: boolean;
}
function ScaleDetail(props: IProps) {
  const { title, subTitle, questions, isShowEdit } = props;
  console.log('props222', props);
  const dispatch = useDispatch();
  const handleEdit = () => {
    dispatch({
      type: 'suifang/saveCurrentEditScale',
      payload: props,
    });
    history.push('/education/accompany/create');
  };

  console.log('============= questions', JSON.stringify(questions));
  return (
    <div className={styles.detail}>
      {
        isShowEdit && history.location.pathname.includes('list') && (
          <div className="absolute right-50 top-80 text-blue-500 cursor-pointer" onClick={handleEdit}>
            <FormOutlined /> 编辑
          </div>
        )
      }

      <p className={styles.first_title}>{title}</p>
      <p className={styles.second_title}>{subTitle}</p>
      {
        questions &&
        questions.map((item: IQuestions) => {
          return (
            <div className={styles.item}>
              <div className={styles.item__issue}>
                {item.type === 'END' && <span className={styles.end}>终点事件</span>}
                {
                  item.type !== 'COMPLETION' && (`${item.code}、${item.detail.stem}`)
                }
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
                    <TextArea placeholder="请输入" value={item.detail.answer} />
                  )
                }
                {
                  item.type === 'COMPLETION' && (
                    <div className="flex">
                      <span>{item.code}、</span>
                      <pre style={{ color: '#000' }}>
                        {
                          (item.detail.stem as string[]).map((stemItem, index) => {
                            return (
                              <>
                                <span>{stemItem}</span>
                                {
                                  index !== item.detail.stem.length - 1 && (
                                    <span className="border">{(item.detail.answer as string[])[index]}</span>
                                  )
                                }
                              </>
                            );
                          })
                        }
                      </pre>
                    </div>
                  )
                }
              </div>
            </div>
          );
        })
      }
    </div>
  );
}
export default ScaleDetail;
