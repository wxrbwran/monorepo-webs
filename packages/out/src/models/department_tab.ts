export interface DepartmentTabModelType {
  namespace: 'department_tab';
  state: Partial<DepartmentTabModelState>;
  reducers: {
    changeTab: Reducer<DepartmentTabModelState>;
    changeUserInfo: Reducer<DepartmentTabModelState>;
  };
}

export const DepartmentTabState = {
  tab: 'doctor',
  inner: 'list',
  info: {},
};

const OrgModel: DepartmentTabModelType = {
  namespace: 'department_tab',
  state: DepartmentTabState,
  reducers: {
    changeTab(state, action) {
      return {
        ...state,
        ...action.payload,
      };
    },
    changeUserInfo(state, action) {
      return {
        ...state,
        info: action.payload,
      };
    },
  },
};

export default OrgModel;
