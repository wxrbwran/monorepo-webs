import { Reducer } from 'redux';

export interface OrgModelState {
  orgList: any;
}

export interface OrgModelType {
  namespace: string;
  state: OrgModelState;
  reducers: {
    setOrgList: Reducer<OrgModelState>;
  };
}

export const orgState = {
  orgList: [],
};

const Model: OrgModelType = {
  namespace: 'org',
  state: orgState,

  reducers: {
    setOrgList(state = orgState, { payload }) {
      console.log('payload', payload);
      return {
        ...state,
        orgList: [...payload],
      };
    },
  },
};

export default Model;
