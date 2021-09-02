// 初始化操作轨迹数据
export const formatOrginPlans = (data: IRecord[]) => {
  let actionArray: IPlansAction[] = [];
  data.forEach((item) => {
    let medicineItem: CommonData = {};
    // let planItem: CommonData = {};
    let plansArray: IPlanItem[] = [];
    item.plans.forEach((p) => {
      const planItem = {
        adjustCount: null,
        adjustCycleDays: null,
        adjustDate: null,
        dosage: item.medicine.dosage,
        dosageFormUnit: item.medicine.dosageFormUnit,
        originalCount: p.count / 1000,
        originalCycleDays: p.cycleDays,
        originalDate: p.range?.start,
        status: 'NONE',
      };
      plansArray = [...plansArray, planItem];
    });
    medicineItem = {
      ...medicineItem,
      id: item.medicine.medicineId,
      name: item.medicine.name,
      status: 'NONE',
      plans: [...plansArray],
    };
    actionArray = [...actionArray, medicineItem];
  });
  return [...actionArray];
};

export const verifyTimeAction = (
  idx:number, pdx: number, val: number, plansId: string,
  actionArray: IPlansAction[], allPlans: IRecord[],
) => {
  const resultArr:any = JSON.parse(JSON.stringify(actionArray));
  const currentPlanAction = resultArr[idx].plans[pdx];
  // const currentPlan = allPlans[idx].plans[pdx];
  if (plansId) {
    if (val === currentPlanAction.originalDate) {
      currentPlanAction.adjustDate = null;
      currentPlanAction.status = currentPlanAction.adjustCount ? 'EDIT' : 'NONE';
    } else {
      currentPlanAction.adjustDate = val;
      currentPlanAction.status = 'EDIT';
    }
  } else {
    currentPlanAction.adjustDate = val;
    currentPlanAction.originalDate = null;
    currentPlanAction.dosage = allPlans[idx].medicine.dosage;
    currentPlanAction.dosageFormUnit = allPlans[idx].medicine.dosageFormUnit;
  }
  return [...resultArr];
};

export const verifyCountAction = (
  idx:number, pdx: number, val: number, plansId: string,
  actionArray: IPlansAction[], allPlans: IRecord[],
) => {
  const resultArr:any = JSON.parse(JSON.stringify(actionArray));
  const currentPlanAction = resultArr[idx].plans[pdx];
  if (plansId) {
    if (val === currentPlanAction.originalCount) {
      currentPlanAction.adjustCount = null;
      currentPlanAction.status = currentPlanAction.adjustDate ? 'EDIT' : 'NONE';
    } else {
      currentPlanAction.adjustCount = val;
      currentPlanAction.status = 'EDIT';
    }
  } else {
    currentPlanAction.adjustCount = val;
    currentPlanAction.originalCount = null;
    currentPlanAction.dosage = allPlans[idx].medicine.dosage;
    currentPlanAction.dosageFormUnit = allPlans[idx].medicine.dosageFormUnit;
  }
  return [...resultArr];
};

export const removeIsDelPlans = (allPlans: IRecord[]) => {
  const filterDelMedicine = allPlans.filter((item) => item.status !== 'DELETE');
  let newPlans: IRecord[] = [];
  filterDelMedicine.forEach((m) => {
    let planItemObj = {};
    const filterDelPlan = m.plans.filter((p) => p.status !== 'DELETE');
    planItemObj = {
      ...m,
      plans: [...filterDelPlan],
    };
    newPlans = [...newPlans, planItemObj];
  });
  return [...newPlans];
};

export const formatIMPlansMsg = (actionArray: IPlansAction[], allPlans: IRecord) => {
  let content = {};
  let addMedicineList: IPlansAction[] = [];
  let adjustMedicineList: IPlansAction[] = [];
  let delMedicineList: IPlansAction[] = [];
  actionArray.forEach((item) => {
    if (item.status === 'ADD') {
      addMedicineList = [...addMedicineList, item];
    } else if (item.status === 'DELETE') {
      delMedicineList = [...delMedicineList, item];
    } else if (item.status === 'NONE') {
      // if (item.plans.some((e) => e.status !== 'NONE')) {
      //   adjustMedicineList = [...adjustMedicineList, item];
      // }
      let filterEditRecod = {};
      const editRecord = item.plans.filter((p) => p.status !== 'NONE');
      if (editRecord.length > 0) {
        filterEditRecod = {
          ...item,
          plans: [...editRecord],
        };
        adjustMedicineList = [...adjustMedicineList, filterEditRecod];
      }
    }
  });
  content = {
    addMedicineList: [...addMedicineList],
    adjustMedicineList: [...adjustMedicineList],
    delMedicineList: [...delMedicineList],
    plans: [...removeIsDelPlans(allPlans)],
    type: 106,
  };
  return { ...content };
};

/** 数据去重 */
export const unique = (arr: IMedicines[]) => {
  const res = new Map();
  return arr.filter((item) => !res.has(item.medicineId) && res.set(item.medicineId, 1));
};

export const checkCombinePlans = (plans: IRecord[]) => {
  const combinedPlans = JSON.parse(JSON.stringify(plans));
  const data:CommonData = {
    status: true,
    message: '通过验证',
  };
  const { length } = combinedPlans;
  const uniqueMedicine = new Set();
  combinedPlans.forEach((plan) => uniqueMedicine.add(plan.medicine.medicineId));
  if (uniqueMedicine.size < length) {
    data.status = false;
    data.message = '药品重复';
    return data;
  }
  for (let i = 0; i < length; i++) {
    const plan = combinedPlans[i].plans;
    // if (!combinedPlans[i].medicine.dosage) {
    //   data.status = false;
    //   data.message = `药品“${combinedPlans[i].medicine.name}”无剂量等信息，无法添加`;
    //   return data;
    // }
    for (let j = 0; j < plan.length; j++) {
      if (!plan[j].count || !plan[j].range) {
        data.status = false;
        data.message = '请完善调药信息';
        return data;
      }
    }
  }
  return data;
};
