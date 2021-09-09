import React, { useState, useEffect } from 'react';
import * as api from '@/services/api';
import styles from './index.scss';
import { Checkbox, Input, message } from 'antd';
import { IQuestions } from '@/utils/consts';
const TextArea = Input.TextArea;

interface IProps {
  scaleName: string;
  questions: IQuestions[];
  scaleType: string;
  source?: number;
}
function ScaleTableDetailEcho(props: IProps) {
  const { source } = props;
  const [scaleType, setScaleType] = useState('');
  const [scaleName, setScaleName] = useState('');
  const [questions, setQuestions] = useState<IQuestions[]>([]);
  useEffect(() => {
    if(source){
      api.query.fetchReplyDetail(source).then((res) => {
        if(res){
          const { type, scaleName, result } = res;
          setScaleType(type);
          setScaleName(scaleName);
          setQuestions(result)
        }
      })
      .catch((err:string) => {
        message.error(err);
      });
    }else{
      setScaleType(props.scaleType);
      setScaleName(props.scaleName);
      setQuestions(props.questions)
    }
  }, [props])

  return (
    <div className={styles.detail}>
      <p className={styles.first_title}>{scaleName}</p>
      <p className={styles.second_title}>请您认真填写，谢谢合作</p>
      {
        questions.map((item: IQuestions, index) => {
          return (
            <div className={styles.item} key={index}>
              <div className={styles.item__issue}>
                {item.type === 'END' && <span className={styles.end}>终点事件</span>}
                {
                  item.type !== 'COMPLETION' && (
                    scaleType === 'CRF' ? item.detail.stem : (item.code + '、' + item.detail.stem))
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
                    <TextArea placeholder="请输入" value={item.detail.answer}/>
                  )
                }
                {
                  item.type === 'COMPLETION' && (
                    <pre style={{color: '#000'}}>
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
                          )
                        })
                      }
                    </pre>
                  )
                }
              </div>
            </div>
          )
        })
      }
    </div>
  )
}
export default ScaleTableDetailEcho;
