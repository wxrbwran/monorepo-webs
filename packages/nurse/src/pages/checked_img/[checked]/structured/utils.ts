import { cloneDeep } from 'lodash';
import { IMeta, IQuestions, ITmpList, ITopicQaItemApi, ITopicTemplateItemApi } from 'typings/imgStructured';
import uuid from 'react-uuid';

export const outTypes: CommonData = {
  HYD: '化验单',
  JCD: '检查单',
  OTHER: '其他医学单据',
  NOT_CLEAR: '图片不清晰',
  NOT_HYD_JCD: '非医学单据',
};

export const checkboxData = {
  question_type: 'RADIO',
  isAdd: true,
  question: '',
  answer: [],
  options: ['', ''],
};

export const textData = {
  question_type: 'TEXT',
  isAdd: true,
  question: '',
  answer: [],
};

// 多段填空是二维数组嵌套qa里面每个item是多个问答组成的一道题
export const ddtkData = {
  question_type: 'Completion',
  isAdd: true,
  question: '',
  answer: [],
};

export const ddtkExample = [
  { q: '肝脏形态', a: '有' },
  { q: '大小', a: '1.5×1×1' },
  { q: '边缘', a: '清' },
  { q: '各叶比例', a: '2:2:2' },
];

export const baseField: CommonData = {
  'orgName': { text: '检查机构', inx: '0' },
  'measured_at': { text: '时间', inx: '1' },
  'position': { text: '检查部位', inx: '2' },
  'method': { text: '检查方法', inx: '3' },
  'name': { text: '检查名称', inx: '4' },
  'djName': { text: '单据名称', inx: '3' },
};

export const baseFieldReverse: CommonData = {
  '检查机构': 'orgName',
  '时间': 'measured_at',
  '检查部位': 'position',
  '检查方法': 'method',
  '检查名称': 'name',
  '单据名称': 'djName',
};

// 提交 时，把问题转成api接口参数格式
export const fetchSubmitData = (questions: IQuestions[], startInx: number | string, clickSaveTime: number, gid?: string) => {
  // console.log('gid', gid);
  const backData = questions.map((item, inx) => {
    const newItem = cloneDeep(item);
    // delete newItem.isAdd;
    const returnData: CommonData = {
      ...newItem,
      group: `${startInx}-${inx}`,
      sid: window.$storage.getItem('sid'),
      createdTime: clickSaveTime,
    };
    if (gid) {
      // uuid：添加问题模板时，用来标识多段填空，哪些问题为一组，一组问答的uui是一致的。
      returnData.uuid = gid;
    }
    return returnData;
  });
  return backData;
};

// 提交多段填空时，多段填空转成api结构
export const fetchSubmitDataDdtk = (questions: IQuestions[], startInx: number, clickSaveTime: number ) => {
  const backData: any[] = [];
  console.log('ddtkkkkkquestions', questions);
  questions.forEach((ddtkQaList, groupInx) => {
    const qaList = fetchSubmitData(ddtkQaList, `${startInx}-${groupInx}`, clickSaveTime, ddtkQaList[0].isAdd ? uuid() : undefined);
    backData.push(...qaList);
  });
  console.log('backData', backData);
  return backData;
};

// 多段填空，需要把模板格式转成ui需要的多维数组格式(先根据uuid分组，然后组内排序)   模板--->ui
export const formatTempDdtk = (tkTmpList: any[]) => {
  console.log(399939392832);
  const groupDdtk: CommonData = {};
  const ddtk: ITopicTemplateItemApi[][] = [];
  tkTmpList.forEach(item => {
    if (groupDdtk[item.uuid]) {
      groupDdtk[item.uuid].push(item);
    } else {
      groupDdtk[item.uuid] = [item];
    }
  });
  Object.values(groupDdtk).forEach(groupItem => {
    const groupList: ITopicTemplateItemApi[] = [];
    groupItem.forEach((qaItem: ITopicTemplateItemApi) => {
      const targetInx: number = Number(qaItem.group.split('-')[2]); // 根据此值进行小组内问题排序
      groupList[targetInx] = {
        ...qaItem,
        answer: qaItem?.answer!?.map(() => '  '),
      };
    });
    ddtk.push(groupList.filter(item => !!item));
  });
  return ddtk;
};

// 处理检查单类型数据回显---s
// dimension维度，第几层
export const findPosition = (item: ITopicQaItemApi, topicAll: any[], dimension: number) => {
  const spArr: string[] = item.group.split('-'); // [0,1]  [1,0,0]
  if (!topicAll[Number(spArr[dimension])]) {
    topicAll[Number(spArr[dimension])] = [];
  }
  if (spArr.length === dimension + 2) {
    topicAll[Number(spArr[dimension])].push({
      question: item.question,
      answer: item.answer,
      options: item?.options || [],
      question_type: item.question_type,
    });
  } else {
    findPosition(item, topicAll[Number(spArr[dimension])], dimension + 1);
  }
};
// 后端api返回的平铺格式转成ui格式   api--->ui
export const fetchInitData = (initData: { data: any[] }) => {
  const topicAll: any[] = [[], [], [], []]; // 多维数组
  initData?.data?.forEach(item => {
    findPosition(item, topicAll, 0);
  });
  console.log('topicAll', topicAll);
  return topicAll;
};
// 处理检查单类型数据回显---e

// 点击保存提交时，把每个检查单的数据和 打开到保存时间段产生的模板做拼接。然后格式化一维数组格式，并提取新添加的模板。
// 检查单的数据是原始ui的questions, 一个tab返回的是一个数组，数组里顺序是基本、多段、选择、问答依次排序
// 模板的数据是接口返回的一维数据（根据类型和group进行分组），格式后顺序是基本、多段、选择、问答依次排序
interface IJcdItem {
  data: {
    data: ITopicTemplateItemApi[],
    groupInx: number; // 索引位置
  }[],
  meta: IMeta;
}

// 过滤掉空的：模板返回的group并不是依次排列的，例如 3-0-0，3-0-1，下一个可能 就是5-0-0 5-0-1。4的位置就是空的了，过滤掉
const filterTempData = (data:any) => {
  const temList: any[] = [];
  data.forEach((tempitem: any, inx: number) => {
    if (tempitem) {
      let validTemp = tempitem.filter((item: any) => !!item);
      if (inx === 1) { // 多段填空
        validTemp = validTemp.map((qa:ITopicTemplateItemApi ) => {
          return qa.map((qaitem: any) => {
            return { ...qaitem, idAdd: false };
          });
        });
      }
      temList.push(validTemp);
    } else {
      temList.push([]);
    }
  });
  console.log('aa110', temList);
  return temList;
};
const filterTypeTemps = (data:any) => {
  const newData: CommonData = {};
  Object.keys(data).forEach(typeKey => {
    newData[typeKey] = filterTempData(data[typeKey]);
  });
  return newData;
};
interface IIlist {
  data: ITopicTemplateItemApi[];
  meta: IMeta;
}
interface ITempItem {
  data: ITopicTemplateItemApi;
  meta: IMeta;
}
// 处理停留时间段产生的模板，根据title(type)分类
const formatTempGroup = (tempList: ITempItem[]) => {
  console.log('tempList', tempList);
  const tempData: ITmpList = {};
  tempList.forEach((item: ITempItem) => {
    const type = item.meta.title;
    if (!tempData[type]) {
      tempData[type] = [];
    }
    tempData[type] = fetchInitData({ data: tempData[type].concat(item.data) });
  });
  return tempData;
};
// 提交时，ui结构转成大平层格式，返回jcd列表（把当前列表和时间段产生的模板拼接起来）和模板列表   ui--->api
export const formatJcdSubmitData = (jcdTabList: IJcdItem[], tempList: { list: ITempItem[] }, clickSaveTime: number) => {
  const temps: CommonData = filterTypeTemps(formatTempGroup(tempList.list));
  const list: IIlist[] = [];
  jcdTabList.forEach((jcdTabItem) => {
    const newJcdTabItem = cloneDeep(jcdTabItem);
    // @ts-ignore     0 basic 1ddtk 2xzt 3wdt
    jcdTabItem.data.forEach((topic, inx) => {
      const jcdAmdTemp = jcdTabItem.data[inx].data.concat(temps?.[jcdTabItem.meta.title]?.[inx] || []);
      // @ts-ignore
      newJcdTabItem.data[inx] = inx === 1 ? fetchSubmitDataDdtk(jcdAmdTemp, topic.groupInx, clickSaveTime) : fetchSubmitData(jcdAmdTemp, topic.groupInx, clickSaveTime);
    });
    newJcdTabItem.data = newJcdTabItem.data.flat();
    list.push(newJcdTabItem);
  });
  console.log('submitLis11t112', list);
  const addTypeTemps: CommonData = {};
  // 过滤出新添加的模板-s
  list.forEach(item => {
    const currTabTemps = item.data.filter(qaItem => qaItem.isAdd).map(qi => {
      const rItem: CommonData = {
        answer: qi.answer?.map(() => '  '),
        question: qi.question,
        group: qi.group,
        sid: qi.sid,
        question_type: qi.question_type,
      };
      if (qi.options) { rItem.options = qi.options; }
      if (qi?.uuid) { rItem.uuid = qi.uuid; }
      return rItem;
    });
    const type = item.meta.title;
    if (currTabTemps) {
      if (addTypeTemps[type]) {
        addTypeTemps[type].data = addTypeTemps[type].data.concat(currTabTemps);
      } else {
        addTypeTemps[type] = { data: currTabTemps, meta: item.meta };
      }
    }
  });
  console.log('addTypeTemps', addTypeTemps);
  // 过滤出新添加的模板-e
  return {
    jcdList: { list },
    tempList: Object.values(addTypeTemps),
    // tempList: addTypeTemps.flat(),
  };
};
