import React, { useState } from 'react';
import DragModal from 'xzl-web-shared/src/components/DragModal';
import styles from './index.scss';
import type { IQuestions } from '../../const';
import ScaleDetail from '../scale_detail';

interface IProps {
  children: React.ReactElement;
  title: string;
  subTitle: string;
  question: IQuestions[];
  source?: number;
  id: string;
  isShowEdit?: boolean;
}

function QuestionDetail(props: IProps) {
  const { children, title, subTitle, question, source, id, isShowEdit } = props;
  const [isShowModal, setIsShowModal] = useState(false);
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
