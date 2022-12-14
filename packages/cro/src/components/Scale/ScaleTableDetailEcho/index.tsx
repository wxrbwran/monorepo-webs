import React, { useState, useEffect } from 'react';
import DragModal from 'xzl-web-shared/dist/components/DragModal';
import * as api from '@/services/api';
import styles from './index.scss';
import { Checkbox, Input, message, Divider } from 'antd';
import { FormOutlined, DeleteOutlined } from '@ant-design/icons';
import { Link, history, useSelector, useLocation } from 'umi';
import { IQuestions } from '@/utils/consts';
import { getUrlPreFix } from '@/pages/subjective_table/util';
const TextArea = Input.TextArea;

interface IProps {
  scaleName: string;
  questions: IQuestions[];
  scaleType: 'CRF' | 'SUBJECTIVE' | 'VISIT_CRF' | 'VISIT_SUBJECTIVE' | 'OBJECTIVE' | 'VISIT_OBJECTIVE';
  source?: number;
  groupId?: string;
  scaleId?: string;
  subTit?: string;
  ruleDoc?: {
    id: string;
  }
}
function ScaleTableDetailEcho(props: IProps) {
  const location = useLocation();
  console.log('propsdelll', props);
  const { source, groupId, ruleDoc } = props;
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
      ruleId: ruleDoc?.id,
    }).then(() => {
      message.success('????????????');
      // ????????????????????????
      let bType = 21;
      // scaleType: 'CRF' | 'SUBJECTIVE' | 'VISIT_CRF' | 'VISIT_SUBJECTIVE' | 'OBJECTIVE' | 'VISIT_OBJECTIVE';
      switch (props.scaleType) {
        case 'CRF':
          bType = window.$log.businessType.DELETE_CRF.code;
          break;
        case 'VISIT_CRF':
          bType = window.$log.businessType.DELETE_CRF_UNPLANNED.code;
          break;
        case 'SUBJECTIVE':
          bType = window.$log.businessType.DELETE_SUBJECTIVE.code;
          break;
        case 'VISIT_SUBJECTIVE':
          bType = window.$log.businessType.DELETE_UNPLANNED_SUBJECTIVE.code;
          break;
        default:
          break;
      }
      window.$log.handleOperationLog({
        type: 2,
        copyWriting: `?????? - ${props.scaleName}`,
        businessType: bType,
        oldParams: {
          content: {
            name: props.scaleName,
            questions: props.questions,
          },
        },
      });
      // ????????????????????????
      history.push(`${location.pathname}?name=${scaleGroupInfos[0].name}`);
    });
  };

  return (
    <div className={styles.detail}>
      <div className={`${styles.first_title} relative`}>
        {scaleName}
        {
          (status !== 1001 || ['VISIT_CRF', 'VISIT_SUBJECTIVE', 'VISIT_OBJECTIVE'].includes(scaleType))
          && window.$storage.getItem('isLeader')
          && !location.pathname.includes('reply')
          && !location.pathname.includes('template')
          && !location.pathname.includes('query') //???????????????
          && !location.pathname.includes('operation_log') && (
            <p className={`${styles.icon} mr-20 absolute right-0 top-0`}>
              <Link
                to={`/${getUrlPreFix(scaleType)}/create?groupId=${groupId}&scaleId=${props.scaleId}`}
              >
                <p className="inline-block text-base cursor-pointer">
                  <FormOutlined /> ?????? <Divider type="vertical" />
                </p>
              </Link>
              <p
                className="inline-block text-base cursor-pointer"
                onClick={() => setShowModal(!showModal)}
              >
                <DeleteOutlined /> ??????
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
              {item.type === 'END' && <span className={styles.end}>????????????</span>}
              {item.type !== 'COMPLETION' &&
                // (scaleType === 'CRF' ? item.detail.stem : item.code + '???' + item.detail.stem)}
                (item.code + '???' + item.detail.stem)}

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
                <TextArea placeholder="?????????" value={item.detail.answer} />
              )}
              {item.type === 'COMPLETION' && (
                <div className="flex">
                  <span className={styles.item__issue}>{item.code + '???'}</span>
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
          <p className="text-base">????????????????????????????????????????????????????????????????????????</p>
        </DragModal>
      )}
    </div>
  );
}
export default ScaleTableDetailEcho;
