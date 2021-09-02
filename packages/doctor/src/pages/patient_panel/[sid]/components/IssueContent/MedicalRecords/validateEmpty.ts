export const validateMedical = (medicalList: IMedicalList[] | undefined) => {
  let flag = false;
  if (medicalList) {
    for (let i = 0; i < medicalList.length; i++) {
      if (medicalList[i].action !== 'NONE') {
        flag = true;
        break;
      }
    }
    return flag;
  }
  return flag;
};

export const validateMedicine = (medicineList: IAdjustMedicinePlan[] | undefined) => {
  let flag = false;
  if (medicineList) {
    medicineList.forEach((item: IAdjustMedicinePlan) => {
      if (item.medicine.status !== 'NONE') {
        flag = true;
      } else {
        item.plans.forEach((iPlan: IAdjustPlan) => {
          if (iPlan.status !== 'NONE') {
            flag = true;
          }
        });
      }
    });
    return flag;
  }
  return flag;
};
