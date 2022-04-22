// State
interface Action<T = any> {
  type: T;
}
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

declare interface UserModelState {
  wcl: Iwcl[];
}
declare interface PersonnelModelState {
  roleList: {
    name: string;
    id: string;
  }[]
}
declare interface IState {
  user: UserModelState;
  auth: AuthModelState;
  personnel: PersonnelModelState;
}

