import React, { useState, useEffect } from 'react';
import { Popover, Popconfirm, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import { useParams } from 'umi';
import * as api from '@/services/api';
import AddTreatment, { ItreatmentDataItem, Ihospital } from '../TreatmentAdd';
import TumourTreatItem from '../TumourTreatItem';
import Title from '../../Title';
import event from 'xzl-web-shared/dist/utils/events/eventEmitter';
import styles from '../index.scss';

interface ItreatmentItem {
  category: string;
  treatmentDataList: ItreatmentDataItem[]
}
interface IProps {
  isTumour: boolean;
}
function TreatmentList({ isTumour }: IProps) {
  // 患者所在科室如果 为肿瘤科，那处理这里要显示化疗放疗其它治疗，否则不显示
  const [treatmentInfoList, setTreatmentInfoList] = useState<ItreatmentItem[]>([]);
  const [hospital, setHospital] = useState({ title: '', content: '' });
  const { sid } = useParams<{ sid: string }>();
  const fetchTreatments = () => {
    api.diagnosis.fetchTreatmentList({ sid }).then((res) => {
      setTreatmentInfoList(res.treatmentInfoList);
      // console.log('treatmentList', res.treatmentInfoList);
    });
  };
  useEffect(() => {
    if (treatmentInfoList.length === 0) {
      fetchTreatments();
    }
    event.addListener('refreshPreviousHistory', fetchTreatments);
    return () => {
      event.removeListener('refreshPreviousHistory', fetchTreatments);
    };
  }, []);
  const fetchHospitalDetail = (id: string, nameVal: string) => {
    const params = {
      id,
      name: nameVal,
    };
    api.base.fetchHospitals(params).then((res) => {
      console.log(res);
      const {
        province, district, county, address, name, city,
      } = res.organizationInfos[0] || {};
      // province 省，city市,district区,county县,address详细地址
      setHospital({
        title: name || nameVal,
        content: province ? `${province} ${city || ''} ${district || ''} ${county || ''} ${address || ''}` : '',
      });
    });
  };
  const resetHospital = () => {
    setHospital({ title: '', content: '' });
  };
  const renderHospital = (hospitalInfo: Ihospital) => (
    <div className={styles.info}>
      <span>{hospitalInfo.diagnosisAt ? dayjs(hospitalInfo.diagnosisAt).format('YYYY-MM-DD') : '--'}</span>
      <Popover
        title={hospital.title}
        content={hospital.content}
        placement="bottomLeft"
      >
        <span
          onMouseEnter={
            () => fetchHospitalDetail(hospitalInfo.hospitalId, hospitalInfo.hospitalName)
          }
          onMouseLeave={resetHospital}
        >
          {hospitalInfo.hospitalName || '--'}
        </span>
      </Popover>
    </div>
  );
  const handleDelete = (id: string) => {
    const params = {
      id,
      sid,
    };
    api.diagnosis.deleteTreatment(params).then(() => {
      message.success('删除成功');
      fetchTreatments();
    });
  };
  return (
    <div className={styles.treatment}>
      <div className={styles.head}>
        <Title text="治疗" />
        <AddTreatment type="add" refresh={fetchTreatments}>
          <div className={`${styles.add_btn} patientEditBtn`}>
            <PlusOutlined />
            添加治疗
          </div>
        </AddTreatment>
      </div>
      <ul className={styles.list}>
        {
        treatmentInfoList.map((item, index) => (
          item.category === 'DIAGNOSIS_TREATMENT' ? (
            <div key={item.category}>
              {
                (item.treatmentDataList.length === 0 && !isTumour) && <span> 暂无处理信息 </span>
              }
              {
                item.treatmentDataList.map((v, vinx) => (
                  <li className={styles.item} key={v.id}>
                    <span className={styles.item__left}>
                      {isTumour ? (vinx + 1 + index) : (vinx + 1)}
                      .
                    </span>
                    <div className={styles.item__right}>
                      <div className={styles.dia_tit}>
                        <span className="name">{v.treatmentName}</span>
                      </div>
                      {
                        v.stentInfos.length === 0 ? (
                          renderHospital(v.hospitalInfo)
                        ) : (
                          v.stentInfos.map((stent) => (
                            <div key={`${stent.location}`}>
                              <div className={styles.location_item}>
                                {renderHospital(stent.hospitalInfo)}
                                <span>{stent.location}</span>
                              </div>
                              {
                                stent.stentDataList.map((stentData) => (
                                  <div className={styles.info} key={stentData.stentName}>
                                    <span>{stentData.stentName}</span>
                                    <span>{stentData.stentSize}</span>
                                  </div>
                                ))
                              }
                            </div>
                          ))
                        )
                      }
                      <div className={styles.btn_wrap}>
                        <AddTreatment
                          type="edit"
                          refresh={fetchTreatments}
                          initData={v}
                        >
                          <span>编辑</span>
                        </AddTreatment>
                        <Popconfirm
                          placement="topLeft"
                          title="是否删除该诊断"
                          onConfirm={() => handleDelete(v.id)}
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
            </div>
          ) : (
            isTumour
            && (
              <TumourTreatItem
                key={item.category}
                data={item}
                index={index + 1}
                refresh={fetchTreatments}
              />
            )
          )
        ))
      }
      </ul>
    </div>
  );
}
export default TreatmentList;
