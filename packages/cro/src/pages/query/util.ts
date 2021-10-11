
import { message } from 'antd';
import * as api from '@/services/api';

// 将动态的item请求接口转换成真实的静态items，(请求自己的真实内容)
export const transformDynamicToStatic = (item: { type: string, name: string, assign: { value: string } }, projectSid: string, projectRoleType: string, value?: string) => {

  return new Promise<any[]>((resolve, reject) => {

    if (item.type.includes('dynamic')) {
      // 动态加载
      const params: { kp: string, value?: string, rsList: { sid: string, roleType?: string }[], scaleType?: string, sourceType: string } = {
        kp: item.name,
        value: value,
        rsList: [{ sid: projectSid, roleType: projectRoleType }],
        sourceType: '4',
      };

      api.query.fetchNodeEl(

        item.assign.value,
        params,
      ).then((response: { items: any; }) => {

        resolve(response?.items ?? []);
      }).catch((e) => {

        reject(e);
      });
    } else {

      resolve([item]);
    }
  });
};


// export const handleFormValues = (values: any) => {
//   const keys = Object.keys(values)
//   const specificWord = ['start', 'uid', 'assign', 'self', 'parent', 'high', 'low', 'project_sid']

//   const uniqueNo = [
//     ...new Set(
//       keys.map(
//         (key) => key.split('_value_')[1] || key.split('_operator_')[1]
//           || key.split('_min_')[1] || key.split('_max_')[1] || key.split('_unit_')[1]
//       ).map((n) => +n)
//     )
//   ]
//   const uniqueKeys = [
//     ...new Set(
//       keys
//         .map((key) => key.split('_value_')[0])
//         .map((key) => key.split('_operator_')[0])
//         .map((key) => key.split('_unit_')[0])
//         .map((key) => key.split('_min_')[0])
//         .map((key) => key.split('_max_')[0])
//         .map((key) => key.split('start')[0])
//         .map((key) => key.split('uid')[0])
//         .map((key) => key.split('assign')[0])
//         .map((key) => key.split('self')[0])
//         .map((key) => key.split('parent')[0])
//         .map((key) => key.split('high')[0])
//         .map((key) => key.split('low')[0])
//         .map((key) => key.split('project_sid')[0])
//     )
//   ]
//   console.log('uniqueKeys', uniqueKeys)
//   console.log('uniqueNo', uniqueNo)

//   const rule: [] = []

//   uniqueNo.forEach((no) => {
//     uniqueKeys.forEach((key) => {
//       const tmp: any = {}
//       const curOperator = `${key}_operator_${no}`
//       const curVal = `${key}_value_${no}`
//       const curMin = `${key}_min_${no}`
//       const curMax = `${key}_max_${no}`
//       const curUnit = `${key}_unit_${no}`
//       console.log('curOperator', curOperator)
//       console.log('curVal', curVal)

//       if (keys.includes(curOperator)) {
//         tmp.operator = values[curOperator]
//       }
//       if (keys.includes(curVal)) {
//         tmp.value = values[curVal]
//       }
//       if (keys.includes(curMin)) {
//         tmp.min = values[curMin]
//       }
//       if (keys.includes(curMax)) {
//         tmp.max = values[curMax]
//       }
//       if (keys.includes(curUnit)) {
//         tmp.unit = values[curUnit]
//       }
//       if (tmp.operator || tmp.value || tmp.min || tmp.max || tmp.unit) {
//         rule.push({ [key]: tmp })
//       } else {
//         const outTmp: any = {}
//         specificWord.forEach((w) => {
//           const specificKey = `${key}${w}`
//           const specificTmp: any = {}
//           const specificOperator = `${specificKey}_operator_${no}`
//           const specificVal = `${specificKey}_value_${no}`
//           const specificMin = `${specificKey}_min_${no}`
//           const specificMax = `${specificKey}_max_${no}`
//           if (keys.includes(specificOperator)) {
//             specificTmp.operator = values[specificOperator]
//           }
//           if (keys.includes(specificVal)) {
//             specificTmp.value = values[specificVal]
//           }
//           if (keys.includes(specificMin)) {
//             specificTmp.min = values[specificMin]
//           }
//           if (keys.includes(specificMax)) {
//             specificTmp.max = values[specificMax]
//           }
//           if (specificTmp.operator || specificTmp.value || specificTmp.min || specificTmp.max) {
//             if (specificKey.includes('parent')) {
//               outTmp[specificKey.split('.index.parent')[0]] = specificTmp
//             } else if (specificKey.includes('self')) {
//               outTmp[specificKey.split('.self')[0]] = specificTmp
//             } else if (specificKey.includes('uid')) {
//               outTmp[specificKey.split('.uid')[0]] = specificTmp
//               outTmp[specificKey] = specificTmp
//             } else {
//               outTmp[specificKey] = specificTmp
//             }
//           }
//         })
//         if (!isEmpty(outTmp)) {
//           rule.push(outTmp)
//         }
//       }
//     })
//   })
//   return rule;
// };


/// -------- values ------ 例子--- start
// basic.sex_value_0: "男"
// medical-normal.index.attach_operator_0: "="
// medical-normal.index.attach_operator_1: ">"
// medical-normal.index.attach_value_0: 1
// medical-normal.index.attach_value_1: 1
// medical-normal.start_operator_0: ">"
// medical-normal.start_operator_1: ">"
// medical-normal.start_value_0: 1629734400000
// medical-normal.start_value_1: 1629907200000
/// -------- values ------ 例子----- end

const getCorrentOperatorAndValue = (values: any, number: number, field: any) => {

  let value = values[(field.name + '_value_' + number)];
  const hasValue = ![undefined, null].includes(value) && value.toString().length > 0;
  let operator = values[(field.name + '_operator_' + number)];

  if (!hasValue) {
    operator = '=';
    value = '*';
  } else if (field.type == 'string') { // 写了的话，如果是输入框，即string类型
    operator = '~=';
  }

  return {
    operator: operator,
    value: value,
  };
};

export const handleFormValues = (values: any, checkedField: any[], projectSid: string) => {

  let rule: any[] = [];

  checkedField.forEach((field) => {

    const number = field.key.split(field.name + '_')[1];

    let oneGroup: {} = {};


    // 没写，operator为=，value为* ,
    // 写了， value是字符串类型，operator为~=

    // 如果没有子item，rule组装方式:
    if ((field.items?.length ?? 0) == 0) {
      // const tmp: any = { operator: values[(field.name + "_operator_" + number)], value: values[(field.name + "_value_" + number)] }
      const tmp: any = getCorrentOperatorAndValue(values, number, field);
      oneGroup = {
        ...oneGroup,
        [field.name]: tmp,
      };

    } else { // 如果有子item

      // 1.先加自己
      const tmp: any = { operator: '=', value: field.assign.value };
      oneGroup = {
        ...oneGroup,
        [field.name]: tmp,
      };

      // 2.如果是结构化数据name==medical-img，则拼一个父级
      if (field.parentName == 'medical-img') {


        const tmpP: any = { operator: '=', value: field.subParentAssign.value };
        oneGroup = {
          ...oneGroup,
          [field.subParentName]: tmpP,
        };
      }


      // 3.再加每一个子item
      field.items.forEach((childItem: { type: string; name: string; assign: { value: any; }; }) => {

        if (childItem.type == 'primary') { // primary 类型，组装方式

          const tmpC: any = { operator: '=', value: projectSid };
          oneGroup = {
            ...oneGroup,
            [childItem.name]: tmpC,
          };
        } else if (childItem.type == 'implicit') { // 如果是implicit 类型，组装方式

          const tmpC: any = { operator: '=', value: childItem.assign.value };
          oneGroup = {
            ...oneGroup,
            [childItem.name]: tmpC,
          };
        } else { // 其他类型，从value里拿值组装

          // const tmp: any = { operator: values[(childItem.name + "_operator_" + number)], value: values[(childItem.name + "_value_" + number)] }
          const tmpC: any = getCorrentOperatorAndValue(values, number, childItem);
          oneGroup = {
            ...oneGroup,
            [childItem.name]: tmpC,
          };
        }
      });
    }

    rule.push(oneGroup);

  });

  return rule;
};

export const handleShouldValues = (groupList: Array<any>, checkedField: Array<string>) => {

  const should: any[] = [];

  for (let i = 0; i < groupList.length; i++) {

    if (checkedField.includes(groupList[i].description)) {

      let oneGroup: {} = {};
      for (let j = 0; j < groupList[i].items.length; j++) {

        const tmp: any = { operator: '=', value: groupList[i].items[j].assign.value };
        oneGroup = {
          ...oneGroup,
          [groupList[i].items[j].name]: tmp,
        };
      }
      should.push(oneGroup);
    }

  }

  return should;
};

export const handleFormatValues = (values: any, checkedField: any[], projectSid: string) => {

  /**  没写，operator为=，value为* , value是字符串类型，operator为~=
   *   区间，operator为<>，value为[x,y)
   */
  const formatValues = { ...values };
  for (let key in values) {

    if (key.includes('_min_') && ![undefined, null].includes(values[key])) {
      let max = key.replace('_min_', '_max_');
      if (values[key] > values[max]) {
        message.error('区间范围的开始值不能大于结束值');
        return;
      } else if (values[key] === values[max]) {
        message.error('区间范围的开始值必须小于结束值');
        return;
      }

      const keySplitArr = key.split('_min_');
      formatValues[`${keySplitArr[0]}_operator_${keySplitArr[1]}`] = '<>';
      formatValues[`${keySplitArr[0]}_value_${keySplitArr[1]}`] = '[' + values[(keySplitArr[0] + '_min_' + keySplitArr[1])] + ',' + values[(keySplitArr[0] + '_max_' + keySplitArr[1])] + ')';
    }
    // 因为还有值为0值的情况，所以用[undefined, null].includes(values[key]))这种方式，不用非的方式
    // console.log("=========== ,  key  key  key  key", key, values[key]);

    // if (key.includes('_value_') && [undefined, null].includes(values[key])) {

    //   const keySplitArr = key.split('_value_'); // exists
    //   console.log("=========== ,  key  key  key  key  keySplitArr ", key, values[key], keySplitArr);

    //   // formatValues[`${keySplitArr[0]}_operator_${keySplitArr[1]}`] = 'exists'
    //   // if (values[`${keySplitArr[0]}_operator_${keySplitArr[1]}`] === '~=') {
    //   //   formatValues[`${keySplitArr[0]}_value_${keySplitArr[1]}`] = ''
    //   // } else if (!values[`${keySplitArr[0]}_operator_${keySplitArr[1]}`]) {
    //   //   formatValues[`${keySplitArr[0]}_operator_${keySplitArr[1]}`] = '>'
    //   //   formatValues[`${keySplitArr[0]}_value_${keySplitArr[1]}`] = 0
    //   // }
    // }
  }
  // for (let key in formatValues) {
  //   // 姓名、性别、手机号为''，数值可填0，这几类情况是均不用校验的，所以此处判断[undefined, null]的情况
  //   // undefined是未填写的状态，null是填写了又删掉的状态
  //   if ([undefined, null].includes(formatValues[key])) {
  //     message.error('所选条件不能为空');
  //     return;
  //   }
  // } 
  const rules = handleFormValues(formatValues, checkedField, projectSid);
  return rules;
};
