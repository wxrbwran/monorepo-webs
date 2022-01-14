import React, { useState } from 'react';
import DragModal from 'xzl-web-shared/dist/components/DragModal';
import styles from './index.scss';
import { IChooseValues, IRuleDoc } from '../../pages/subjective_table/util';
import ScaleTemplate from '../Scale/ScaleTemplate';

interface IProps {

  children: React.ReactElement;
  title: string;
  infoIndex: number;
  scaleId?: string;
  scaleType: 'CRF' | 'SUBJECTIVE' | 'VISIT_CRF' | 'VISIT_SUBJECTIVE';
  // plans?: IPlanInfos[];
  ruleDoc: IRuleDoc;
  chooseValues: IChooseValues;
  updatePlan?: Function;
  question?: string;
  location?: {
    pathname: string,
  }
}

function PlanModal({ children, title, ruleDoc, updatePlan, chooseValues, scaleType, question }: IProps) {
  const [showModal, setShowModal] = useState(false);
  const addPlan = (params: object, index: number) => {
    setShowModal(false);
    if (updatePlan) updatePlan(params, index);
  };


  return (
    <>
      <div style={{ display: 'inline' }} onClick={() => setShowModal(!showModal)}>
        {children}
      </div>
      {showModal && (
        <DragModal
          visible={showModal}
          title={title}
          width={800}
          wrapClassName="ant-modal-wrap-center send_plan"
          onCancel={() => setShowModal(false)}
          maskClosable
          footer={null}
          className={styles.send_plan}
        >
          <ScaleTemplate
            mode='Edit'
            onCancel={() => setShowModal(false)}
            addPlan={addPlan}
            originRuleDoc={ruleDoc}
            chooseValues={chooseValues}
            scaleType={scaleType}
            question={question}

          />
        </DragModal>
      )}
    </>
  );
}

export default PlanModal;
