import type { Reducer } from 'umi';
// 参加院外管理的科室
export interface OrgMenuModelType {
  namespace: 'org_menu';
  state: Partial<OrgMenuModelState>;
  reducers: {
    changeOrgMenu: Reducer<OrgMenuModelState>;
  };
}

export const OrgMenuState = {
  type: 'org',
  department: { // 参加院外管理的科室-左侧选中的科室信息
    id: '',
    name: '',
    status: '',
  },
  labels: '',
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
