import { cloneDeep, isEmpty } from 'lodash';
import { IUserAddTopicItem, StructuredModelState } from 'packages/doctor/typings/model';
import { IMeta, IQuestions, ITopicQaItemApi, ITopicTemplateItemApi } from 'typings/imgStructured';
import { getDvaApp } from 'umi';
import { IJcdTabItem } from './type';
import { message } from 'antd';

export const outTypes: CommonData = {
  HYD: '化验单',
  JCD: '检查单',
  OTHER: '其他医学单据',
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
  // console.log('gid', gid);
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
// 只有提交检查单数据的meta中的sid是患者的，其余全是医生(问题列表的sid、模板中的meta的sid都是医生的)
const formatTemps = (temps: StructuredModelState, createdTime: number, imageId: string) => {
  const addTempList: any[] = [];
  const sid = window.$storage.getItem('sid');
  Object.keys(temps).forEach((type: string) => {
    if (type !== 'currEditData') {
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
      temps[type].filter((tempsItem: IUserAddTopicItem) => tempsItem?.actionType !== 'delete')
        .forEach((groupItem: IUserAddTopicItem) => {
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
    }
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
    console.log('groupItem', groupItem);
    groupItem.forEach((qaItem: ITopicTemplateItemApi) => {
      console.log('qaItem', qaItem);
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

// 处理用户新加问题多tab共享-s
interface IEditTopicProps {
  userAddTopic: StructuredModelState,
  questions: IQuestions,
  tempKey: string,
  editIndex: number,
  tabKey: string,
  questionsType?: string,
}
// 添加或编辑
export const handleEditUserTopic = (props: IEditTopicProps) => {
  const { userAddTopic, questions, tempKey, editIndex, tabKey, questionsType } = props;
  const qadata = questionsType === 'COMPLETION' ? questions[editIndex][0] : questions[editIndex];
  const returnAddData = (actionType: string) => {
    return {
      actionType,
      qaType: qadata.question_type,
      uuid: qadata.uuid,
      // 模板里的问题答案清空
      qa: questionsType === 'COMPLETION' ? questions[editIndex].map((item: IQuestions[] | IQuestions) => {
        return { ...item, answer: item.answer.map(() => null) };
      }) : { ...questions[editIndex], answer: [] },
    };
  };
  const newTopicData = cloneDeep(userAddTopic);
  // 检测新加问题池里，如果此检查方法已存在则更新，否则添加
  if (newTopicData[tempKey]) {
    let isHas = false;
    newTopicData[tempKey].forEach((item: any, inx: number) => {
      // 判断当前操作的问题id是否存在，如果存在则更新问题，否则添加。
      if (item.uuid === qadata.uuid) {
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
    // 保存下，当前编辑的问题的id.监听到变了，并且问题列表里有id，那就做出更新处理，如果是当前tabkey，则保留 问题答案，否则清空答案
    payload: {
      ...newTopicData,
      currEditData: {
        uuid: qadata.uuid, // 当前编辑的问题的uuid
        qaType: qadata.question_type, // 当前编辑的问题的类型
        tempKey, // 当前变化的是哪种分类
        tabKey,
      },
    },
  });
};
interface IDelTopicProps {
  userAddTopic: StructuredModelState,
  questions: IQuestions,
  tempKey: string,
  editIndex: number,
  questionsType?: string,
  tabKey: string;
}
// 删除
export const handleDelUserTopic = (props: IDelTopicProps) => {
  const { userAddTopic, questions, tempKey, editIndex, questionsType, tabKey } = props;
  const newTopicData = cloneDeep(userAddTopic);
  // 是否redux中存有些条问题：存在，表示用户添加过又清空问题的，不存在，表示用户添加新题后啥也没填，就点击其它区域的情况
  // 返回此字段，组件根据返回值做判断是否操作question
  let isHas = false;
  const quesUuid = questionsType === 'COMPLETION' ?  questions[editIndex][0] :  questions[editIndex];
  newTopicData[tempKey]?.forEach((item: any, index: number) => {
    if (item.uuid === quesUuid.uuid) {
      newTopicData[tempKey][index].actionType = 'delete';
      isHas = true;
      getDvaApp()._store.dispatch({
        type: 'structured/saveAddQa',
        payload: {
          ...newTopicData,
          currEditData: {
            uuid: quesUuid.uuid, // 当前编辑的问题的uuid
            qaType: quesUuid.question_type, // 当前编辑的问题的类型
            tempKey, // 当前变化的是哪种分类
            tabKey,
          },
        },
      });
    }
  });
  return isHas;
};
// 监听到usertopic有变化
export const watchUserTopicChange = (
  userAddTopic: StructuredModelState,
  questions: IQuestions,
  tempKey: string,
  tabKey: string,
  questionType: string[],  // ['RADIO', 'CHECKBOX'] ['COMPLETION'] ['TEXT']根据题型过滤
  isDdtk?: boolean,
) => {
  const { tabKey: curTabKey, uuid: curUuid } = userAddTopic.currEditData || {};

  if (!isEmpty(userAddTopic) && userAddTopic[tempKey] && tabKey !== curTabKey) {
    // 先过滤出模板中同类型的问题
    const methodPartTopic = userAddTopic[tempKey]
      .filter((item: IUserAddTopicItem) => questionType.includes(item.qaType));

    methodPartTopic.forEach((uItem: IUserAddTopicItem) => {
      let hasUuid = false; // 是否有uuid 有uuid，表示之前添加过了，此次为edit或del
      let currQaInx = 0; // 当前匹配到的qa项的索引
      // 匹配出当前项在ques是否存在，存在的话，把索引存起来
      questions.forEach((qaItem: any, inx: number) => {
        const uuidEqual = isDdtk ? qaItem[0].uuid === uItem.uuid : qaItem.uuid === uItem.uuid;
        if (uuidEqual) {
          hasUuid = true;
          currQaInx = inx;
        }
      });

      // 有uuid，表示之前添加过了(此次是edit或del)，并且当前编辑的uuid是此项的uuid
      if (hasUuid && curUuid === uItem.uuid) {
        if (uItem.actionType === 'edit' ) {
          questions[currQaInx] = cloneDeep(uItem.qa);
        } else if (uItem.actionType === 'delete') {
          questions.splice(currQaInx, 1);
        }
      }
      // 当前questions列表没有此uuid两种情况 1新添加的，2已删除的. 3新增加的tab选项卡(init时所有temp里的问题都不存在)
      if (!hasUuid && uItem.actionType !== 'delete') {
        questions.push(cloneDeep(uItem.qa));
      }
    });
    console.log('returnquestions', questions);
    return questions;
  } else {
    return false;
  }
};
// 处理用户新加问题多tab共享-e

export const getSource = (source: string, sid: string) => {
  if (source === 'SYSTEM') {
    return '<span class="SYSTEM">官方</span>';
  } else if (source === 'DOCTOR' && sid === window.$storage.getItem('sid')) {
    return '<span class="ONESELF">自己</span>';
  } else {
    return '<span class="OTHERS">他人</span>';
  }
};

