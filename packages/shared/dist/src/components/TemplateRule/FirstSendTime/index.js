import React, { useRef } from 'react';
import { Select } from 'antd';
// import * as api from '@/services/api';
import styles from './index.scss';
var Option = Select.Option;
function FirstSendTime(_a) {
    var _b;
    // 患者与我绑定日期后
    var model = {
        itemType: 'select',
        options: ['患者与我绑定日期后', '选择特定日期', '计划创建成功后立即发送'],
        description: '首次发送时间',
        childItem: [
            {
                itemType: 'select',
                options: ['自定义', '立即发送'],
                description: '患者与我绑定日期后',
                childItem: [
                    {
                        itemType: 'select',
                        options: ['自定义', '立即发送'],
                        description: '自定义',
                        childItem: [
                            {
                                itemType: 'day',
                                description: '',
                            },
                        ],
                    },
                    {
                        itemType: 'select',
                        options: ['自定义', '立即发送'],
                        description: '立即发送',
                    },
                ],
            },
            {
                itemType: 'select',
                options: ['患者与我绑定日期后', '选择特定日期', '计划创建成功后立即发送'],
                description: '首次发送时间',
            },
        ],
    };
    var choiceModelRef = useRef({ itemType: 'select', choiceModel: model, description: '首次发送时间' });
    var handleChangeType = function (val) {
        console.log('============= 111', JSON.stringify(val));
    };
    var getReactEle = function (choiceItem) {
        var _a;
        return (React.createElement("div", { className: styles.send_time }, choiceItem.itemType == 'select' &&
            React.createElement(Select, { onChange: handleChangeType, value: (_a = choiceItem === null || choiceItem === void 0 ? void 0 : choiceItem.description) !== null && _a !== void 0 ? _a : '' }, (choiceItem === null || choiceItem === void 0 ? void 0 : choiceItem.childItem) &&
                choiceItem.childItem.map(function (it) { return (React.createElement(Option, { value: it.description, key: it.description }, it.description)); }))));
    };
    return (React.createElement("div", null,
        React.createElement("h2", null,
            React.createElement("span", { className: styles.start }, "*"),
            "\u9996\u6B21\u53D1\u9001\u65F6\u95F4\uFF1A"),
        React.createElement("div", { className: styles.send_time }, ((_b = choiceModelRef === null || choiceModelRef === void 0 ? void 0 : choiceModelRef.current) === null || _b === void 0 ? void 0 : _b.choiceModel) &&
            getReactEle(choiceModelRef.current.choiceModel))));
}
export default FirstSendTime;
