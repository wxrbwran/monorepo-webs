import { Reducer } from 'redux';

export interface NavBarState {
  activeTab: string;
}

export interface NavBarType {
  namespace: 'navBar';
  state: NavBarState;
  reducers: {
    setActiveTab: Reducer<NavBarState>;
  };
}

const navBarModel: NavBarType = {
  namespace: 'navBar',

  state: {
    activeTab: 'proj_detail',
  },

  reducers: {
    setActiveTab(state, action) {
      return {
        ...state,
        ...action.payload,
      };
    },
  },
};

export default navBarModel;
