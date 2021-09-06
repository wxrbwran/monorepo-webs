declare interface ModalProps {
  title?: string;
  extra?: React.ReactElement;
}

declare interface Org {
  id: string;
  sid: string;
  showId: string;
  name: string;
  logoUrl: string;
  introduction: string;
  address: string;
  canBirth: boolean;
  status: string;
  pictureUrl: string;
  qrcodeUrl: string;
  internetHospitalUrl: string;
  organizationCode: string;
  organizationInstitutionCode: string;
  isInternet: string;
  level: string;
  grade: string;
  legalPerson: string;
  orgType: string;
  province: number | null;
  city: number | null;
  town: number | null;
  area: string;
}

declare interface Department {
  id: string;
  name: string;
  labels: string;
  status: number;
}
declare interface Cert {
  imageIds: string[];
  type: string;
}
declare interface User {
  id?: string;
  sid: string;
  username: string;
  roles: string[];
  tel: string;
  avatar?: string | null;
  bank?: string;
  bankCardNumber?: number;
  biography?: string;
  certificates?: Cert[];
  consultationAcceptStatus?: string;
  departmentCategory?: string;
  departmentName?: string;
  doctorAttribute?: string;
  doctorGroup?: null;
  experience?: string;
  expertise?: string;
  firstProfessionCompany?: string;
  firstProfessionCompanyLevel?: string;
  goodsDescriptions?: null;
  hospitalIntroduction?: string;
  idNumber?: string;
  inviteStatus?: string;
  inviterName?: string;
  inviterTel?: string;
  meetingLecture?: string;
  name?: string | null;
  organizationId?: string;
  qrCodeUrl?: string;
  sex?: string;
  showId?: number;
  status: number;
  title?: string;
  unAcceptEndTime?: number;
  workOrderAcceptStatus?: string;
}

declare interface Operator extends Partial<User> {
  relationId: string | null;
  workload: number | null;
  monthWorkload: number | null;
  lastMonthWorkload: number | null;
  department: Partial<Department>[];
  adminDepartment: Partial<Department>[];
  role: string;
}

declare interface Team {
  name: string;
  count: number;
}
declare interface MenuOrg {
  institution: Partial<Org>;
  departmentInfoList: Array<Department>;
  children: Array<Partial<Org>>;
  operatorTeam: Team;
  organizationUpperTeam: Team;
  organizationLowerTeam: Team;
  adviserTeam?: Team;
}

declare interface Window {
  $api: Store;
  $table_current: number;
  $storage: {
    setType: (key: 'localStorage' | 'sessionStorage') => any;
    init: () => any;
    getItem: (key: string) => string;
    setItem: (key: string, val: any) => void;
    removeItem: (key: string) => void;
    clear: () => void;
  };
}
interface CommonData {
  [index: string]: any;
}
interface ISideMenuItem {
  name: string;
  id: string;
}

declare interface ILocation {
  location: {
    pathname: string;
    hash: string;
    query: {
      [key: string]: string | number;
    };
    search: string;
  }
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
  roles?: IRole[]
}
