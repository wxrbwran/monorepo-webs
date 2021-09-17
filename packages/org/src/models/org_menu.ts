import { Reducer } from 'umi';

export interface OrgMenuModelType {
  namespace: 'org_menu';
  state: Partial<OrgMenuModelState>;
  reducers: {
    changeOrgMenu: Reducer<OrgMenuModelState>;
  };
}

export const OrgMenuState = {
  type: 'org',
  department: {
    id: '',
    name: '',
    status: '',
  },
  group: '',
};

const OrgModel: OrgMenuModelType = {
  namespace: 'org_menu',
  state: OrgMenuState,
  reducers: {
    changeOrgMenu(state, action) {
      return {
        ...state,
        ...action.payload,
      };
    },
  },
};

export default OrgModel;
