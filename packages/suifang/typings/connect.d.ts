import { AnyAction, Dispatch } from 'redux';
import { RouterTypes } from 'umi';
import { ProjectModelState } from '@/models/project';
import { NavBarState } from '@/models/navBar';

export interface Loading {
  global: boolean;
  effects: { [key: string]: boolean | undefined };
  models: {
    global?: boolean;
    menu?: boolean;
    setting?: boolean;
    user?: boolean;
    login?: boolean;
  };
}

export interface ConnectState {
  project: ProjectModelState;
  navBar: NavBarState;
}

export interface Route {
  routes?: Route[];
}

/**
 * @type T: Params matched in dynamic routing
 */
export interface ConnectProps<T = {}> extends Partial<RouterTypes<Route, T>> {
  dispatch?: Dispatch<AnyAction>;
}
