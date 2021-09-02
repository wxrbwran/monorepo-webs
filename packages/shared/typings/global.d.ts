interface CommonData {
  [index: string]: any;
}

declare interface Iorg {
  organizationId: string;
  organizationName: string;
  role: string;
  roles: string[];
  status: string;
  consultationAcceptStatus?: string;
  consultationExpireTimeStatus?: string;
  depCategory?: string;
  departmentId?: string;
  departmentName?: string;
  orgRedPoint?: boolean;
  qrCodeUrl: string;
  unAcceptEndTime?: number;
}

declare interface Icert {
  imageIds: string[];
  type: string;
}

declare type StoreValue = any;
declare interface Store {
  [name: string]: StoreValue;
}

declare interface Window {
  NIM: Store; // SDK
  nim: Store; // NIM 实例
  readonly $dva: Store;
  readonly $store: Store;
  $api: Store;
  reloadAuthorized: Store;
  $storage: {
    setType: (key: 'localStorage' | 'sessionStorage') => any;
    init: () => any;
    getItem: (key: string) => string;
    setItem: (key: string, val: any) => void;
    removeItem: (key: string) => void;
    clear: () => void;
  };
  echarts: any;
}
interface INs {
  id?: string;
  name?: string;
  labels?: string[];
  superNsIds?: string[];
  status?: number;
}
interface IRsConfig {
  rscId: string;
  status: string;
  account: string;
  password: string;
}

interface IInterval {
  start?: number;
  end?: number;
}
interface IRole {
  id?: string;
  name?: string;
  labels?: string[];
  interval?: IInterval;
  rsConfig?: IRsConfig;
  subject?: ISubject;
}
interface Iwcl {
  wcId?: string;
  ns?: INs;
  roles?: IRole[];
}
declare interface IIndexObject {
  [k2: number]: any;
  [k1: string]: any;
}

declare interface IMedicines extends IIndexObject {
  pkgStrength?: string;
  strength?: string;
  unitStrength?: string;
}
declare interface IMedicinePlans {
  plans: {
    boxCellNos: number[];
    cycleDays: number[];
    range: {
      start: Date;
    };
    count: number;
    confirmAt: number;
    actions: {
      actionType: number
    }[];
  }[],
  medicine: {
    medicineType: number
  }
}
declare interface IPlansState {
  medicines: {
    currentMedicinePlans: IMedicinePlans[];
  }
}
declare interface IPatient {
  detail: {
    infos: object;
  };
}
interface IAdjustPlan {
  planId: string;
  status: string;
  takeTime: string[];
  originTakeTime: string[] | null;
  dosage: string;
  originDosage: string | null;
}
interface IAdjustMedicinePlan {
  medicine: {
    name: string;
    unit: number;
    medicineId: string;
    status: string;
  };
  plans: IAdjustPlan[];
}

interface IMedicalList {
  name: string;
  unit: string;
  customizedReferenceMax: number;
  customizedReferenceMin: number;
  originCustomizedReferenceMax: number;
  originCustomizedReferenceMin: number;
  action: string;
  abbreviation: string;
  spliceSymbol: string;
  unifiedReference: string;
  measuredAt: number;
  value: string;
  color: string;
}
interface IIssueMedicineList {
  role: string;
  note: string | undefined | null;
  allPlans: IAdjustMedicinePlan[];
}
interface IIssueMedicalList {
  role: string;
  note: string | undefined | null;
  medicalIndexList: IMedicalList[];
}
interface IIssueImageList {
  imageId: number;
  imageType: string;
  url: string;
}
interface IIssueBody {
  msg: string;
  content: {
    medicineList: IIssueMedicineList[];
    medicalList: IIssueMedicalList[];
    imageList: IIssueImageList[];
    remind: string;
    advice: string;
  };
}
interface IIssueList {
  type: number;
  updatedAt: number;
  createdAt: number;
  id: string;
  state: number;
  body: IIssueBody;
}

interface ISelectItem {
  var: string;
  operator: string;
  value: string;
}

interface IPager {
  pageSize: number;
  pageAt?: number;
  total: number;
  current?: number;
}

interface IOrgTeams {
  members: ISubject[];
  teamNSId: string;
}

interface IOrganizations {
  teams: IOrgTeams[];
  total: number;
}

interface ImWindowProps {
  type: number;
  netcallStatus: string;
  myNetcall: any;
}

interface IPerson {
  infos: IInfos[];
  sessionId: string;
}
interface IInfos {
  avatarUrl: string;
  name: string;
  nsId: string;
  role: string;
  sid: string;
  wcId: string;
}

type TPrice = {
  goodsCategory: string;
  goodsDurationType: string;
  price: number;
  canModify: boolean;
  doctorRole: string;
};

interface ICallbackFn {
  action: string;
  type: string;
  fn?: () => void;
}
