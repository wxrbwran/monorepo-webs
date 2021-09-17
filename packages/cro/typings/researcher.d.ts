export interface ITreePure {
  groupName: string;
  name: string;
  role: string;
  roleId: string;
  subjectDetail: ISubject;
  subjectId: string;
}
export type ITree = ITreePure & {
  subWC: ITreePure[];
  nsId: string;
};

export type ITreeChartPure = {
  level: string;
  name: string;
  firstProfessionCompany: string;
  group: string;
  hasHumanholding: boolean;
  hasChildren: boolean;
  amount: string;
  ratio: string;
}
export type ITreeChart = ITreeChartPure & {
  children: ITreeChartPure[]
}
