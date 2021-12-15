import React, { FC, useState, useEffect } from 'react';
import * as api from '@/services/api';
import DragModal from 'xzl-web-shared/dist/src/components/DragModal';
import EventForm from './EventForm';
import styles from './index.scss';

interface IProps {
  title?: string;
}

interface IProj {
  name: string;
  projectSid: string;
}

const EndEvent: FC<IProps> = (props) => {
  const { children, title } = props;
  const [step, setStep] = useState(0);
  const [projList, setProjList] = useState<IProj[]>([]);
  const [projSid, setProjSid] = useState('');
  const patientSid = window.$storage.getItem('patientSid');
  const handleShowModal = () => {
    setStep(1);
  };

  useEffect(() => {
    api.event.fetchPatientProjList(patientSid).then((res) => {
      setProjList(res.projectInfos);
    })
      .catch((err) => {
        console.log('err', err);
      });
  }, []);

  const handleChange = (sid: string) => {
    setStep(2);
    setProjSid(sid);
  };

  return (
    <>
      {
      projList.length > 0 && (
        <div>
          <div onClick={handleShowModal}>
            {children}
          </div>
          {title}
          <DragModal
            title={step === 1 ? '请选择试验名称' : '添加终点事件（SAE）'}
            width={step === 1 ? 689 : 1006}
            visible={!!step}
            onCancel={() => setStep(0)}
            wrapClassName="ant-modal-wrap-center"
            footer={null}
          >
            <div className={styles.end_event_modal}>
              {
                step === 1 && (
                  projList.length > 0
                    ? projList.map((item) => (
                      <p key={item.name} className={`${styles.name} mb-5 cursor-pointer`} onClick={() => handleChange(item.projectSid)}>
                        {item.name}
                      </p>
                    ))
                    : '暂无数据'
                )
              }
              {
                step === 2
                && <EventForm handleChangeStep={(val) => setStep(val)} projSid={projSid} />
              }
            </div>
          </DragModal>
        </div>
      )
    }
    </>
  );
};

export default EndEvent;
