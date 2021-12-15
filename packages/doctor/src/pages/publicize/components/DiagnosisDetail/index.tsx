import React, { useState, useEffect } from 'react';
import DragModal from 'xzl-web-shared/dist/src/components/DragModal';
import dayjs from 'dayjs';
import * as api from '@/services/api';
import { Popover } from 'antd';
import styles from './index.scss';

interface IProps {
  children: React.ReactElement;
  sid: string;
}
interface IdiagnosisItem {
  name: string;
  diseaseId: string;
  id: string;
  attachedInfo: {
    diagnosisAt: number;
    hospitalName: string;
    hospitalId: string;
  }
}
export default ({ children, sid }: IProps) => {
  const [showModal, setShowModal] = useState(false);
  const [diagnosisList, setDiagnosisList] = useState<IdiagnosisItem[]>([]);
  const [hospital, setHospital] = useState({ title: '', content: '' });

  const handleShowModal = () => {
    setShowModal(true);
  };
  const fetchDiagnosis = () => {
    api.diagnosis.fetchDiagnosis({ sid }).then((res) => {
      setDiagnosisList(res.diagnosisList);
    });
  };
  useEffect(() => {
    if (showModal){
      fetchDiagnosis();
    }
  }, [showModal]);

  const fetchHospitalDetail = (hosInfo: { hospitalId: string, hospitalName: string }) => {
    const params = {
      id: hosInfo.hospitalId,
      name: hosInfo.hospitalName,
    };
    api.base.fetchHospitals(params).then((res) => {
      console.log(res);
      const {
        province, district, county, address, name, city,
      } = res.organizationInfos[0] || {};
      setHospital({
        title: name || hosInfo.hospitalName,
        content: province ? `${province} ${city || ''} ${district || ''} ${county || ''} ${address || ''}` : '',
      });
    });
  };
  const resetHospital = () => {
    setHospital({ title: '', content: '' });
  };

  const fourHigh = ['高血压病', '糖尿病', '高脂血症', '高尿酸血症'];
  return (
    <div>
      <span onClick={handleShowModal}>{children}</span>
      <DragModal
        title="诊断"
        footer={null}
        width={500}
        visible={showModal}
        onCancel={() => setShowModal(false)}
        className={styles.diagnose}
        wrapClassName="ant-modal-wrap-center diagnose"
      >
        <ul>
          {
            diagnosisList.length === 0 && <span style={{ marginLeft: 10 }}>暂无诊断信息</span>
          }
          {
            diagnosisList.map((item: IdiagnosisItem, index) => (
              <li className={styles.item} key={item.id}>
                <span className={styles.item__left}>
                  {index + 1}
                  .
                </span>
                <div className={styles.item__right}>
                  <div className={styles.dia_tit}>
                    <span className={`${styles.name} ${fourHigh.includes(item.name) ? styles.sick : ''}`}>
                      {item.name}
                    </span>
                  </div>
                  <div className={styles.info}>
                    <span>{item.attachedInfo.diagnosisAt ? dayjs(item.attachedInfo.diagnosisAt).format('YYYY.MM.DD') : '--'}</span>
                    {
                      item.attachedInfo.hospitalName && (
                        <Popover
                          title={hospital.title}
                          content={hospital.content} // 需要调接口获取
                          placement="bottomLeft"
                        >
                          <span
                            onMouseEnter={
                              () => fetchHospitalDetail(item.attachedInfo)
                            }
                            onMouseLeave={resetHospital}
                          >
                            {item.attachedInfo.hospitalName}
                          </span>
                        </Popover>
                      )
                    }
                  </div>
                </div>
              </li>
            ))
          }
        </ul>
      </DragModal>
    </div>
  );
};
