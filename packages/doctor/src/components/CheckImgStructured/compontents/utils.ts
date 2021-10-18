import { cloneDeep, isEmpty } from 'lodash';
import { IUserAddTopicItem, StructuredModelState } from 'packages/doctor/typings/model';
import { IMeta, IQuestions, ITopicQaItemApi, ITopicTemplateItemApi } from 'typings/imgStructured';
import { getDvaApp } from 'umi';

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
  question_type: 'COMPLETION',
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
// 只有提交检查单数据的meta中的sid是患者的，其余全是医生(问题列表的sid、模板中的meta的sid都是医生的)
const formatTemps = (temps: StructuredModelState, createdTime: number, imageId: string) => {
  const addTempList: any[] = [];
  const sid = window.$storage.getItem('sid');
  Object.keys(temps).forEach((type: string) => {
    const curTypeTemps: any = {
      data: [],
      meta: { createdTime, imageId, sid },
    };
    if (type === 'OTHER') {
      curTypeTemps.meta.title = 'OTHER';
    } else {
      const { part, method } = JSON.parse(type);
      curTypeTemps.meta = { ...curTypeTemps.meta, title: 'JCD', part, method };
    }
    let qaItem: IQuestions | IQuestions[] = {};
    temps[type].forEach((groupItem: IUserAddTopicItem) => {
      if (groupItem.qaType === 'COMPLETION') {
        groupItem.qa.map((ddtkItem: IQuestions, inx: number) => {
          qaItem = cloneDeep({ ...ddtkItem, sid });
          delete qaItem.isAdd;
          curTypeTemps.data.push( {
            ...qaItem,
            group: `1-0-${inx}`,
            answer: qaItem.answer.map(() => null),
          });
        });
      } else {
        qaItem = cloneDeep({ ...groupItem.qa, answer: [], sid });
        delete qaItem.isAdd;
        curTypeTemps.data.push( qaItem );
      }
    });
    addTempList.push(curTypeTemps);
  });
  return addTempList;
};
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

  // const addTypeTemps: CommonData = {};
  // 过滤出新添加的模板-s
  // list.forEach(item => {
  //   let type = item.meta.title === 'JCD' ? '' : item.meta.title; // 检查单type = 方法+部位
  //   const currTabTemps = item.data.filter((qaItem) => {
  //     const { isAdd, question, answer } =  qaItem;
  //     if (item.meta.title === 'JCD' && qaItem.question_type === 'BASIC' && ['检查部位', '检查方法'].includes(question)) {
  //       const ans = answer?.[0];
  //       console.log('list555', list);
  //       if (question === '检查方法') {
  //         type = ans + type;
  //         item.meta.method = ans;
  //       } else {
  //         type = type + ans;
  //         item.meta.part = ans;
  //       }
  //     }
  //     return isAdd;
  //   }).map(qi => {
  //     const rItem: CommonData = {
  //       answer: qi.answer?.map(() => null),
  //       question: qi.question,
  //       group: qi.group,
  //       sid: qi.sid,
  //       question_type: qi.question_type,
  //     };
  //     if (qi.options) { rItem.options = qi.options; }
  //     if (qi?.uuid) { rItem.uuid = qi.uuid; }
  //     return rItem;
  //   });

  //   if (!isEmpty(currTabTemps)) {
  //     if (addTypeTemps[type]) {
  //       addTypeTemps[type].data = addTypeTemps[type].data.concat(currTabTemps);
  //     } else {
  //       addTypeTemps[type] = { data: currTabTemps, meta: item.meta };
  //     }
  //   }
  // });
  // 过滤出新添加的模板-e
  let addTypeTemps = [];
  const userAddTemps = getDvaApp()._store.getState().structured;
  if (!isEmpty(jcdTabList) && !isEmpty(userAddTemps)) {
    addTypeTemps = formatTemps(userAddTemps, clickSaveTime, jcdTabList[0].meta.imageId);
  }
  console.log('addTypeTemps', addTypeTemps);
  console.log('submitLis11t112', list);
  return {
    jcdList: { list },
    tempList: addTypeTemps,
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

// 处理用户新加问题多tab共享-s
// 添加或编辑
export const handleEditUserTopic = (
  userAddTopic: StructuredModelState,
  questions: IQuestions,
  tempKey: string,
  editIndex: number,
  tabKey: string,
  isDdtk?: boolean,
) => {
  const returnAddData = (actionType: string) => {
    const qadata = isDdtk ? questions[editIndex][0] : questions[editIndex];
    return {
      actionType,
      qaType: qadata.question_type,
      qa: questions[editIndex],
      actionTabKey: tabKey, // 表示最后修改此问题的是哪个tab，此tab可以使用模板里存的答案，其余tab答案清空
      uuid: qadata.uuid,
    };
  };
  const newTopicData = cloneDeep(userAddTopic);
  // 检测新加问题池里，如果此检查方法已存在则更新，否则添加
  if (newTopicData[tempKey]) {
    let isHas = false;
    newTopicData[tempKey].forEach((item: any, inx: number) => {
      // 判断当前操作的问题id是否存在，如果存在则更新问题，否则添加。
      const quesUuid = isDdtk ? questions[editIndex][0] : questions[editIndex];
      if (item.uuid === quesUuid.uuid) {
        isHas = true;
        newTopicData[tempKey][inx] = returnAddData('edit');
      }
    });
    if (!isHas) {
      newTopicData[tempKey].push(returnAddData('add'));
    }
  } else {
    newTopicData[tempKey] = [returnAddData('add')];
  }
  getDvaApp()._store.dispatch({
    type: 'structured/saveAddQa',
    payload: {
      ...newTopicData,
    },
  });
};
// 删除
export const handleDelUserTopic = (userAddTopic: StructuredModelState, questions: IQuestions, tempKey: string, editIndex: number, isDdtk?: boolean) => {
  const newTopicData = cloneDeep(userAddTopic);
  newTopicData[tempKey].forEach((item: any, index: number) => {
    const quesUuid = isDdtk ?  questions[editIndex][0] :  questions[editIndex];
    if (item.uuid === quesUuid.uuid) {
      newTopicData[tempKey][index].actionType = 'delete';
    }
  });
  getDvaApp()._store.dispatch({
    type: 'structured/saveAddQa',
    payload: {
      ...newTopicData,
    },
  });
};
// 监听到usertopic有变化，在tempkey相同的基本上根据userAddTopic与当前questions做对比，做增删改操作
export const watchUserTopicChange = (
  userAddTopic: StructuredModelState,
  questions: IQuestions,
  tempKey: string,
  tabKey: string,
  questionType: string[],
  isDdtk?: boolean,
) => {

  if (!isEmpty(userAddTopic) && userAddTopic[tempKey]) {
    const choiceTopic = userAddTopic[tempKey]
    //questionType: ['RADIO', 'CHECKBOX'] ['COMPLETION'] ['TEXT']根据题型过滤
      .filter((item: IUserAddTopicItem) => questionType.includes(item.qaType));
    choiceTopic.forEach((uItem: IUserAddTopicItem) => {
      let hasUuid = false; // 是否有uuid
      let currQaInx = 0; // 当前匹配到的qa项的索引
      // 匹配出当前项在ques是否存在，存在的话，把索引存起来
      questions.forEach((qaItem: any, inx: number) => {
        const uuidEqual = isDdtk ? qaItem[0].uuid === uItem.uuid : qaItem.uuid === uItem.uuid;
        if (uuidEqual) {
          hasUuid = true;
          currQaInx = inx;
        }
      });

      // answer处理：当前tab: 显示模板里的answer，其余tab均作清空处理
      const editQa = cloneDeep(uItem.qa);
      if (uItem.actionTabKey !== tabKey) {
        if (isDdtk) {
          editQa.forEach((uqaItem: IQuestions) => {
            uqaItem.answer = uqaItem.answer.map(() => null);
          });
        } else {
          editQa.answer = [];
        }
      }
      // 有uuid，表示之前添加过了，此次为edit或del
      if (hasUuid) {
        if (uItem.actionType === 'edit') {
          questions[currQaInx] = editQa;
        } else if (uItem.actionType === 'delete') {
          questions.splice(currQaInx, 1);
        }
      } else if (uItem.actionType !== 'delete') {  // 当前questions列表没有此uuid两种情况 1新添加的，2已删除的.
        questions.push(editQa);
      }
    });
    return questions;
  } else {
    return false;
  }
};
// 处理用户新加问题多tab共享-e
