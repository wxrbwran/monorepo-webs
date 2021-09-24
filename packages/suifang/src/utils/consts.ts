export const initialOrg: Iorg = {
  organizationId: '',
  organizationName: '',
  role: '',
  roles: [],
  status: '',
  qrCodeUrl: '',
};
export enum SEX {
  MALE = '男',
  FEMALE = '女',
}
export const sexList = ['女', '男', '保密'];
interface IDetail {
  projectGroups?: [];
  frequency?: string;
  custom?: Array<number>;
  maxAge?: number;
  minAge?: number;
  sex?: string;
  diagnosis?: string;
  treatment?: string;
  send?: string;
  start?: string;
}
export interface IPlanItem {
  detail: IDetail;
  type: string;
}
export interface IPlanInfos {
  plans: [
    {
      type: string;
      detail: IDetail;
    },
  ];
  questions: string;
  scaleId: string;
}
