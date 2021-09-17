import React, { useEffect } from 'react';
import { Popover } from 'antd';
import { useDispatch, useSelector } from 'umi';
import moment from 'moment';
import { unitFlagRe } from '@/utils/tools';
import styles from './index.scss';

interface IFormatPlansItem {
  medicine: {
    dosage: number;
    name: string;
    dosageUnitFlag: number;
    medicineId: string;
    commodity: string;
  };
  plans: IIndex;
}
interface IPlansItem {
  medicine: object;
  plans: {
    range: {
      start: number;
    };
    count: number;
    confirmAt: number;
    boxCellNos: number[];
  }[];
}
interface IIndex {
  [k: number]: any;
}

function PlansDetail() {
  const dispatch = useDispatch();
  const currentMedicinePlans = useSelector(
    (state: IPlansState) => state.medicines.currentMedicinePlans,
  );
  const id = window.$storage.getItem('patientSid');
  // 格式化服药记录数据
  const formatAllPlans = (value: []) => {
    let newAllPlans: IFormatPlansItem[] = [];
    value.forEach((item: IPlansItem) => {
      const allPlansItem: any = {};
      allPlansItem.medicine = item.medicine;
      const newObj: IIndex = {};
      item.plans.forEach((v) => {
        if (newObj[v.count]) {
          newObj[v.count] = [
            ...newObj[v.count],
            {
              start: v.range.start,
              confirmAt: v.confirmAt,
              boxCellNos: v.boxCellNos,
            },
          ];
        } else {
          newObj[v.count] = [
            {
              start: v.range.start,
              confirmAt: v.confirmAt,
              boxCellNos: v.boxCellNos,
            },
          ];
        }
      });
      allPlansItem.plans = newObj;
      newAllPlans = [...newAllPlans, allPlansItem];
    });
    return newAllPlans;
  };
  // 获取服药计划
  const fetchAllPlans = () => {
    const params = JSON.stringify({
      // sid: 'dev.aeJ9z4',
      sid: id,
      timeRange: {
        start: +new Date(),
        end: null,
      },
      isContainsCurrent: true,
      aggregationType: 0,
    });
    // api.medicine.getPlans(Base64.encode(params)).then((res) => {
    // 	const newAllPlans = formatAllPlans(res.allPlans);
    // 	setAllPlans(newAllPlans);
    // })
    // 	.catch((err) => {
    // 		message.error(err);
    // 	});
    dispatch({
      type: 'medicines/fetchMedicineDetail',
      payload: params,
    });
  };

  useEffect(() => {
    fetchAllPlans();
  }, []);

  const allPlans = formatAllPlans(currentMedicinePlans);
  return (
    <div className={styles.mp_content}>
      {
        allPlans.length > 0 ? (
          <ul className={styles.list_head}>
            <li className={styles.list_index} />
            <li className={styles.list_name}>药名</li>
            <li className={styles.list_value}>剂量</li>
            <li className={styles.list_time}>时间</li>
          </ul>
        ) : '暂无患者用药信息'
      }
      {
        allPlans.length > 0 && (
          <ul className={styles.list_outer}>
            {allPlans.map((rItem: IFormatPlansItem, idx) => {
              const boxCellNos = currentMedicinePlans[idx].plans[0]?.boxCellNos[0];
              return (
                <li key={rItem.medicine.medicineId} className={styles.item}>
                  <span className={styles.list_index}>
                    {boxCellNos ? `${boxCellNos}号仓` : '仓外'}
                  </span>
                  <div className={styles.list_name}>
                    <Popover
                      placement="bottomLeft"
                      title={null}
                      content={(
                        <div>
                          <p>
                            化学名：
                            {rItem.medicine.name}
                          </p>
                          <p>
                            商品名：
                            {rItem.medicine.commodity}
                          </p>
                          <p>
                            单位规格：
                            {rItem.medicine.dosage ? `${rItem.medicine.dosage / 1000}${unitFlagRe[rItem.medicine.dosageUnitFlag]}` : '--'}
                          </p>
                        </div>
                      )}
                    >
                      {rItem.medicine.name}
                    </Popover>
                  </div>
                  <div className={styles.list_plan}>
                    {Object.keys(rItem.plans).map((pItem) => {
                      const dosage = rItem.medicine?.dosage / 1000;
                      return (
                        <div key={pItem} className={styles.plan_item}>
                          <p className={styles.list_value}>
                            {
                              // eslint-disable-next-line no-nested-ternary
                              Number(pItem) && dosage
                                ? rItem.medicine.dosageUnitFlag
                                  ? `${Math.round((Number(pItem) / 1000) * dosage * 100) / 100}${unitFlagRe[rItem.medicine.dosageUnitFlag]}`
                                  : `${Math.round((Number(pItem) / 1000) * dosage * 100) / 100}`
                                : '/'
                            }
                          </p>
                          <p className={styles.list_time}>
                            {rItem.plans[Number(pItem)].map(
                              (v: { start: number; confirmAt: number }) => (
                                <span key={v.start} className={styles.time}>
                                  {moment(v.start).format('H:mm')}
                                </span>
                              ),
                            )}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </li>
              );
            })}
          </ul>
        )
      }
    </div>
  );
}

export default PlansDetail;
