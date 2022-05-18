var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
import { cloneDeep } from 'lodash';
import { message } from 'antd';
export var outTypes = {
    HYD: '化验单',
    JCD: '检查单',
    OTHER: '其他医学单据',
    NOT_CLEAR: '图片不清晰',
    NOT_HYD_JCD: '非医学单据',
};
export var checkboxData = {
    question_type: 'RADIO',
    question: '',
    answer: [],
    options: ['', '', ''],
};
export var textData = {
    question_type: 'TEXT',
    question: '',
    answer: [],
};
// 多段填空是二维数组嵌套qa里面每个item是多个问答组成的一道题
export var ddtkData = function (uuid) {
    return {
        uuid: uuid,
        question_type: 'COMPLETION',
        question: '',
        answer: [],
        // isAdd: true,
    };
};
export var ddtkExample = [
    { q: '形态', a: '有' },
    { q: '大小', a: '1.5×1×1' },
];
export var baseField = {
    'orgName': { text: '检查机构', inx: '0' },
    'measured_at': { text: '时间', inx: '1' },
    'part': { text: '检查部位', inx: '2' },
    'method': { text: '检查方法', inx: '3' },
    'name': { text: '检查名称', inx: '4' },
    'djName': { text: '单据名称', inx: '3' },
};
export var baseFieldReverse = {
    '检查机构': 'orgName',
    '时间': 'measured_at',
    '检查部位': 'part',
    '检查方法': 'method',
    '检查名称': 'name',
    '单据名称': 'djName',
};
export var msg = function (content, type) {
    if (type === void 0) { type = 'success'; }
    message[type]({ content: content });
};
// 提交时3，把问题转成api接口参数格式  ui->api
export var fetchSubmitData = function (questions, startInx, clickSaveTime, gid) {
    var backData = questions.map(function (item, inx) {
        var newItem = cloneDeep(item);
        // delete newItem.isAdd;
        var returnData = __assign(__assign({}, newItem), { 
            // 例： 1-1（题目）  1-1-0（题目下每一个问答内容） 1-1-1(第二个问答)依次类推
            // group: inx === 0 ? startInx : `${startInx}-${inx - 1}`,
            group: startInx + "-" + inx, sid: localStorage.getItem('xzl-web-doctor_sid'), createdTime: clickSaveTime });
        if (gid) {
            // uuid：添加问题模板时，用来标识多段填空，哪些问题为一组，一组问答的uui是一致的。
            returnData.uuid = gid;
        }
        return returnData;
    });
    return backData;
};
// 提交时2：多段填空时，多段填空转成api结构 ui->api
export var fetchSubmitDataDdtk = function (questions, startInx, clickSaveTime) {
    var backData = [];
    console.log('ddtkkkkkquestions', questions);
    questions.forEach(function (ddtkQaList, groupInx) {
        var qaList = fetchSubmitData(ddtkQaList, startInx + "-" + groupInx, clickSaveTime);
        backData.push.apply(backData, __spreadArray([], __read(qaList)));
    });
    console.log('backData', backData);
    return backData;
};
// 提交时1，ui结构转成大平层格式，返回jcd列表  ui--->api
export var formatJcdSubmitData = function (jcdTabList, clickSaveTime) {
    console.log('jcdTabList', jcdTabList);
    var list = [];
    jcdTabList.forEach(function (jcdTabItem) {
        var newJcdTabItem = cloneDeep(jcdTabItem);
        // 0 basic 1ddtk 2xzt 3wdt
        jcdTabItem.data.forEach(function (topic, inx) {
            var jcdAmdTemp = jcdTabItem.data[inx].data;
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
        jcdList: { list: list },
    };
};
// 回显时2：处理检查单类型数据回显---s  dimension维度，第几层。 递归根据group找到所在位置 api->ui
export var findPosition = function (item, topicAll, dimension) {
    var spArr = item.group.split('-'); // [0,1]  [1,0,0]
    if (!topicAll[Number(spArr[dimension])]) {
        topicAll[Number(spArr[dimension])] = [];
    }
    if (spArr.length === dimension + 2) {
        topicAll[Number(spArr[dimension])].push({
            question: item.question,
            answer: item.answer,
            options: (item === null || item === void 0 ? void 0 : item.options) || [],
            question_type: item.question_type,
            uuid: item.uuid,
        });
    }
    else {
        findPosition(item, topicAll[Number(spArr[dimension])], dimension + 1);
    }
};
// 回显时1：后端api返回的平铺格式转成ui格式   api--->ui
export var fetchInitData = function (initData) {
    var _a;
    var topicAll = [[], [], [], []]; // 多维数组
    (_a = initData === null || initData === void 0 ? void 0 : initData.data) === null || _a === void 0 ? void 0 : _a.forEach(function (item) {
        findPosition(item, topicAll, 0);
    });
    console.log('topicAll11', topicAll);
    return topicAll;
};
// 处理检查单类型数据回显---e
// 回显时：单独处理多段填空，需要把平铺格式转成ui需要的多维数组格式(先根据uuid分组，然后组内排序)   模板--->ui
export var formatTempDdtk = function (tkTmpList) {
    console.log(399939392832, tkTmpList);
    var groupDdtk = {};
    var ddtk = [];
    tkTmpList.forEach(function (item) {
        if (groupDdtk[item.uuid]) {
            groupDdtk[item.uuid].push(item);
        }
        else {
            groupDdtk[item.uuid] = [item];
        }
    });
    console.log('groupDdtk', groupDdtk);
    Object.values(groupDdtk).forEach(function (groupItem) {
        var groupList = [];
        groupItem.forEach(function (qaItem) {
            // 新版多段填空，一组题存在一个题目，例： 1-1（题目）  1-1-0（题目下每一个问答内容） 1-1-1(第二个问答)依次类推
            var targetInx = Number(qaItem.group.split('-')[2]); // 根据此值进行小组内问题排序
            // 只有题止的group得到的targetInx是NAN，此时inx设为0；（ui渲染时，默认认为第一个元素为题目，其余为问答）
            var inx = isNaN(targetInx) ? 0 : targetInx + 1;
            console.log('inx', inx);
            groupList[inx] = __assign(__assign({}, qaItem), { answer: qaItem.answer.filter(function (ansItem) { return !!ansItem; }) });
        });
        ddtk.push(groupList.filter(function (item) { return !!item; }));
    });
    console.log('ddtk332', ddtk);
    return ddtk;
};
// 处理用户新加问题多tab共享-e
export var getSource = function (source, sid) {
    if (source === 'SYSTEM') {
        return '<span class="SYSTEM">官方</span>';
    }
    else if (source === 'DOCTOR' && sid === localStorage.getItem('xzl-web-doctor_sid')) {
        return '<span class="ONESELF">自己</span>';
    }
    else {
        return '<span class="OTHERS">他人</span>';
    }
};
export var DdtkSeniorInlineType = {
    INLINE_COMPLETION: '填空题',
    INLINE_RADIO: '单选题',
    INLINE_CHECKBOX: '多选题',
    INLINE_DATE: '日期类型题',
};
