import React, { useState, useEffect } from 'react';
import DragModal from 'xzl-web-shared/src/components/DragModal';
import * as api from '@/services/api';
import styles from './index.scss';
import type { IQuestions } from '../../const';
import ScaleDetail from '../scale_detail';

interface IProps {
  children: React.ReactElement;
  title?: string;
  subTitle?: string;
  question?: IQuestions[];
  source?: number;
  id?: string;
  isShowEdit?: boolean;
}

function QuestionDetail(props: IProps) {
  const { children, source, id, isShowEdit } = props;
  const [title, setTitle] = useState('');
  const [subTitle, setSubTitle] = useState('');
  const [question, setQuestion] = useState<IQuestions[]>();
  const [isShowModal, setIsShowModal] = useState(false);

  useEffect(() => {
    if (isShowModal) {
      if (id){
        api.education
          .getScaleDetail(id)
          .then((res) => {
            setTitle(res.title);
            setSubTitle(res.subTitle);
            setQuestion(res.questions);
          })
          .catch((err: string) => {
            console.log('err', err);
          });
      } else {
        setTitle(props.title);
        setSubTitle(props.subTitle);
        setQuestion(props.question);
      }
    }
  }, [isShowModal]);

  return (
    <>
      <span onClick={() => setIsShowModal(!isShowModal)}>{children}</span>
      {
        isShowModal && (
          <DragModal
            wrapClassName="ant-modal-wrap-center detail"
            width="800px"
            className={styles.detail}
            visible={isShowModal}
            title=''
            onCancel={() => setIsShowModal(false)}
            footer={null}
          >
            <ScaleDetail
              title={title}
              subTitle={subTitle}
              question={question}
              source={source}
              id={id}
              isShowEdit={isShowEdit}
            />
          </DragModal>
        )
      }
    </>
  );
}

export default QuestionDetail;
