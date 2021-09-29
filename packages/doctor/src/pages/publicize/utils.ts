import { message } from 'antd';
import type { IRule, IValues } from './const';

export const handleFormatValues = (
  // values: IValues, rules: IRule, isScale: boolean, checked: string
  values: IValues, rules: IRule, isScale: boolean, checked: string, sid: string, role: string, scopeItems: any[],
) => {
  const { conditions, group, frequencyType, custom } = values;
  const filterCondition = conditions.filter(item => !!item?.type);
  console.log('isScale', isScale, rules);
  const conditionItems = rules.filter(item => item.name === 'condition')[0];
  // if(!checked){
  //   message.error('请在上一步选择发送内容!');
  //   return;
  // } if(!custom.filter(cu => !!cu).length){
  //   message.error('请完善发送频率');
  //   return;
  // } if(!group || !group.length){
  //   message.error('请选择发送对象');
  //   return;
  // }

  // 开始时间
  const roleKey = 'team.role';
  const timeKey = 'team.init_time';
  const subjectKey = 'team.subject';
  const start = [{
    [roleKey]: {
      operator: '=',
      value: role,
    },
    [timeKey]: {
      operator: '=',
      value: '*',
      starting: true,
    },
    [subjectKey]: {
      operator: '=',
      value: sid,
    },
  }];
  let must: any = [];
  filterCondition.forEach((item) => {
    const mapObj: { operator?: string, value?: string } = {};
    // 年龄
    if (item.type === 'age'){
      if (item.min >= item.max){
        message.error('请输入正确的年龄范围');
        return;
      }
      const key: any = conditionItems.items.filter(i => i.description.includes('年龄') )[0].name;
      // const key: any = 'basic.age'
      mapObj[key] = {
        operator: '<>',
        value: `[${item.min},${item.max})`,
      };
    }
    // 性别
    if (item.type === 'sex'){
      const key: any = conditionItems.items.filter(i => i.description === '性别')[0].name;
      // const key: any = 'basic.sex'
      mapObj[key] = {
        operator: '=',
        value: item.value,
      };
    }
    // 诊断
    if (item.type === 'diagnosis'){
      const filterItem = conditionItems.items.filter(i => i.description === '疾病')[0];
      const key: any = filterItem?.name;
      // const key: any = 'diagnose.disease'
      // const uidKey: any = 'diagnose.disease.uid'
      mapObj[key] = {
        operator: '=',
        value: item.id,
      };
    }
    // 处理
    if (item.type === 'treatment'){
      const filterItem = conditionItems.items.filter(i => i.description === '处理')[0];
      const key: any = filterItem?.name;
      // const key: any = 'diagnose.treatment'
      // const uidKey: any = 'diagnose.treatment.uid'
      mapObj[key] = {
        operator: '=',
        value: item.id,
      };
    }
    must = [...must, mapObj];
  });
  // 发送对象
  // eslint-disable-next-line @typescript-eslint/naming-convention
  let should_1: any = [];
  if (group.includes('PATIENT_ALL')){
    const mapObj: { operator?: string, value?: string } = {};
    const currentGroup = scopeItems.filter(scope => scope.description === '全部患者')[0];
    currentGroup.items.forEach((i) => {
      mapObj[i.name] = {
        operator: '=',
        value: i.assign.value,
      };
    });
    should_1 = [...should_1, mapObj];
  } else {
    group.forEach((item) => {
      const mapObj: { operator?: string, value?: string } = {};
      const currentGroup = scopeItems.filter(scope => scope.description === item)[0];
      currentGroup.items.forEach((i) => {
        mapObj[i.name] = {
          operator: '=',
          value: i.assign.value,
        };
      });
      should_1 = [...should_1, mapObj];
    });
  }
  // 发送频率
  let actions: any = [];
  custom.filter(cu => !!cu).forEach((item)=> {
    const mapObj = {
      type: frequencyType,
      params: {
        delay: 32400,
        period: item,
        unit: 'day',
        sourceMember: checked.split(',').map((ck)=>({
          sourceId: ck,
        })),
      },
    };
    actions = [...actions, mapObj];
  });
  return {
    start: [...start],
    must: [...must],
    should_1: [...should_1],
    actions: [...actions],
  };
};

// 通过id获取相关数据
export function getCheckedContent(idArr: string[], listArr: []){
  // if (idArr.includes('PATIENT_ALL')) {
  //   return '全部患者'
  // }
  console.log('listArr', listArr);
  let result: any = [];
  idArr.forEach((item) => {
    listArr.forEach((lItem: { id: string }) => {
      if (lItem.id === item) {
        result = [...result, lItem];
      }
    });
  });
  return result;
}
