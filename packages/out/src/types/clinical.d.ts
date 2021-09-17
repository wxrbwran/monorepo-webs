import e from "express";

// 总览-s
export interface IProjectDetail {
  projectSid: string,
  projectNsId: string;
  name: string,
  detail: {
    duration: number,
    intro: string,
    avatarUrl: string,
  }
  status: string,
  doctorId: string,
  createdAt: number,
  patientCount: number,
  avgDay: number,
  roleType: string;
  label: string;
}
export interface ITabItem {
  tab: string;
  data:string[];
}
// 总览-e
// 数据统计-s
export interface ICountItem {
  countKey: string;
  desc: string;
  unit?: string;
}
// 数据统计-e
interface IGroup {
  groupId: string,
  groupName: string,
  projectSid: string
}
