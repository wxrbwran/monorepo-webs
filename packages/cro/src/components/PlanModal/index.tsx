import React, { useState } from 'react';
import DragModal from 'xzl-web-shared/src/components/DragModal';
import SendPlan from '@/components/SendPlan';
import { IPlanInfos } from '@/utils/consts';
import styles from './index.scss';

interface IProps {
  children: React.ReactElement;
  title: string;
  infoIndex: number;
  scaleId?: string;
  plans?: IPlanInfos[];
  updatePlan?: Function;
  question?: string;
  location?: {
    pathname: string,
  }
}

function PlanModal({ children, title, infoIndex, plans, updatePlan, question, location }: IProps) {
  const [showModal, setShowModal] = useState(false);
  const addPlan = (params: object, index: number) => {
    setShowModal(false);
    if (updatePlan) updatePlan(params, index);

    // const { pathname } = location;
    // const id = location.query.id;
    // if(pathname.includes('objective_table/detail')){
    //   api.subjective.updateScalePlan({
    //     plan: params.plans,
    //     scaleId,
    //     projectNsId,
    //   }).then((res) => {
    //     message.success('修改成功111')
    //     dispatch({
    //       type: 'project/fetchObjectiveScale',
    //       payload: id,
    //     });
    //   })
    //   .catch((err:string) => {
    //     message.error(err);
    //   });
    // }else{
    //   if(updatePlan)  updatePlan(params,index)
    // }
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
          <SendPlan
            mode='Edit'
            onCancel={() => setShowModal(false)}
            addPlan={addPlan}
            infoIndex={infoIndex}
            plans={plans}
            question={question}
            location={location}
          />
        </DragModal>
      )}
    </>
  );
}

export default PlanModal;
