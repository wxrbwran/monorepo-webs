import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'umi';
import { PlusOutlined } from '@ant-design/icons';
import { message, Popover } from 'antd';
import DragModal from 'xzl-web-shared/dist/src/components/DragModal';
import Viewer from '@/components/Viewer';
import { btnRender } from '@/components/BtnRender';
import { unitFlag, unitFlagRe } from '@/utils/tools';
import * as api from '@/services/api';
import { initActionRecord, initRecord, initPlanAction } from '../consts';
import {
  formatOrginPlans,
  formatIMPlansMsg,
  removeIsDelPlans,
  checkCombinePlans,
} from '../formatData';
import MedicinePlans from '../MedicinePlans';
import MedicineSelector from '../MedicineSelector';
import styles from './index.scss';

interface IProps {
  children: React.ReactElement;
}

function PlansModal({ children }: IProps) {
  const dispatch = useDispatch();
  const currentMedicinePlans = useSelector(
    (state: IPlansState) => state.medicines.currentMedicinePlans,
  );
  const [showModal, setShowModal] = useState(false);
  const [newPlans, setNewPlans] = useState<IRecord[]>([]); // 更改的值
  const [allPlans, setAllPlans] = useState<IRecord[]>([]); // 原始值
  const [delPlans, setDelPlans] = useState<IDelRecord[]>([]); // 要删除的值
  const [plansAction, setPlansAction] = useState<IPlansAction[]>([]); // 服药计划操作轨迹
  const [strengthInfo, setStrengthInfo] = useState<IStrengthInfo[]>([]); // 药品规格相关信息
  const [loading, setLoading] = useState(false);
  const [imgVisible, setImgVisible] = useState(false);
  const [unknowImg, setUnknowImg] = useState<string[]>([]);
  const patientWcId = window.$storage.getItem('patientWcId');
  const patientSid = window.$storage.getItem('patientSid');

  useEffect(() => {
    setAllPlans(currentMedicinePlans);
    setNewPlans(JSON.parse(JSON.stringify(currentMedicinePlans)));
  }, [currentMedicinePlans]);

  useEffect(() => {
    console.log('plansAction', [...plansAction]);
  }, [plansAction]);

  useEffect(() => {
    if (showModal) {
      setNewPlans([...allPlans]);
      setStrengthInfo([]);
      setDelPlans([]);
      // 将接口返回的数据初始化为IM UI渲染所需格式
      const initData = formatOrginPlans(currentMedicinePlans);
      setPlansAction(JSON.parse(JSON.stringify(initData)));
    }
  }, [showModal]);

  // 获取服药计划
  const fetchAllPlans = () => {
    const params = {
      sid: patientSid,
      timeRange: {
        start: +new Date(),
        end: null,
      },
      isContainsCurrent: true,
      aggregationType: 0,
    };
    dispatch({
      type: 'medicines/fetchMedicineDetail',
      payload: params,
    });
  };

  // 添加新药
  const addMedicine = () => {
    setNewPlans([...newPlans, JSON.parse(JSON.stringify(initRecord))]);
    setPlansAction([...plansAction, JSON.parse(JSON.stringify(initActionRecord))]);
  };
  // 选药品->单位规格、规格、包装规格
  const setMedicineInfo = (infos: IMedicineInfo, idx: number) => {
    console.log('infos', infos);
    const {
      medicineType,
      id,
      genericName,
      commodityName,
      constitute,
      dosage,
      dosageUnitFlag,
      dosageFormUnit,
      category,
      company,
    } = infos;
    newPlans[idx].medicine = {
      medicineType: 1, // ?
      medicineId: id, // medicineId控制的inputNumber的disabled
      name: genericName, // 药品名
      commodity: commodityName, // 厂家名
      company, // 公司名
      ingredient: constitute, // 成分
      dosage, // 12500 有些药品药库未录入剂量
      dosageUnitFlag: unitFlag[dosageUnitFlag] || 5, // 'mg'
      dosageFormUnit, // 个
      category, // 降压药
    };
    console.log('medicineType', medicineType);
    newPlans[idx].plans = [{ boxCellNos: [0], cycleDays: [1] }];
    setNewPlans([...newPlans]);
    plansAction[idx].id = id;
    plansAction[idx].name = genericName;
    plansAction[idx].plans = [{ ...initPlanAction }];
    setPlansAction([...plansAction]);
  };
  // 更新药品单位规格、规格、包装规格相关信息
  const updateStrengthInfo = (infos: IStrengthInfo, idx: number) => {
    strengthInfo[idx] = { ...infos };
    setStrengthInfo([...strengthInfo]);
  };
  // 提交服药计划
  const onFinish = async () => {
    setLoading(true);
    try {
      const data = checkCombinePlans(removeIsDelPlans(newPlans));
      if (data.status) {
        const delParams = {
          sid: patientSid,
          wcId: patientWcId,
          allPlans: delPlans,
        };
        await api.medicine.delPlans(delParams);
        const plansparams = {
          sid: patientSid,
          wcId: patientWcId,
          operatorRole: window.$storage.getItem('role'),
          allPlans: removeIsDelPlans(newPlans),
        };
        await api.medicine.updatePlans(plansparams);
        message.success('操作成功');
        fetchAllPlans();
        setShowModal(false);
        setLoading(false);
        const { addMedicineList, adjustMedicineList, delMedicineList } = formatIMPlansMsg(
          [...plansAction],
          newPlans,
        );
        if (
          addMedicineList.length !== 0
          || adjustMedicineList.length !== 0
          || delMedicineList.length !== 0
        ) {
          const imParams = {
            operatorWcId: window.$storage.getItem('fromWcId'),
            // toWcIds: [window.$storage.getItem('patientWcId')],
            msgTypes: [106],
            content: JSON.stringify(formatIMPlansMsg([...plansAction], newPlans)),
            associateWcId: patientWcId,
            associateSId: patientSid,
            nsessionId: window.$storage.getItem('toSessionId'),
          };
          await api.im.sendMsg(imParams);
        }
      } else {
        message.error(data.message);
        setLoading(false);
      }
    } catch (e) {
      message.error(e);
      setLoading(false);
    }
  };
  const changeUnknowImg = (imageUrl: string[]) => {
    setImgVisible(true);
    setUnknowImg([...imageUrl]);
  };
  const hasMedicineName = (lItem: IRecord) => (lItem.medicine.medicineType === 2 ? (
    <div className={`${styles.name} flex`}>
      <span>{lItem.medicine.name}</span>
      <div className={styles.drugimg_bg} onClick={() => changeUnknowImg(lItem.medicine.imageUrl)}>
        <div className={styles.drugimg_c} />
        <img alt="" src={lItem.medicine.imageUrl[0]} className={styles.drug_img} />
      </div>
    </div>
  ) : (
    <div className={styles.name}>
      <p>{lItem.medicine.name}</p>
      <Popover placement="bottomLeft" title={null} content={<p>{lItem.medicine.company}</p>}>
        <p>{lItem.medicine.company}</p>
      </Popover>
      {!!lItem.medicine.dosage && (
      <p>
        {`${lItem.medicine.dosage / 1000 + unitFlagRe[lItem.medicine.dosageUnitFlag]}/${
          lItem.medicine.dosageFormUnit
        }`}
      </p>
      )}
    </div>
  ));
  console.log('newPlans', newPlans);
  return (
    <>
      <div style={{ display: 'inline' }} onClick={() => setShowModal(!showModal)}>
        {children}
      </div>
      <DragModal
        wrapClassName="ant-modal-wrap-center plan_modal"
        width={1177}
        visible={showModal}
        title="帮患者修改服药计划"
        onCancel={() => setShowModal(false)}
        footer={null}
        className={styles.plan_modal}
        destroyOnClose
      >
        <ul>
          <li className={styles.head}>
            <span className={styles.name}>药名</span>
            <span className={styles.frequency} />
            <span className={styles.code}>仓号</span>
            <span className={styles.instructions}>说明书</span>
            <span className={styles.time}>用药时间</span>
            <span className={styles.count}>单位数</span>
            <span className={styles.dosage}>剂量</span>
          </li>
          {newPlans.map((lItem, idx) => {
            const mIndex = idx;
            const boxCellNos = lItem.plans[0]?.boxCellNos[0];
            return (
              lItem?.status !== 'DELETE' && (
                <li
                  className={`${styles.sub_list} ${boxCellNos ? styles.inbox : ''}`}
                  key={`${lItem.medicine.medicineId}${mIndex}`}
                >
                  {lItem.plans[0]?.planId ? (
                    hasMedicineName(lItem)
                  ) : (
                    <MedicineSelector
                      setMedicineInfo={(infos: IMedicineInfo) => setMedicineInfo(infos, idx)}
                      lItem={lItem}
                      strengthInfo={strengthInfo[idx]}
                      updateStrengthInfo={(infos: IStrengthInfo) => updateStrengthInfo(infos, idx)}
                    />
                  )}
                  <MedicinePlans
                    allPlans={newPlans}
                    plansItem={lItem}
                    plansIndex={idx}
                    plansAction={plansAction}
                    updateAllPlans={(updatePlans: IRecord[], actions?: []) => {
                      setNewPlans([...updatePlans]);
                      if (actions) {
                        setPlansAction([...actions]);
                      }
                    }}
                    updateDelPlans={(record: object) => {
                      setDelPlans([...delPlans, record]);
                      console.log('unique', [...delPlans, record]);
                    }}
                    updateStrengthInfo={() => {
                      const newStrengthInfo = strengthInfo.filter(
                        (_item, index: number) => index !== idx,
                      );
                      setStrengthInfo([...newStrengthInfo]);
                    }}
                  />
                </li>
              )
            );
          })}
          <div className={styles.add_medicine} onClick={addMedicine}>
            <PlusOutlined />
            {' '}
            添加新药
          </div>
          <div>
            {btnRender({
              okText: '确定',
              loading,
              onOk: () => onFinish(),
              onCancel: () => setShowModal(false),
            })}
          </div>
        </ul>
      </DragModal>
      <Viewer
        activeIndex={0}
        visible={imgVisible}
        onClose={() => setImgVisible(false)}
        images={unknowImg.map((url) => ({
          src: url,
        }))}
      />
    </>
  );
}

export default PlansModal;
