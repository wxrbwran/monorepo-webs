import { isEmpty } from 'lodash';
import { message } from 'antd';
export const handleFormValues = (values: any) => {
  const keys = Object.keys(values)
  const specificWord = ['start', 'uid', 'assign', 'self', 'parent',  'high', 'low', 'project_sid']

  const uniqueNo = [
    ...new Set(
      keys.map(
        (key) => key.split('_value_')[1] || key.split('_operator_')[1]
        || key.split('_min_')[1] || key.split('_max_')[1] || key.split('_unit_')[1]
      ).map((n) => +n)
    )
  ]
  const uniqueKeys = [
    ...new Set(
      keys
        .map((key) => key.split('_value_')[0])
        .map((key) => key.split('_operator_')[0])
        .map((key) => key.split('_unit_')[0])
        .map((key) => key.split('_min_')[0])
        .map((key) => key.split('_max_')[0])
        .map((key) => key.split('start')[0])
        .map((key) => key.split('uid')[0])
        .map((key) => key.split('assign')[0])
        .map((key) => key.split('self')[0])
        .map((key) => key.split('parent')[0])
        .map((key) => key.split('high')[0])
        .map((key) => key.split('low')[0])
        .map((key) => key.split('project_sid')[0])
    )
  ]
  console.log('uniqueKeys', uniqueKeys)
  console.log('uniqueNo', uniqueNo)

  const rule: [] = []

  uniqueNo.forEach((no) => {
    uniqueKeys.forEach((key) => {
      const tmp: any = {}
      const curOperator = `${key}_operator_${no}`
      const curVal = `${key}_value_${no}`
      const curMin = `${key}_min_${no}`
      const curMax = `${key}_max_${no}`
      const curUnit = `${key}_unit_${no}`
      console.log('curOperator', curOperator)
      console.log('curVal', curVal)

      if (keys.includes(curOperator)) {
        tmp.operator = values[curOperator]
      }
      if (keys.includes(curVal)) {
        tmp.value = values[curVal]
      }
      if (keys.includes(curMin)) {
        tmp.min = values[curMin]
      }
      if (keys.includes(curMax)) {
        tmp.max = values[curMax]
      }
      if (keys.includes(curUnit)) {
        tmp.unit = values[curUnit]
      }
      if (tmp.operator || tmp.value || tmp.min || tmp.max || tmp.unit) {
        rule.push({ [key]: tmp })
      } else {
        const outTmp: any = {}
        specificWord.forEach((w) => {
          const specificKey = `${key}${w}`
          const specificTmp: any = {}
          const specificOperator = `${specificKey}_operator_${no}`
          const specificVal = `${specificKey}_value_${no}`
          const specificMin = `${specificKey}_min_${no}`
          const specificMax = `${specificKey}_max_${no}`
          if (keys.includes(specificOperator)) {
            specificTmp.operator = values[specificOperator]
          }
          if (keys.includes(specificVal)) {
            specificTmp.value = values[specificVal]
          }
          if (keys.includes(specificMin)) {
            specificTmp.min = values[specificMin]
          }
          if (keys.includes(specificMax)) {
            specificTmp.max = values[specificMax]
          }
          if (specificTmp.operator || specificTmp.value || specificTmp.min || specificTmp.max) {
            if(specificKey.includes('parent') ){
              outTmp[specificKey.split('.index.parent')[0]] = specificTmp
            } else if(specificKey.includes('self') ){
              outTmp[specificKey.split('.self')[0]] = specificTmp
            } else if(specificKey.includes('uid') ){
              outTmp[specificKey.split('.uid')[0]] = specificTmp
              outTmp[specificKey] = specificTmp
            }else {
              outTmp[specificKey] = specificTmp
            }
          }
        })
        if(!isEmpty(outTmp)) {
          rule.push(outTmp)
        }
      }
    })
  })
  return rule;
};
export const handleFormatValues = (values: any) => {
  const formatValues = {...values};
  for(let key in values) {
    if(key.includes('_min_') && ![undefined, null].includes(values[key])){
      let max = key.replace('_min_', '_max_');
      if(values[key]>values[max]){
        message.error('区间范围的开始值不能大于结束值');
        return;
      }else if(values[key]===values[max]) {
        message.error('区间范围的开始值必须小于结束值');
        return;
      }
      /**
       * 日期控件为”=“类型传值的时候需要处理成：operator为'<>', min, max形式，
       * min, max已在formItem位置处理operator在此处处理
       */
      const keySplitArr = key.split('_min_');
      formatValues[`${keySplitArr[0]}_operator_${keySplitArr[1]}`] = '<>'
    }
    // 因为还有值为0值的情况，所以用[undefined, null].includes(values[key]))这种方式，不用非的方式
    if(key.includes('_value_') && [undefined, null].includes(values[key])){
      const keySplitArr = key.split('_value_');
      if(values[`${keySplitArr[0]}_operator_${keySplitArr[1]}`]==='~='){
        formatValues[`${keySplitArr[0]}_value_${keySplitArr[1]}`] = ''
      }else if (!values[`${keySplitArr[0]}_operator_${keySplitArr[1]}`]) {
        formatValues[`${keySplitArr[0]}_operator_${keySplitArr[1]}`] = '>'
        formatValues[`${keySplitArr[0]}_value_${keySplitArr[1]}`] = 0
      }
    }
  }
  console.log('formatValues', formatValues);
  for(let key in formatValues) {
    // 姓名、性别、手机号为''，数值可填0，这几类情况是均不用校验的，所以此处判断[undefined, null]的情况
    // undefined是未填写的状态，null是填写了又删掉的状态
    if([undefined, null].includes(formatValues[key])) {
      message.error('所选条件不能为空');
      return;
    }
  }
  const rules = handleFormValues(formatValues);
  return rules;
}
