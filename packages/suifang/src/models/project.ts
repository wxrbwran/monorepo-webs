import { Reducer } from 'redux';
import { Effect } from 'dva';
import { patientManage } from '@/services/api';

export interface ProjectModelState {
  objectiveGroup: IGroup[];
}
interface ProjectModelType {
  namespace: 'project';
  state: ProjectModelState;
  effects: {
    fetchGroupList: Effect;
  };
  reducers: {
    setGroupList: Reducer<ProjectModelState>;
  };
}

export interface IGroup {
  groupId: string;
  groupName: string;
  projectSid: string;
}

export const projectState = {
  objectiveGroup: [],
};

const ProjectModel: ProjectModelType = {
  namespace: 'project',
  state: projectState,
  effects: {
    *fetchGroupList({ payload }, { call, put }) {
      const response = yield call(patientManage.getGroupList, payload);
      yield put({
        type: 'setGroupList',
        payload: response.infos,
      });
    },
  },
  reducers: {
    setGroupList(state = projectState, { payload }): ProjectModelState {
      return {
        ...state,
        objectiveGroup: payload,
      };
    },
  },
};

export default ProjectModel;
