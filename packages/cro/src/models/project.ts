import { Reducer } from 'redux';
import { Effect } from 'dva';
import project from '@/services/api/project';
import detail from '@/services/api/detail';
import { IPlanInfos } from '@/utils/consts';
import { patientManage, subjective } from '@/services/api';
import { Role } from 'xzl-web-shared/src/utils/role';
import { getChooseValuesKeyFromRules } from '../pages/subjective_table/util';

export interface ProjectModelState {
  projectList: IProjectList[];
  objectiveScaleList: IPlanInfos[];
  reverData: object;
  objectiveGroup: IGroup[];
  formName: string;
  projDetail: any;
  scaleGroupInfos: any;
}
interface ProjectModelType {
  namespace: 'project';
  state: ProjectModelState;
  effects: {
    fetchProjectList: Effect;
    fetchObjectiveScale: Effect;
    fetchGroupList: Effect;
    fetchProjectDetail: Effect;
    fetchScaleGroup: Effect;
  };
  reducers: {
    saveProjectList: Reducer<ProjectModelState>;
    saveObjectiveScale: Reducer<ProjectModelState>;
    setReverData: Reducer<ProjectModelState>;
    clearReverData: Reducer<ProjectModelState>;
    setGroupList: Reducer<ProjectModelState>;
    setProjectDetail: Reducer<ProjectModelState>;
    setScaleGroup: Reducer<ProjectModelState>;
  };
}
interface IProjectList {
  id: string;
  name: string;
  detail: {
    duration: number;
    intro: string;
    avatar: string;
  };
  status: string;
  doctorId: string;
  createdAt: number;
  patientCount: number;
  avgDay: number;
}
export interface IGroup {
  groupId: string;
  groupName: string;
  projectSid: string;
}

export const projectState = {
  projectList: [],
  objectiveScaleList: [],
  reverData: {},
  objectiveGroup: [],
  formName: '',
  projDetail: {},
  scaleGroupInfos: [],
};

const ProjectModel: ProjectModelType = {
  namespace: 'project',
  state: projectState,
  effects: {
    *fetchProjectList({ payload }, { call, put }) {
      const response = yield call(project.getProjectList, payload);
      window.$storage.setItem('currentProject', response.projectInfos?.[0]?.name); // navbar显示用
      yield put({
        type: 'saveProjectList',
        payload: response.projectInfos,
      });
    },
    *fetchObjectiveScale({ payload }, { call, put }) {
      const response = yield call(subjective.getObjectiveScale, payload);
      // if (response.infos.length == 0) {
      //   const projectSid = window.$storage.getItem('projectSid');
      //   api.subjective.getScaleGroup({ projectSid, type: 'OBJECTIVE' }).then((res) => {
      //     if (res.scaleGroupInfos.length > 0) {
      //       history.replace((`/objective_table/detail?id=${res.scaleGroupInfos[0].id}`));
      //     }
      //   });
      // }
      // 处理数据，添加chooseValues内容
      for (let i = 0; i < response.infos.length; i++) {
        const chooseValuesKey = getChooseValuesKeyFromRules(response.infos[i].ruleDoc.rules[0]);
        response.infos[i].chooseValues = chooseValuesKey;
      }
      yield put({
        type: 'saveObjectiveScale',
        payload: response,
      });
    },
    *fetchGroupList({ payload }, { call, put }) {
      const response = yield call(patientManage.getGroupList, payload);
      yield put({
        type: 'setGroupList',
        payload: response.infos,
      });
    },
    *fetchProjectDetail({ payload }, { call, put }) {
      const response = yield call(detail.getCroProjectInfo, payload);
      const isLeader = [Role.MAIN_PI.id, Role.PROJECT_LEADER.id].includes(response.roleType);
      window.$storage.setItem('croLabel', response.label); // "multi_project"多中心
      window.$storage.setItem('croRoleType', response.roleType); // 科研角色
      window.$storage.setItem('projectStatus', response.status); // 项目状态
      if (isLeader) {
        window.$storage.setItem('isLeader', 'leader'); // 有些按钮功能只有项目总pi和项目组长可以操作
      } else {
        window.$storage.removeItem('isLeader');
      }
      yield put({
        type: 'setProjectDetail',
        payload: response,
      });
    },
    *fetchScaleGroup({ payload }, { call, put }) {
      const response = yield call(subjective.getScaleGroup, payload);
      yield put({
        type: 'setScaleGroup',
        payload: response,
      });
    },
  },
  reducers: {
    saveProjectList(state = projectState, { payload }): ProjectModelState {
      return {
        ...state,
        projectList: payload,
      };
    },
    saveObjectiveScale(state = projectState, { payload }): ProjectModelState {
      console.log('payload888', payload);
      return {
        ...state,
        objectiveScaleList: payload.infos,
        formName: payload.name,
      };
    },
    setReverData(state = projectState, { payload }): ProjectModelState {
      return {
        ...state,
        reverData: Object.assign({}, state.reverData, {
          [payload.index]: { base: payload.base, plans: payload.plans },
        }),
      };
    },
    clearReverData(state = projectState, { payload }): ProjectModelState {
      return {
        ...state,
        reverData: {
          [payload.index]: {},
        },
      };
    },
    setGroupList(state = projectState, { payload }): ProjectModelState {
      return {
        ...state,
        objectiveGroup: payload,
      };
    },
    setProjectDetail(state = projectState, { payload }): ProjectModelState {
      return {
        ...state,
        projDetail: payload,
      };
    },
    setScaleGroup(state = projectState, { payload }): ProjectModelState {
      return {
        ...state,
        scaleGroupInfos: payload,
      };
    },
  },
};

export default ProjectModel;
