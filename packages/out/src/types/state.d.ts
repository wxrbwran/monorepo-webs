// State

interface Action<T = any> {
  type: T;
}

/**
 * An Action type which accepts any other properties.
 * This is mainly for the use of the `Reducer` type.
 * This is not part of `Action` itself to prevent types that extend `Action` from
 * having an index signature.
 */
interface AnyAction extends Action {
  // Allows any extra properties to be defined in an action.
  [extraProps: string]: any;
}

type Reducer<S = any, A extends Action<any> = AnyAction> = (state: S, action: A) => S;
declare interface AuthModelState {
  isLogin: boolean;
  uid: string;
  wcl: Iwcl;
}

declare interface OrgModelState {
  loginOrg: Store;
  currentOrg: {
    departmentInfoList: Department[];
    pureDepartmentList: Department[];
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
  wcl: Iwcl[];
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
  education: EduModelState;
  suifang: SuifangModelState;
}
declare interface EduModelState {
  richText: {
    content: {
      cover: string;
      filename: string;
      text: {
        ops: []
      }
    },
    id: string;
  };
  sendList: []
}
interface IQuestions {
  type: string;
  code?: number;
  detail: {
    checkedArr?: string[] | string; // 多选题，h5填写完返回的是string[]。单选题，h5返回的是string
    stem: string | string[];
    options: Ioptions[];
    answer?: string | string[];
  }
}
declare interface SuifangModelState {
  id?: string;
  subTitle?: string;
  title?: string;
  question?: IQuestions[]
}
