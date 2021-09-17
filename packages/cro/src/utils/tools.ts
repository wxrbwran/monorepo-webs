import { IVal, IPlanItem, IStandard } from './consts';
import { initSelectForm } from './conditions';
import { group } from 'console';

interface IFilter {
  type: string;
  detail: {
    minAge: number;
    maxAge: number;
    sex: string;
    diagnosis: [];
    treatment: [];
  }
}
interface IConditionItem {
  var: string;
  operator: string;
  value: string;
}
interface ICondition {
  sex?: string,
  minAge?: number,
  maxAge?: number,
  diagnosis?: string[],
  treatment?: string[],
  conditions?: IConditionItem[]
}
export interface IConItem {
  detail: {
    diagnosis: string,
    treatment: string,
    sex: string,
    minAge: number,
    maxAge: number,
    send: string,
    medicines: string,
    other: string,
  }
}
interface IInitCon {
  type: string,
  detail: {
    send?: string;
    diagnosis?: [];
    treatment?: [];
  }
}
let initCondition: IInitCon = {
  type: 'SEND',
  detail: {}
}
export const provinces = [
  {
    'id': 1,
    'regionName': '北京',
  },
  {
    'id': 2,
    'regionName': '上海',
  },
  {
    'id': 3,
    'regionName': '天津',
  },
  {
    'id': 4,
    'regionName': '重庆',
  },
  {
    'id': 5,
    'regionName': '江苏',
  },
  {
    'id': 6,
    'regionName': '广东',
  },
  {
    'id': 7,
    'regionName': '山东',
  },
  {
    'id': 8,
    'regionName': '辽宁',
  },
  {
    'id': 9,
    'regionName': '河北',
  },
  {
    'id': 10,
    'regionName': '河南',
  },
  {
    'id': 11,
    'regionName': '四川',
  },
  {
    'id': 12,
    'regionName': '黑龙江',
  },
  {
    'id': 13,
    'regionName': '山西',
  },
  {
    'id': 14,
    'regionName': '湖北',
  },
  {
    'id': 15,
    'regionName': '湖南',
  },
  {
    'id': 17,
    'regionName': '陕西',
  },
  {
    'id': 18,
    'regionName': '浙江',
  },
  {
    'id': 21,
    'regionName': '云南',
  },
  {
    'id': 22,
    'regionName': '吉林',
  },
  {
    'id': 25,
    'regionName': '安徽',
  },
  {
    'id': 26,
    'regionName': '广西',
  },
  {
    'id': 27,
    'regionName': '江西',
  },
  {
    'id': 28,
    'regionName': '福建',
  },
  {
    'id': 29,
    'regionName': '新疆',
  },
  {
    'id': 30,
    'regionName': '内蒙古',
  },
  {
    'id': 31,
    'regionName': '甘肃',
  },
  {
    'id': 32,
    'regionName': '贵州',
  },
  {
    'id': 33,
    'regionName': '海南',
  },
  {
    'id': 34,
    'regionName': '青海',
  },
  {
    'id': 35,
    'regionName': '宁夏',
  },
  {
    'id': 36,
    'regionName': '西藏',
  },
  {
    'id': 4000,
    'regionName': '香港',
  },
  {
    'id': 4001,
    'regionName': '澳门',
  },
  {
    'id': 4002,
    'regionName': '台湾',
  },
];

//格式化发送计划详情
export function getPlanDetail(plans:[],groupList:[]) {
  const val:IVal = {};
  plans.forEach((item:IPlanItem, index) => {
    console.log(9399393, item.detail)
    const { projectGroups, conditions, diagnosis, treatment, frequency, custom, start } = item.detail;
    if(item.type==='GROUP') {
      if(projectGroups) {
        val.projectGroups =getGroupName(projectGroups,groupList);
      }
    }else if(item.type==='SEND') {
      if (conditions) {
        const { maxAge, minAge, sex } = initSelectForm(conditions);
        if(maxAge) val.maxAge = +maxAge;
        if(minAge) val.minAge = +minAge;
        if([0, 1].includes(sex)) val.sex = +sex;
      }
      if(diagnosis) val.diagnosis = diagnosis.join();
      if(treatment) val.treatment = treatment.join();
    }else if(item.type==='FREQUENCY'){
      val.frequency = frequency;
      val.custom = custom;
    }else if (item.type==='START') {
      val.start = start;
    }
  });
  return val;
}
//将试验组id转换为实验组name
export function getGroupName (options:string[], groupArray:[]){
  if (options.includes('PROJECT_ALL')) {
    return '全部受试者'
  } else {
    let newGroup: string[] = [];
    options.forEach((item, index) => {
      groupArray.forEach((vItem: { groupId: string, groupName: string }) => {
        if (vItem.groupId === item) {
          newGroup = [...newGroup, vItem.groupName]
        }
      });
    });
    return newGroup.join();
  }
}
//返回符合条件的condition
export function filterConditions(plans:[], type: string) {
  let tmp = {};
  tmp = plans.filter((item:{type: string})=>item.type===type)[0];
  return JSON.parse(JSON.stringify(tmp));
}
//格式化”发送条件“详情
export function getConditionDetail(plans:[]) {
  let agePlan = {
    type: 'SEND',
    detail: {
      maxAge: 0,
      minAge: 0,
      send: "AGE"
    }
  }
  let sexPlan = {
    type: 'SEND',
    detail: {
      sex: "",
      send: "BASE"
    }
  }
  let newArry:IInitCon[] = []
  const filterCondition:IFilter = plans.filter((item: {type: string}) => item.type==='SEND')[0];
  if(filterCondition.detail?.conditions) {
    filterCondition.detail?.conditions.forEach(item => {
      if(item.var === "(sj.details->>'sex')::INTEGER") {
        sexPlan.detail.sex = item.value;
        newArry = [...newArry, sexPlan]
      } else if(item.var === "(sj.details->>'age')::INTEGER") {
        //格式1: int4range(40, 80)  --> [40, 80]
        //格式2: '40,80' --> [40, 80]
        const ageArr = item.value.includes('int4range')
        ? item.value.match(/\(([^)]*)\)/)[1].split(',')
        : item.value.split(',')
        agePlan.detail.minAge = ageArr[0];
        agePlan.detail.maxAge = ageArr[1];
        newArry = [...newArry, agePlan]
      }
    })

  }
  if(filterCondition.detail.diagnosis) {
    newArry = [...newArry, ...formatInfo(filterCondition.detail.diagnosis, 'DIAGNOSIS', 'diagnosis')]
  }
  if(filterCondition.detail.treatment) {
    newArry = [...newArry, ...formatInfo(filterCondition.detail.treatment, 'TREATMENT', 'treatment' )]
  }
  if(newArry.length===0) newArry = [{
    type: 'SEND',
    detail: {}
  }]
  return newArry;
}

//格式化纳排标准
export function getStandardDetail(standardObj:{}) {
  let newArry:IInitCon[] = []
  Object.keys(standardObj).forEach((item)=> {
    if(item==='age'){
      newArry = [...newArry, {
        type: 'SEND',
        detail: {
          maxAge: standardObj[item]?.upperAge,
          minAge: standardObj[item]?.lowerAge,
          send: "AGE"
        }
      }]
    }
    if(item==='gender'){
      newArry = [...newArry, {
        type: 'SEND',
        detail: {
          sex: standardObj[item],
          send: "BASE"
        }
      }]
    }
    if(item==='diagnoseName'){
      newArry = [...newArry, ...formatInfo(standardObj[item], 'DIAGNOSIS', 'diagnosis')]
    }
    if(item==='medicineName'){
      newArry = [...newArry, ...formatInfo(standardObj[item], 'MEDICINE', 'medicines')]
    }
    if(item==='customize'){
      newArry = [...newArry, ...formatInfo(standardObj[item], 'OTHER', 'other')]
    }
  })
  if(newArry.length===0) newArry = [{
    type: 'SEND',
    detail: {}
  }]
  return newArry;
}

//格式化诊断和处理
export function formatInfo (params: [], send:string, name: string) {
  let newArray: IInitCon[] =[]
  params.forEach((item, index) => {
    initCondition.detail = {
      send:send,
      [name]: item
    }
    newArray[index]={...initCondition}
  });
  return [...newArray];
}

//格式化发送条件
export function formatConditions (conditions:[]) {
  let diagnoseName:string[] = [];
  let medicineName:string[] = [];
  let val:ICondition = {};
  const condition:IConditionItem[] = [];
  conditions.forEach((item:IConItem, index) => {
    const { minAge, maxAge, sex, diagnosis, treatment, send } = item.detail;
    switch (send) {
      case 'AGE':
        condition.push({
          "var": "(sj.details->>'age')::INTEGER",
          "operator": "<@",
          "value": `int4range(${ minAge | 0}, ${maxAge | 0})`
        })
        break;
      case "BASE":
        condition.push({
          "var": "(sj.details->>'sex')::INTEGER",
          "operator": "=",
          "value": sex
        })
        break;
      case "DIAGNOSIS":
        diagnoseName = [...diagnoseName,diagnosis ]
        if(diagnosis) {val.diagnosis = diagnoseName}
        break;
      case "TREATMENT":
        medicineName = [...medicineName,treatment ]
        if(treatment) { val.treatment = medicineName}
        break;
    }
  });
  if (condition.length > 0) {val.conditions = condition}
  let newPlans = [
    {
      type: 'SEND',
      detail: val
    }
  ]
  return newPlans
}

//查找入组/排除标准索引
export function findIndex (obj:IStandard, item: string) {
  //之所以这样处理是为了固定显示顺序：年龄、性别、用药、诊断、自定义
  let keyArray:string[] = [];
  if(obj.age) {
    keyArray.push('age')
  }
  if(obj.gender || obj.gender === 0) {
    keyArray.push('gender')
  }
  if(obj.medicineName) {
    keyArray.push('medicineName')
  }
  if(obj.diagnoseName){
    keyArray.push('diagnoseName')
  }
  if(obj.customize){
    keyArray.push('customize')
  }
  return  keyArray.indexOf(item)+1
}

export function parabola(config) {
  const {
    ballWrapper,
    origin,
    target,
    time = 1000,
    a = 0.004,
    callback,
    finish,
    offset = 0
  } =
    config || {};
  const ballWrapperDimension = ballWrapper.getBoundingClientRect();
  const originDimension = origin.getBoundingClientRect();
  const targetDimension = target.getBoundingClientRect();
  const x1 = originDimension.left + 0.5 * originDimension.width;
  const y1 = originDimension.top + 0.5 * originDimension.height;
  const x2 = targetDimension.left + 0.5 * targetDimension.width;
  const y2 = targetDimension.top + 0.5 * targetDimension.height;
  const diffx = x2 - x1;
  const diffy = y2 - y1;
  const speedx = diffx / time;
  const b = (diffy - a * diffx * diffx) / diffx;

  const refPoint_x = x1 - ballWrapperDimension.left - 0.5 * offset;
  const refPoint_y = y1 - ballWrapperDimension.top - 0.5 * offset;

  const start = Date.now();
  const timer = setInterval(() => {
    if (Date.now() - start > time) {
      finish();
      clearInterval(timer);
      return;
    }

    const x = speedx * (Date.now() - start);
    const y = a * x * x + b * x;
    callback && callback(refPoint_x + x, refPoint_y + y);
  }, 15);
}

/* eslint-disable */

