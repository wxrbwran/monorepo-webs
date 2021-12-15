import React, { useState } from 'react';
import DragModal from 'xzl-web-shared/dist/components/DragModal';
import styles from './index.scss';
import { IQuestions } from '@/utils/consts';
import ScaleTableDetailEcho from '@/components/ScaleTableDetailEcho';

interface IProps {
  children: React.ReactElement;
  questions: IQuestions[];
  scaleName: string;
  scaleType: string;
  source?: number;
}

function QuestionDetail(props: IProps) {
  const { questions, scaleName, scaleType, source } = props;
  const [isShowModal, setIsShowModal] = useState(false);
  return (
    <>
      <span onClick={() => setIsShowModal(!isShowModal)}>{props.children}</span>
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
            <ScaleTableDetailEcho
              scaleType={scaleType}
              scaleName={scaleName}
              questions={questions}
              source={source}
            />
          </DragModal>
        )
      }
    </>
  );
}

export default QuestionDetail;
