import type { IProjectDetail } from "@/types/clinical";

export const projectListChart = [
  {
    projectName: "多中心临床实验",
    projectNsId: "dev.qWdYL4",
    projectSid: "dev.nWgnX0",
    ratio: 9
  },
  {
    projectName: "单中心临床实验",
    projectNsId: "dev.qWdYL4",
    projectSid: "dev.nWgnX0",
    ratio: 2
  },
  {
    projectName: "阿司匹林临床一期阿司匹林临床一期",
    projectNsId: "dev.qWdYL4",
    projectSid: "dev.nWgnX0",
    ratio: 70
  },
  {
    projectName: "阿司匹林临床二期",
    projectNsId: "dev.qWdYL4",
    projectSid: "dev.nWgnX0",
    ratio: 50
  },
  {
    projectName: "新冠疫苗临床三期",
    projectNsId: "dev.qWdYL4",
    projectSid: "dev.nWgnX0",
    ratio: 20
  },
  {
    projectName: "新冠疫苗临床二期",
    projectNsId: "dev.qWdYL4",
    projectSid: "dev.nWgnX0",
    ratio: 90
  },
  {
    projectName: "新冠疫苗临床1",
    projectNsId: "dev.qWdYL4",
    projectSid: "dev.nWgnX0",
    ratio: 100
  },
  {
    projectName: "新冠疫苗临床2",
    projectNsId: "dev.qWdYL4",
    projectSid: "dev.nWgnX0",
    ratio: 32
  },
  // {
  //   projectName: "新冠疫苗临床3",
  //   projectNsId: "dev.qWdYL4",
  //   projectSid: "dev.nWgnX0",
  //   ratio: 10
  // },
  // {
  //   projectName: "新冠疫苗临床4",
  //   projectNsId: "dev.qWdYL4",
  //   projectSid: "dev.nWgnX0",
  //   ratio: 20
  // },
  // {
  //   projectName: "新冠疫苗临床5",
  //   projectNsId: "dev.qWdYL4",
  //   projectSid: "dev.nWgnX0",
  //   ratio: 30
  // }

]
export const projectListMock: IProjectDetail[] = [
  {
      "projectNsId": "dev.qWdYL4",
      "projectSid": "dev.nWgnX0",
      "name": "阿司匹林临床1期",
      "detail": {
          "duration": 100,
          "intro": "111ddd",
          "avatarUrl": "https://xzl-im-files.oss-cn-hangzhou.aliyuncs.com/dev/2/8e43d72d-5ae5-40c8-9d04-21c777b57b14projectImg1.jpeg",
          "joinStandard": {
              "age": {
                  "lowerAge": 1,
                  "upperAge": 5
              },
              "type": "JOIN_CONDITION"
          },
          "excludeStandard": {
              "gender": 1,
              "type": "EXCLUDE_CONDITION"
          }
      },
      "status": 1002,
      "label": "single_project",
      "roleType": "dev.v4Rwe2",
      "createdAt": 1611343932000,
      "patientCount": 0,
      "avgDay": 0
  },
  {
      "projectNsId": "dev.keKoZe",
      "projectSid": "dev.YWL6De",
      "name": "阿司匹林临床2期",
      "detail": {
          "duration": 100,
          "avatarUrl": "https://xzl-im-files.oss-cn-hangzhou.aliyuncs.com/dev/2/d1f6b9bb-b5cf-4d32-96a0-108d2338d382projectImg2.jpeg"
      },
      "status": 1002,
      "label": "multi_project",
      "roleType": "dev.NeEd4M",
      "createdAt": 1611445831000,
      "patientCount": 0,
      "avgDay": 0
  },
  {
      "projectNsId": "dev.Y4jYDW",
      "projectSid": "dev.70M69W",
      "name": "阿司匹林临床3期",
      "detail": {
          "duration": 100,
          "avatarUrl": "https://xzl-im-files.oss-cn-hangzhou.aliyuncs.com/dev/2/364a407a-cd3a-4886-8029-c43434f7838dprojectImg3.jpeg"
      },
      "status": 1002,
      "label": "single_project",
      "roleType": "dev.v4Rwe2",
      "createdAt": 1611446567000,
      "patientCount": 0,
      "avgDay": 0
  },
  {
      "projectNsId": "dev.YWBMa0",
      "projectSid": "dev.n41n5e",
      "name": "新型波立维临床1期",
      "detail": {
          "duration": 100,
          "avatarUrl": "https://xzl-im-files.oss-cn-hangzhou.aliyuncs.com/dev/2/5c267f30-ccc7-4d9f-a749-420f3d740a4cprojectImg4.jpeg"
      },
      "status": 1002,
      "label": "multi_project",
      "roleType": "dev.NeEd4M",
      "createdAt": 1611447849000,
      "patientCount": 0,
      "avgDay": 0
  },
  {
      "projectNsId": "dev.r4qwE0",
      "projectSid": "dev.L03ZJe",
      "name": "新型波立维临床2期",
      "detail": {
          "duration": 100,
          "avatarUrl": "https://xzl-im-files.oss-cn-hangzhou.aliyuncs.com/dev/2/ee254d65-f014-4c55-a952-6ec4c5ccf04aprojectImg5.jpeg",
          "joinStandard": {
              "age": {
                  "lowerAge": 1,
                  "upperAge": 111
              },
              "type": "JOIN_CONDITION"
          },
          "excludeStandard": {}
      },
      "status": 1002,
      "label": "multi_project",
      "roleType": "dev.NeEd4M",
      "createdAt": 1611454785000,
      "patientCount": 0,
      "avgDay": 0
  },
  {
      "projectNsId": "dev.80pwze",
      "projectSid": "dev.V0XzL4",
      "name": "新型波立维临床3期",
      "detail": {
          "duration": 100,
          "avatarUrl": "https://xzl-im-files.oss-cn-hangzhou.aliyuncs.com/dev/2/ee254d65-f014-4c55-a952-6ec4c5ccf04aprojectImg5.jpeg"
      },
      "status": 1002,
      "label": "multi_project",
      "roleType": "dev.NeEd4M",
      "createdAt": 1611697791000,
      "patientCount": 0,
      "avgDay": 0
  }
]

export const deparmentList: ISideMenuItem[] = [
  {
    name: '心内科',
    id: '2'
  },
  {
    name: '呼吸科',
    id: '5'
  },
  {
    name: '全科',
    id: '3'
  },
]
