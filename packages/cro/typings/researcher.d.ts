declare interface ITreePure {
  groupName: string;
  name: string;
  role: string;
  roleId: string;
  subjectDetail: ISubject;
  subjectId: string;
}
declare type ITree = ITreePure & {
  subWC: ITreePure[];
  nsId: string;
};

declare type ITreeChartPure = {
  level: string;
  name: string;
  firstProfessionCompany: string;
  group: string;
  hasHumanholding: boolean;
  hasChildren: boolean;
  amount: string;
  ratio: string;
};
declare type ITreeChart = ITreeChartPure & {
  children: ITreeChartPure[];
};
