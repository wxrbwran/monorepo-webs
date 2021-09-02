import { message } from 'antd';
import dayjs from 'dayjs';
// 整合药品的服药计划
// 初始数据是一个剂量对应一个时间段。调整用药这里是，一个剂量如果存在多个时间段，
// 那就是一对多来展示。这里需要整合一下,如果剂量相同，则直接在此条数据，追加一个时间即可
// 原数据格式（药的详情数据这里没复制，只展示的药的plans
// {
//   "plans": [
//       {
//           "planId": "dev.Y0Z2w0",
//           "count": 1375,
//           "range": {"start": 1604779200000,"end": 1604781000000},
//           "cycleDays": [1],
//           "boxCellNos": [0]
//       },
//       {
//           "planId": "dev.6e8ZXW",
//           "count": 250,
//           "range": {"start": 1604764800000,"end": 1604766600000},
//           "cycleDays": [1],
//           "boxCellNos": [0]
//       },
//       {
//           "planId": "dev.m4vD10",
//           "count": 250,
//           "range": {"start": 1604892600000,"end": 1604894400000},
//           "cycleDays": [2],
//           "boxCellNos": [0]
//       }
//   ]
// }
// 整合后数据格式
// {
//   "plans": [
//       {
//           "planId": "dev.Y0Z2w0",
//           "dosage": 1.38,
//           "takeTime": [1604779200000],
//       },
//       {
//           "planId": "dev.6e8ZXW",
//           "dosage": 0.25,
//           "takeTime": [1604764800000,1604892600000]
//       }
//   ]
// }
const formatMedicineTime = (medicines: IMedicinePlan[]) => {
  const newMedicines: CommonData[] = [];
  medicines.forEach((item: IMedicinePlan) => {
    const newItem: CommonData = { medicine: item.medicine, plans: [] };
    const planCounts: number[] = [];
    item.plans.forEach((plan: CommonData) => {
      const { count, range, planId } = plan;
      const targetIndex = planCounts.indexOf(count);
      const fromatTime = dayjs(range.start).format('HH:mm');
      if (targetIndex > -1) {
        newItem.plans[targetIndex].takeTime.push(fromatTime);
      } else {
        newItem.plans.push({
          takeTime: [fromatTime],
          dosage: Math.round((Number(count) / 1000) * 100) / 100,
          planId,
        });
      }
      planCounts.push(count);
    });
    newMedicines.push(newItem);
  });
  // console.log('newMedicines', newMedicines);
  return newMedicines;
};

export const getInitMedicines = (medicinePlansData: IMedicinePlan[]) => {
  const medicinePlans = formatMedicineTime(medicinePlansData);
  const medicineQueue: number[] = []; // 所有药的队列
  const planQueue: number[][] = []; // 所有药的【计划】队列-》每个药有几个服药计划
  let initFormVal: CommonData = {};
  // medicineType等于2的为未知药品，未知药品在调整用药里直接过滤掉不显示
  medicinePlans.filter((medItem) => medItem.medicine.medicineType !== 2)
    .forEach((item, parentInx) => {
      medicineQueue.push(parentInx);
      initFormVal = {
        ...initFormVal,
        [`name_${parentInx}`]: item.medicine.name,
        [`medicineId_${parentInx}`]: item.medicine.medicineId,
        [`unit_${parentInx}`]: item.medicine.dosageUnitFlag,
        [`status_${parentInx}`]: 'NONE',
        [`medicineType_${parentInx}`]: item.medicine.medicineType,
      };
      item.plans.forEach((plan: IAdjustPlan, index: number) => {
        const { dosage, takeTime } = plan;
        if (index === 0) {
          planQueue[parentInx] = [0];
        } else {
          planQueue[parentInx].push(index);
        }
        initFormVal[`plan_${parentInx}_${index}`] = {
          dosage: item.medicine.dosage
            ? Number(((item.medicine.dosage * dosage) / 1000).toFixed(2))
            : dosage, // 正常情况 有药品规格然后乘计划剂量。特殊药品当没有药品规格时，按乘1也就是只按计划剂量显示
          takeTime,
          originDosage: null,
          originTakeTime: null,
          status: 'NONE',
        };
      });
    });
  // console.log('initFormValinitFormVal', initFormVal);
  // console.log('planQueue', planQueue);
  // console.log('medicineQueue', medicineQueue);
  return {
    initFormVal,
    planQueue,
    medicineQueue,
  };
};

// 整合单个药品的服药计划
const getPlans = (data: CommonData, parentInx: number) => {
  const dosageList: number[] = [];
  const plans: IAdjustPlan[] = [];
  const planKeyList = Object.keys(data).filter((itemKey: string) => itemKey.startsWith(`plan_${parentInx}_`));
  let isPass = true;
  let errorText = '';
  for (let i = 0; i < planKeyList.length; i++) {
    const key = planKeyList[i];
    const { dosage, takeTime } = data[key];
    if (dosageList.includes(dosage)) {
      errorText = '同一药品存在相同剂量';
      isPass = false;
      break;
    } else if (!dosage && !takeTime) {
      errorText = '请填写新增条目';
      isPass = false;
      break;
    } else if (!dosage || !takeTime) {
      errorText = '请完善调药信息';
      isPass = false;
      break;
    } else {
      plans.push(data[key]);
      dosageList.push(dosage);
    }
  }
  if (!isPass) { message.destroy(); message.error(errorText); }
  return isPass ? plans : false;
};
// 修改完后点击确定
export const formatSubmitData = (data: CommonData, queue: number[]) => {
  const medicineId: string[] = [];
  const medicineList: IAdjustMedicinePlan[] = [];
  let isPass = true;
  queue.forEach((v) => {
    const curName = data[`name_${v}`];
    const curMedicineId = data[`medicineId_${v}`];
    console.log('333id', data[`medicineId_${v}`]);
    if (curName && !medicineId.includes(curMedicineId)) {
      medicineId.push(curMedicineId);
      const curPlans = getPlans(data, v);
      if (curPlans) {
        medicineList.push({
          medicine: {
            medicineId: data[`medicineId_${v}`],
            name: curName,
            unit: data[`unit_${v}`],
            status: data[`status_${v}`],
          },
          plans: curPlans,
        });
      } else {
        isPass = false;
      }
    } else if (curMedicineId) {
      message.error('药品重复');
      isPass = false; // 存在同名药品
    } else {
      // 空数据，忽略不管
    }
  });
  console.log('medicineList', medicineList);
  return isPass ? medicineList : false;
};

export const handleIsEdit = (showPlans: IAdjustMedicinePlan[]) => {
  // console.log('showPlans', showPlans);
  let isEdit = false;
  const { length } = showPlans;
  for (let i = 0; i < length; i++) {
    const leng = showPlans[i].plans.length;
    for (let j = 0; j < leng; j++) {
      if (showPlans[i].plans[j].status !== 'NONE') {
        isEdit = true;
        break;
      }
    }
  }
  return isEdit;
};
