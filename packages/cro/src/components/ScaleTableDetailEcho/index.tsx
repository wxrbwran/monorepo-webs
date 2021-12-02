import React, { useState, useEffect } from 'react';
import DragModal from 'xzl-web-shared/src/components/DragModal';
import * as api from '@/services/api';
import styles from './index.scss';
import { Checkbox, Input, message, Divider } from 'antd';
import { FormOutlined, DeleteOutlined } from '@ant-design/icons';
import { Link, history, useSelector, useLocation } from 'umi';
import { IQuestions } from '@/utils/consts';
const TextArea = Input.TextArea;

interface IProps {
  scaleName: string;
  questions: IQuestions[];
  scaleType: string;
  source?: number;
  groupId: string;
  scaleId: string;
  subTit: string;
}
function ScaleTableDetailEcho(props: IProps) {
  const location = useLocation();
  const { source, groupId } = props;
  const [scaleType, setScaleType] = useState('');
  const [scaleName, setScaleName] = useState('');
  const [questions, setQuestions] = useState<IQuestions[]>([]);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [subTit, setSubTit] = useState('');
  const scaleGroupInfos = useSelector((state: any) => state.project.scaleGroupInfos);
  const { status } = useSelector((state: IState) => state.project.projDetail);
  useEffect(() => {
    if (source) {
      api.query
        .fetchReplyDetail(source)
        .then((res) => {
          if (res) {
            const { type, result } = res;
            setScaleType(type);
            setScaleName(res.scaleName);
            setQuestions(result);
          }
        })
        .catch((err: string) => {
          message.error(err);
        });
    } else {
      setScaleType(props.scaleType);
      setScaleName(props.scaleName);
      setQuestions(props.questions);
      setSubTit(props.subTit);
    }
  }, [props]);

  const onDelScale = () => {
    setShowModal(!showModal);
    api.subjective.delScale({
      scaleId: props.scaleId,
      scaleGroupId: groupId,
      projectSid: window.$storage.getItem('projectSid'),
      scaleType: props.scaleType,
    }).then(() => {
      message.success('删除成功');
      history.push(`${location.pathname}?name=${scaleGroupInfos[0].name}`);
    });
  };

  return (
    <div className={styles.detail}>
      <div className={`${styles.first_title} relative`}>
        {scaleName}
        {
          status !== 1001
          && window.$storage.getItem('isLeader')
          && !location.pathname.includes('reply')
          && !location.pathname.includes('template') && (
            <p className={`${styles.icon} mr-20 absolute right-0 top-0`}>
              <Link
                to={`/${scaleType === 'CRF' ? 'end_event' : 'subjective_table'
                }/create?groupId=${groupId}`}
              >
                <p className="inline-block text-base cursor-pointer">
                  <FormOutlined /> 编辑 <Divider type="vertical" />
                </p>
              </Link>
              <p
                className="inline-block text-base cursor-pointer"
                onClick={() => setShowModal(!showModal)}
              >
                <DeleteOutlined /> 删除
              </p>
            </p>
          )
        }
      </div>
      <p className={styles.second_title}>{subTit}</p>

      {questions && questions.map((item: IQuestions, index) => {
        return (
          <div className={styles.item} key={index}>
            <div className={styles.item__issue}>
              {item.type === 'END' && <span className={styles.end}>终点事件</span>}
              {item.type !== 'COMPLETION' &&
                // (scaleType === 'CRF' ? item.detail.stem : item.code + '、' + item.detail.stem)}
                (item.code + '、' + item.detail.stem)}

            </div>
            <div>
              {item.type === 'RADIO' &&
                item.detail.options.map((option, oIndex) => (
                  <Checkbox key={oIndex} checked={option.content === item.detail.checkedArr}>
                    {option.content}
                  </Checkbox>
                ))}
              {item.type === 'CHECKBOX' &&
                item.detail.options.map((option, oIndex) => (
                  <Checkbox
                    key={oIndex}
                    checked={
                      item.detail.checkedArr && item.detail.checkedArr.includes(option.content)
                    }
                  >
                    {option.content}
                  </Checkbox>
                ))}
              {['TEXT', 'END'].includes(item.type) && (
                <TextArea placeholder="请输入" value={item.detail.answer} />
              )}
              {item.type === 'COMPLETION' && (
                <div className="flex">
                  <span className={styles.item__issue}>{item.code + '、'}</span>
                  <pre style={{ color: '#000' }}>
                    {(item.detail.stem as string[]).map((stemItem, edx) => {
                      return (
                        <>
                          <span>{stemItem}</span>
                          {edx !== item.detail.stem.length - 1 && (
                            <span className="border">{(item.detail.answer as string[])[edx]}</span>
                          )}
                        </>
                      );
                    })}
                  </pre>
                </div>
              )}
            </div>
          </div>
        );
      })}
      {showModal && (
        <DragModal
          width={480}
          visible={showModal}
          onCancel={() => setShowModal(!showModal)}
          title=""
          // footer={null}
          onOk={onDelScale}
        >
          <p className="text-base">确认后量表消失（不可找回，实在紧急需要后台找回）</p>
        </DragModal>
      )}
    </div>
  );
}
export default ScaleTableDetailEcho;
