interface IRecord {
  status?: string;
  medicine: {
    dosage: number;
    medicineType: number;
    medicineId: string;
    name: string;
    commodity: string;
    company: string;
    ingredient: string;
    dosageUnitFlag: number;
    dosageFormUnit: string;
    category: string;
    imageUrl: string[];
  };
  medicineSource: number;
  plans: {
    planId?:string;
    cycleDays: number[];
    range?: {
      start: number;
      end: number;
    };
    count?: number;
    boxCellNos: number[];
    opsRecord?: object;
    confirmAt?: number;
    status?: string;
    deletedAt?: number;
  }[];
}
interface IMedicineInfo {
  medicineType: number;
  id: string;
  genericName: string;
  commodityName: string;
  constitute: string;
  dosage: number;
  dosageUnitFlag: number;
  dosageFormUnit: string;
  category: string;
  company: string;
}
interface IStrengthInfo {
  initNN: [],
  keyIndex: number,
  initRendersComps: [],
}
interface IPlanItem {
  adjustCount: Store
  adjustCycleDays: Store
  adjustDate: Store
  dosage: Store
  dosageFormUnit: string
  originalCount: Store
  originalCycleDays: Store
  originalDate: Store
  status: string
}
interface IPlansAction {
  id: string;
  name: string;
  status: string;
  plans: IPlanItem[]
}
interface IDelRecord {
  medicine: {
    medicineId: string;
  }
}
