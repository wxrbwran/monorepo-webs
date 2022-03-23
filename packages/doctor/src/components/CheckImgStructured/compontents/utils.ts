import { cloneDeep } from 'lodash';
import { IMeta, IQuestions, ITopicQaItemApi, ITopicTemplateItemApi } from 'typings/imgStructured';
import { IJcdTabItem } from './type';
import { message } from 'antd';

export const outTypes: CommonData = {
  HYD: '化验单',
  JCD: '检查单',
  OTHER: '其他医学单据',
  JWS: '既往史',
  NOT_CLEAR: '图片不清晰',
  NOT_HYD_JCD: '非医学单据',
};

export const checkboxData = {
  question_type: 'RADIO',
  question: '',
  answer: [],
  options: ['', '', ''],
};

export const textData = {
  question_type: 'TEXT',
  question: '',
  answer: [],
};

// 多段填空是二维数组嵌套qa里面每个item是多个问答组成的一道题
export const ddtkData = (uuid: string) => {
  return {
    uuid,
    question_type: 'COMPLETION',
    question: '',
    answer: [],
    // isAdd: true,
  };
};

export const ddtkExample = [
  { q: '形态', a: '有' },
  { q: '大小', a: '1.5×1×1' },
];

export const baseField: CommonData = {
  'orgName': { text: '检查机构', inx: '0' },
  'measured_at': { text: '时间', inx: '1' },
  'part': { text: '检查部位', inx: '2' },
  'method': { text: '检查方法', inx: '3' },
  'name': { text: '检查名称', inx: '4' },
  'djName': { text: '单据名称', inx: '3' },
};

export const baseFieldReverse: CommonData = {
  '检查机构': 'orgName',
  '时间': 'measured_at',
  '检查部位': 'part',
  '检查方法': 'method',
  '检查名称': 'name',
  '单据名称': 'djName',
};
export const msg = (content:string, type: string = 'success') => {
  message[type]({ content });
};
// 提交时3，把问题转成api接口参数格式  ui->api
export const fetchSubmitData = (questions: IQuestions[], startInx: number | string, clickSaveTime: number, gid?: string) => {
  const backData = questions.map((item, inx) => {
    const newItem = cloneDeep(item);
    // delete newItem.isAdd;
    const returnData: CommonData = {
      ...newItem,
      // 例： 1-1（题目）  1-1-0（题目下每一个问答内容） 1-1-1(第二个问答)依次类推
      // group: inx === 0 ? startInx : `${startInx}-${inx - 1}`,
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

// 提交时2：多段填空时，多段填空转成api结构 ui->api
export const fetchSubmitDataDdtk = (questions: IQuestions[], startInx: number, clickSaveTime: number ) => {
  const backData: any[] = [];
  console.log('ddtkkkkkquestions', questions);
  questions.forEach((ddtkQaList, groupInx) => {
    const qaList = fetchSubmitData(ddtkQaList, `${startInx}-${groupInx}`, clickSaveTime);
    backData.push(...qaList);
  });
  console.log('backData', backData);
  return backData;
};


// 点击保存提交时，把每个检查单的数据格式化一维数组格式，并提取新添加的模板。
interface IJcdItem {
  data: {
    data: ITopicTemplateItemApi[],
    groupInx: number; // 索引位置
  }[],
  meta: IMeta;
}

interface IIlist {
  data: ITopicTemplateItemApi[];
  meta: IMeta;
}

// 提交时1，ui结构转成大平层格式，返回jcd列表  ui--->api
export const formatJcdSubmitData = (jcdTabList: IJcdItem[], clickSaveTime: number) => {
  console.log('jcdTabList', jcdTabList);
  const list: IIlist[] = [];
  jcdTabList.forEach((jcdTabItem) => {
    const newJcdTabItem = cloneDeep(jcdTabItem);
    // 0 basic 1ddtk 2xzt 3wdt
    jcdTabItem.data.forEach((topic, inx) => {
      const jcdAmdTemp = jcdTabItem.data[inx].data;
      // @ts-ignore
      newJcdTabItem.data[inx] = (inx === 1 || inx === 4) ?
        fetchSubmitDataDdtk(jcdAmdTemp, topic.groupInx, clickSaveTime)
        : fetchSubmitData(jcdAmdTemp, topic.groupInx, clickSaveTime);
    });
    newJcdTabItem.data = newJcdTabItem.data.flat(); //  flat用于将嵌套的数组“拉平”，变成一维数组
    list.push(newJcdTabItem);
  });

  console.log('submitLis11t112', list);
  return {
    jcdList: { list },
  };
};

// 回显时2：处理检查单类型数据回显---s  dimension维度，第几层。 递归根据group找到所在位置 api->ui
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
      uuid: item.uuid,
    });
  } else {
    findPosition(item, topicAll[Number(spArr[dimension])], dimension + 1);
  }
};
// 回显时1：后端api返回的平铺格式转成ui格式   api--->ui
export const fetchInitData = (initData: IJcdTabItem) => {
  const topicAll: any[] = [[], [], [], []]; // 多维数组
  initData?.data?.forEach(item => {
    findPosition(item, topicAll, 0);
  });
  console.log('topicAll11', topicAll);
  return topicAll;
};
// 处理检查单类型数据回显---e

// 回显时：单独处理多段填空，需要把平铺格式转成ui需要的多维数组格式(先根据uuid分组，然后组内排序)   模板--->ui
export const formatTempDdtk = (tkTmpList: any[]) => {
  console.log(399939392832, tkTmpList);
  const groupDdtk: CommonData = {};
  const ddtk: ITopicTemplateItemApi[][] = [];
  tkTmpList.forEach(item => {
    if (groupDdtk[item.uuid]) {
      groupDdtk[item.uuid].push(item);
    } else {
      groupDdtk[item.uuid] = [item];
    }
  });
  console.log('groupDdtk', groupDdtk);
  Object.values(groupDdtk).forEach(groupItem => {
    const groupList: ITopicTemplateItemApi[] = [];
    groupItem.forEach((qaItem: ITopicTemplateItemApi) => {
      // 新版多段填空，一组题存在一个题目，例： 1-1（题目）  1-1-0（题目下每一个问答内容） 1-1-1(第二个问答)依次类推
      const targetInx: number = Number(qaItem.group.split('-')[2]); // 根据此值进行小组内问题排序
      // 只有题止的group得到的targetInx是NAN，此时inx设为0；（ui渲染时，默认认为第一个元素为题目，其余为问答）
      const inx: number = isNaN(targetInx) ? 0 : targetInx + 1;
      console.log('inx', inx);
      groupList[inx] = {
        ...qaItem,
        answer: qaItem.answer.filter((ansItem: null | string) => !!ansItem),
      };
    });
    ddtk.push(groupList.filter(item => !!item));
  });
  console.log('ddtk332', ddtk);
  return ddtk;
};

// 处理用户新加问题多tab共享-e

export const getSource = (source: string, sid: string, isPureText?: boolean) => {
  if (source === 'SYSTEM') {
    if (isPureText) return '官方';
    return '<span class="SYSTEM">官方</span>';
  } else if (source === 'DOCTOR' && sid === window.$storage.getItem('sid')) {
    if (isPureText) return '自己';
    return '<span class="ONESELF">自己</span>';
  } else {
    if (isPureText) return '他人';
    return '<span class="OTHERS">他人</span>';
  }
};

export const DdtkSeniorInlineType: { [key: string]: string } = {
  INLINE_COMPLETION: '填空题',
  INLINE_RADIO: '单选题',
  INLINE_CHECKBOX: '多选题',
  INLINE_DATE: '日期类型题',
};

