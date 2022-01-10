import React, { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import {
  Popover, message, Popconfirm,
} from 'antd';
import { useLocation } from 'umi';
import * as api from '@/services/api';
import Title from '../../Title';
import styles from '../index.scss';
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
function DiagnoseList() {
  const [diagnosisList, setDiagnosisList] = useState<IdiagnosisItem[]>([]);
  const [hospital, setHospital] = useState({ title: '', content: '' });
  const sid = useLocation().query.patientSid;
  const fetchDiagnosis = () => {
    api.diagnosis.fetchDiagnosis({ sid }).then((res) => {
      setDiagnosisList(res.diagnosisList);
    });
  };
  useEffect(() => {
    if (diagnosisList.length === 0) {
      fetchDiagnosis();
    }
  }, []);

  const handleDelete = (id: string) => {
    api.diagnosis.deleteDisease({ id, sid }).then(() => {
      message.success('删除成功');
      fetchDiagnosis();
    });
  };
  const fetchHospitalDetail = (hosInfo: { hospitalId: string, hospitalName: string }) => {
    const params = {
      id: hosInfo.hospitalId,
      name: hosInfo.hospitalName,
    };
    api.base.fetchHospitalsDetail(params).then((res) => {
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
    <div className={styles.diagnose}>
      <div className={styles.head}>
        <Title text="诊断" />
      </div>
      {/* 蓝色样式styles.modify */}
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
                  {/* <span className={styles.ocr_tip}>
                        智能识别结果
                        <Tooltip placement="bottom" title="这条诊断是智能识别结果，需要人工复审">
                          <QuestionCircleOutlined />
                        </Tooltip>
                      </span> */}
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
                <div className={styles.btn_wrap}>
                  {/* <AddDiagnose type="edit" initData={item} refreshList={refreshList}>
                    <span>编辑</span>
                  </AddDiagnose> */}
                  <Popconfirm
                    placement="topLeft"
                    title="是否删除该诊断"
                    onConfirm={() => handleDelete(item.id)}
                    okText="是"
                    cancelText="否"
                  >
                    <span>
                      删除
                    </span>
                  </Popconfirm>
                </div>
              </div>
            </li>
          ))
        }
      </ul>

    </div>
  );
}

export default DiagnoseList;
