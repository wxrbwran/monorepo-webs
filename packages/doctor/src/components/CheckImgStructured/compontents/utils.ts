import { cloneDeep, isEmpty } from 'lodash';
import { IMeta, IQuestions, ITopicQaItemApi, ITopicTemplateItemApi } from 'typings/imgStructured';

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

// 提交时3，把问题转成api接口参数格式  ui->api
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
      newJcdTabItem.data[inx] = inx === 1 ?
        fetchSubmitDataDdtk(jcdAmdTemp, topic.groupInx, clickSaveTime)
        : fetchSubmitData(jcdAmdTemp, topic.groupInx, clickSaveTime);
    });
    newJcdTabItem.data = newJcdTabItem.data.flat(); //  flat用于将嵌套的数组“拉平”，变成一维数组
    list.push(newJcdTabItem);
  });

  const addTypeTemps: CommonData = {};
  // 过滤出新添加的模板-s
  list.forEach(item => {
    let type = item.meta.title === 'JCD' ? '' : item.meta.title; // 检查单type = 方法+部位
    const currTabTemps = item.data.filter((qaItem) => {
      const { isAdd, question, answer } =  qaItem;
      if (item.meta.title === 'JCD' && qaItem.question_type === 'BASIC' && ['检查部位', '检查方法'].includes(question)) {
        const ans = answer?.[0];
        console.log('list555', list);
        if (question === '检查方法') {
          type = ans + type;
          item.meta.method = ans;
        } else {
          type = type + ans;
          item.meta.part = ans;
        }
      }
      return isAdd;
    }).map(qi => {
      const rItem: CommonData = {
        answer: qi.answer?.map(() => null),
        question: qi.question,
        group: qi.group,
        sid: qi.sid,
        question_type: qi.question_type,
      };
      if (qi.options) { rItem.options = qi.options; }
      if (qi?.uuid) { rItem.uuid = qi.uuid; }
      return rItem;
    });

    if (!isEmpty(currTabTemps)) {
      if (addTypeTemps[type]) {
        addTypeTemps[type].data = addTypeTemps[type].data.concat(currTabTemps);
      } else {
        addTypeTemps[type] = { data: currTabTemps, meta: item.meta };
      }
    }
  });
  console.log('addTypeTemps', Object.values(addTypeTemps));
  console.log('submitLis11t112', list);
  // 过滤出新添加的模板-e
  return {
    jcdList: { list },
    tempList: Object.values(addTypeTemps),
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
export const fetchInitData = (initData: { data: any[] }) => {
  const topicAll: any[] = [[], [], [], []]; // 多维数组
  initData?.data?.forEach(item => {
    findPosition(item, topicAll, 0);
  });
  console.log('topicAll11', topicAll);
  return topicAll;
};
// 处理检查单类型数据回显---e


// 回显时：单独处理多段填空，需要把模板格式转成ui需要的多维数组格式(先根据uuid分组，然后组内排序)   模板--->ui
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
  Object.values(groupDdtk).forEach(groupItem => {
    const groupList: ITopicTemplateItemApi[] = [];
    console.log('groupItem', groupItem);
    groupItem.forEach((qaItem: ITopicTemplateItemApi) => {
      console.log('qaItem', qaItem);
      const targetInx: number = Number(qaItem.group.split('-')[2]); // 根据此值进行小组内问题排序
      groupList[targetInx] = {
        ...qaItem,
        answer: qaItem?.answer!?.map(() => null),
      };
    });
    ddtk.push(groupList.filter(item => !!item));
  });
  console.log('ddtk332', ddtk);
  return ddtk;
};
