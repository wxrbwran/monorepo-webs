import { message } from 'antd';
import type { IRule, IValues } from './const';

export const handleFormatValues = (
  // values: IValues, rules: IRule, isScale: boolean, checked: string
  values: IValues, rules: IRule, isScale: boolean, checked: string
) => {
  const { conditions, group, frequencyType, custom } = values;
  const filterCondition = conditions.filter(item => !!item?.type);
  console.log('isScale', isScale);
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
  const startKey = rules.start.name;
  // const startKey = 'basic.namespace.uid';
  const start = [{
    [startKey]: {
      operator: '=',
      value: window.$storage.getItem('nsId'),
      isStarting: true
    }
  }]
  let must: any = [];
  filterCondition.forEach((item) => {
    const mapObj: { operator?: string, value?: string } = {};
    // 年龄
    if(item.type === 'age'){
      if(item.min >= item.max){
        message.error('请输入正确的年龄范围');
        return;
      }
      const key: any = rules?.condition.items.filter(i => i.description.includes('年龄') )[0].name
      // const key: any = 'basic.age'
      mapObj[key] = {
        operator: '<>',
        value: `[${item.min},${item.max})`
      }
    }
    // 性别
    if(item.type === 'sex'){
      const key: any = rules?.condition.items.filter(i => i.description === '性别')[0].name
      // const key: any = 'basic.sex'
      mapObj[key] = {
        operator: '=',
        value: item.value
      }
    }
    // 诊断
    if(item.type === 'diagnosis'){
      const filterItem = rules?.condition.items.filter(i => i.description === '诊断')[0]
      const key: any = filterItem?.name
      const uidKey: any = filterItem?.items[0]?.name
      // const key: any = 'diagnose.disease'
      // const uidKey: any = 'diagnose.disease.uid'
      mapObj[key] = {
        operator: '=',
        value: item.value
      }
      mapObj[uidKey] = {
        operator: '=',
        value: item.id
      }
    }
    // 处理
    if(item.type === 'treatment'){
      const filterItem = rules?.condition.items.filter(i => i.description === '处理')[0]
      const key: any = filterItem?.name
      const uidKey: any = filterItem?.items[0]?.name
      // const key: any = 'diagnose.treatment'
      // const uidKey: any = 'diagnose.treatment.uid'
      mapObj[key] = {
        operator: '=',
        value: item.value
      }
      mapObj[uidKey] = {
        operator: '=',
        value: item.id
      }
    }
    must = [...must, mapObj]
  })
  // 发送对象
  let should_1: any = [];
  if(group.includes('PATIENT_ALL')){
    const mapObj: { operator?: string, value?: string } = {};
    const key = rules.namespace.name;
    mapObj[key]={
      operator: '=',
      value: window.$storage.getItem('nsId'),
      isStarting: false
    }
    should_1=[...should_1, mapObj]
  }else{
    group.forEach((item) => {
      const mapObj: { operator?: string, value?: string } = {};
      const key = rules.namespace.name;
      mapObj[key]={
        operator: '=',
        value: item,
        isStarting: false
      }
      should_1=[...should_1, mapObj]
    })
  }
  // 发送频率
  let actions: any = [];
  custom.filter(cu => !!cu).forEach((item)=> {
    const mapObj = {
      type: frequencyType,
      params: {
        delay: item,
        unit: "day"
      },
      reminds: [{
        text: checked,
        // type: isScale ? 'follow' : 'publicize_education'
      }]
    };
    actions=[...actions, mapObj]
  })
  return {
    start: [...start],
    must: [...must],
    should_1: [...should_1],
    actions: [...actions]
  }
}

// 通过id获取相关数据
export function getCheckedContent (idArr: string[], listArr: []){
  // if (idArr.includes('PATIENT_ALL')) {
  //   return '全部患者'
  // }
    let result: any = [];
    idArr.forEach((item) => {
      listArr.forEach((lItem: { id: string }) => {
        if (lItem.id === item) {
          result = [...result, lItem]
        }
      });
    });
    return result;
}
