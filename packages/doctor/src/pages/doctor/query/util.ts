
import { message } from 'antd';
import * as api from '@/services/api';
import moment from 'moment';

export const DoctorSourceType = '15';
// export const ResearchSourceType = '4';
// export const SubectiveScaleSourceType = '5';
// export const CrfScaleSourceType = '6';
// export const ObjectiveSourceType = '7';

// 将动态的item请求接口转换成真实的静态items，(请求自己的真实内容)
export const transformDynamicToStatic = (item: { type: string, name: string, assign: { value: string } }, projectSid: string, projectRoleType: string, sourceType: string, value?: string, fatherValue?: string) => {

  console.log('============= transformDynamicToStatic 1');

  return new Promise<any[]>((resolve, reject) => {

    if (item.type.includes('dynamic')) {
      // 动态加载
      const params: { kp: string, value?: string, rsList: { sid: string, roleType?: string }[], scaleType?: string, sourceType: string, fatherValue?: string } = {
        kp: item.name,
        value: value,
        //// 登陆者 sid,   roleType 登陆者角色
        // 院外 登陆者 sid,   roleType 登陆者角色  nsId: 登陆者nsid  和机构的sid，机构角色 nsId: 机构nsid
        rsList: [{ sid: projectSid, roleType: projectRoleType }],
        sourceType: sourceType,
        fatherValue: fatherValue,
      };

      console.log('============= transformDynamicToStatic');

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

export const utilTimeType = ['date', 'timestamp', 'ms', 'time'];
export const utilNumType = ['number', 'int', 'float'];
export const utilStringType = ['string'];
export const utilBoolType = ['bool'];
export const utilYesNoType = ['refs']; // 有无数据

export const operationConfig = {
  '=': '=',
  '<': '<',
  '>': '>',
  '范围': '<>',
  '≤': '<=',
  '≥': '>=',
  '≠': '!=',
  '包含': '~=',
};
export const stringOperationType = ['包含'];
export const rangNumberOperationType = ['范围'];
export const numberOperationType = ['=', '<', '>', '范围', '≤', '≥', '≠'];

export const getItemConfigFormItem = (item, extraConfig, ruleItem?, searchTimeRange?, projectSid?) => {

  if (item.name.length > 0) {
    let tmpC: {} = extraConfig ?? {};

    console.log('===================  getItemConfigFormItem ruleItem', JSON.stringify(ruleItem));

    if (ruleItem) {

      console.log('===================  getItemConfigFormItem item.type', item.type);

      if (item.type == 'primary') { // primary 类型，组装方式

        tmpC = {
          ...tmpC,
          ...{ operator: '=', value: projectSid },
        };
      } else if (utilTimeType.includes(item.type)) {

        // [1646150400000,1646409600000)
        if (searchTimeRange?.length > 1) {
          tmpC = {
            ...tmpC,
            ...{ operator: '<>', value: `[${moment(searchTimeRange[0]).valueOf()},${moment(searchTimeRange[1]).valueOf()})` },
          };
        } else {
          tmpC = {
            ...tmpC,
            ...{ operator: '=', value: '*' },
          };
        }
      } else if (item.type == 'implicit' || item.type == 'final' || item.type == 'node') {

        tmpC = {
          ...tmpC,
          ...{ operator: '=', value: item?.assign?.value },
        };
      } else if (item.type == 'refs') { // refs 有无数据

        tmpC = {
          ...tmpC,
          ...{ operator: operationConfig[ruleItem.operation], exist: ruleItem.value, value: item?.assign?.value },
        };
      } else {

        let tempCTemp = {} = {};
        const value = ruleItem.operation == '范围' ? `[${ruleItem.min},${ruleItem.max})` : ruleItem.value;
        tempCTemp = { operator: operationConfig[ruleItem.operation], value: value };

        if (ruleItem.name.choiceType == 'medical-img-noReference') {
          if (numberOperationType.includes(ruleItem.operation) && utilNumType.includes(item.type)) { // 数字类型将值给type为number的key
            tmpC = {
              ...tmpC,
              ...tempCTemp,
            };
          } else if (stringOperationType.includes(ruleItem.operation) && item.type == 'string') { // 字符串类型将值给type为string的key
            tmpC = {
              ...tmpC,
              ...tempCTemp,
            };
          } else {
            tmpC = {
              ...tmpC,
              ...{ operator: '=', value: '*' },
            };
          }
        } else {
          tmpC = {
            ...tmpC,
            ...tempCTemp,
          };
        }
      }
      console.log('===================  getItemConfigFormItem tmpC', JSON.stringify(tmpC));
    } else { // 自己没有赋值过
      if (item.type == 'primary') { // primary 类型，组装方式

        tmpC = {
          ...tmpC,
          ...{ operator: '=', value: projectSid },
        };
      } else if (utilTimeType.includes(item.type)) {
        // [1646150400000,1646409600000)
        if (searchTimeRange?.length > 1) {
          tmpC = {
            ...tmpC,
            ...{ operator: '<>', value: `[${moment(searchTimeRange[0]).valueOf()},${moment(searchTimeRange[1]).valueOf()})` },
          };
        } else {
          tmpC = {
            ...tmpC,
            ...{ operator: '=', value: '*' },
          };
        }
      } else {
        tmpC = {
          ...tmpC,
          ...{ operator: '=', value: item?.assign?.value ?? '*' },
        };
      }
    }

    console.log('===================  getItemConfigFormItem tmpC', JSON.stringify({
      [item.name]: {
        assign: item.assign,
        description: item.description,
        show: item.show,
        type: item.type,
        ...tmpC,
      },
    }));


    return (
      {
        [item.name]: {
          assign: item.assign,
          description: item.description,
          show: item.show,
          type: item.type,
          ...tmpC,
        },
      }
    );
  } else {
    return {};
  }
};

// // 一直通过children选下一级别，当无children时，看看有没有items需要添加进来
export const getChildItemsConfig = (item, extraConfig, ruleItem?, searchTimeRange?, projectSid?) => {

  if (item.children?.length > 0) {

    return {
      ...getItemConfigFormItem(item, extraConfig, ruleItem, searchTimeRange, projectSid),
      ...getChildItemsConfig(item.children[0], extraConfig, ruleItem, searchTimeRange, projectSid),
    };
  } else {


    let config = getItemConfigFormItem(item, extraConfig, ruleItem, searchTimeRange, projectSid);
    console.log('============= config config', JSON.stringify(config));

    for (const childItem of (item.items ?? [])) {
      config = {
        ...config,
        ...getItemConfigFormItem(childItem, extraConfig, ruleItem, searchTimeRange, projectSid),
      };
    }
    return config;
  }
};

export const transformQueryPageTeamsToFetchQueryIdShoulds = (searchRangeItems, searchTimeRange) => {

  const checkedSearchs = searchRangeItems.filter((item) => item.checked);

  console.log('================= transformQueryPageTeamsToFetchQueryIdShoulds start', JSON.stringify(checkedSearchs));

  const should_1 = [];
  for (const checked of checkedSearchs) {
    const nameConfig = getChildItemsConfig(checked, {});
    should_1.push(nameConfig);
  }
  console.log('================= transformQueryPageFieldsToFetchQueryIdRules should_1', JSON.stringify(should_1));
  return should_1;
};

export const transformQueryPageFieldsToFetchQueryIdRules = (fields, allField, searchTimeRange, projectSid) => {

  console.log('================= transformQueryPageFieldsToFetchQueryIdRules start', JSON.stringify(fields));

  const should_1 = [];
  for (const field of fields) {
    let nameConfig = getChildItemsConfig(field, { search: true }, null, searchTimeRange, projectSid);
    // 加上顶级的
    console.log('================= nameConfig', JSON.stringify(nameConfig));
    // const parentItems = allField?.items.filter((fieldItem) => fieldItem.name == field.parentName);
    // if (parentItems.length > 0) {
    //   nameConfig = {
    //     ...nameConfig,
    //     ...getItemConfigFormItem(parentItems[0], { search: true }),
    //   };
    // }

    should_1.push(nameConfig);
  }
  console.log('================= transformQueryPageFieldsToFetchQueryIdRules should_1', JSON.stringify(should_1));
  return should_1;
};

export const transformQueryPageAllRuleToFetchQueryIdRules = (allRule, searchTimeRange, projectSid, allField, searchRangeItems, fields) => {

  const should_1 = transformQueryPageTeamsToFetchQueryIdShoulds(searchRangeItems, searchTimeRange);
  const fieldShould_1 = transformQueryPageFieldsToFetchQueryIdRules(fields, allField, searchTimeRange, projectSid);
  const rules = [];
  for (const rule of allRule) {
    const must: any[] = [];
    for (const ruleItem of rule.items) {

      let nameConfig = getChildItemsConfig(ruleItem.name, {}, ruleItem, searchTimeRange, projectSid);
      // const parentItems = allField?.items.filter((fieldItem) => fieldItem.name == ruleItem.name.parentName);
      // if (parentItems.length > 0) {
      //   nameConfig = {
      //     ...nameConfig,
      //     ...getItemConfigFormItem(parentItems[0], {}, ruleItem, searchTimeRange, projectSid),
      //   };
      // }
      must.push(nameConfig);
    }
    rules.push({
      match: {
        must: must,
        should_1: should_1,
      },
    });
  }

  if (rules.length > 0) {
    rules[0].match.should_1 = [...rules[0].match.should_1, ...fieldShould_1];
  }

  console.log('================= transformQueryPageAllRuleToFetchQueryIdRules rules', JSON.stringify(rules));
  return rules;
};

