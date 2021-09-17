// State

declare interface AuthModelState {
  isLogin: boolean;
  uid: string;
}

declare interface OrgModelState {
  loginOrg: Store;
  currentOrg: {
    departmentInfoList: Department[];
    orgBase: {
      nsId: string;
      name: string;
      uuCode: string;
    };
  };
  infoByList: Store;
  currentDepRole: Store;
}

declare interface UserModelState {
  currentRole: string;
  isShowMsgHistory: boolean;
}
declare interface OrgMenuModelState {
  type: string;
  department: Department;
  group?: string;
}
declare interface SystemModelState {
  roleCount: Store[];
}
declare interface DepartmentTabModelState {
  tab: string;
  inner: string;
  info: Partial<User>;
}
declare interface IState {
  user: UserModelState;
  org: OrgModelState;
  auth: AuthModelState;
  org_menu: OrgMenuModelState;
  department_tab: DepartmentTabModelState;
  system: SystemModelState;
}
