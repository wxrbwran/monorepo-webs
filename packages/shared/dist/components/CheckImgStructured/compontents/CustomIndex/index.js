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
import React, { useEffect, useState, useMemo, useRef } from 'react';
import { Form } from 'antd';
import { isEmpty } from 'lodash';
import { formatSubmitItems, formatDataAddIndex } from './formatData';
import IndexTable from '../IndexTable';
import ItemDate from '../ItemDate';
var CustomIndex = function (props) {
    var _a, _b, _c, _d, _e, _f, _g, _h;
    var handleDocumentsCallbackFns = props.handleDocumentsCallbackFns, formKey = props.formKey, initList = props.initList, firstIndex = props.firstIndex, apiParams = props.apiParams, selectIndex = props.selectIndex;
    var _j = __read(Form.useForm(), 1), form = _j[0];
    var validateFields = form.validateFields, setFieldsValue = form.setFieldsValue, getFieldsValue = form.getFieldsValue;
    var initApiData = {
        commonItems: [],
        noCommonItems: [],
    };
    var _k = __read(useState(initApiData), 2), apiData = _k[0], setApiData = _k[1];
    var _l = __read(useState(0), 2), addIndexNum = _l[0], setaddIndexNum = _l[1];
    var _m = __read(useState({}), 2), formInit = _m[0], setFormInit = _m[1];
    var _o = __read(useState(), 2), lightKeyWord = _o[0], setlightKeyWord = _o[1];
    var timeAndOrg = useRef({
        measuredAt: ((_a = initList === null || initList === void 0 ? void 0 : initList.orgAndTime) === null || _a === void 0 ? void 0 : _a.measuredAt) || new Date().getTime(),
        unknownReport: ((_b = initList === null || initList === void 0 ? void 0 : initList.orgAndTime) === null || _b === void 0 ? void 0 : _b.unknownReport) || false,
        orgId: ((_c = initList === null || initList === void 0 ? void 0 : initList.orgAndTime) === null || _c === void 0 ? void 0 : _c.orgId) || null,
        orgName: ((_d = initList === null || initList === void 0 ? void 0 : initList.orgAndTime) === null || _d === void 0 ? void 0 : _d.orgName) || null,
    });
    var sid = localStorage.getItem('xzl-web-doctor_sid');
    // ?????????????????????????????????
    var formatFirshIndex = function (commonItems, noCommonItems) {
        commonItems.forEach(function (item, index) {
            if (firstIndex === item.id || firstIndex === item.indexId) {
                commonItems.splice(index, 1);
                commonItems.unshift(item);
            }
        });
        noCommonItems.forEach(function (item, index) {
            if (firstIndex === item.id || firstIndex === item.indexId) {
                noCommonItems.splice(index, 1);
                commonItems.unshift(item);
            }
        });
        return {
            commonItems: commonItems,
            noCommonItems: noCommonItems,
        };
    };
    // const fetchIndexDocumentIndex = async () => {
    //   const params = {
    //     documentId: apiParams.documentId,
    //     sourceSid: apiParams.sourceSid,
    //     sid,
    //   };
    //   const { list }: { list: IIndexItemCustom[] } = await api.indexLibrary.fetchIndexDocumentIndex(
    //     params,
    //   );
    //   console.log('-------33', list);
    //   const commonItems = list.filter((item) => item.common);
    //   const noCommonItems = list.filter((item) => !item.common);
    //   // ??????????????????????????????????????????????????????????????????
    //   const data: IApiData = firstIndex
    //     ? formatFirshIndex(commonItems, noCommonItems)
    //     : { commonItems, noCommonItems };
    //   // console.log('=====+2,initList???????????????????????????');
    //   console.log('999999999999', cloneDeep(formatDataAddIndex(data, addIndexNum)));
    //   setApiData(cloneDeep(formatDataAddIndex(data, addIndexNum)));
    // };
    useEffect(function () {
        // ????????????
        if (isEmpty(apiData.commonItems) && isEmpty(apiData.noCommonItems)) {
            // console.log('curtomIndex2');
            if (initList) {
                // console.log('=====+1,initList????????????', initList);
                setApiData(formatDataAddIndex(initList, addIndexNum));
            }
            else {
                console.log('curtomIndex3');
                // fetchIndexDocumentIndex();
            }
        }
    }, [initList]);
    // ????????????
    // useEffect(() => {
    //   const listener = async (id: string) => {
    //     console.log('apiParams.id', apiParams.documentId);
    //     console.log('id', id);
    //     if (apiParams.documentId === id) {
    //       form.resetFields();
    //       await fetchIndexDocumentIndex();
    //       message.success('???????????????');
    //     }
    //   };
    //   event.addListener('REFERSH_DOCUMENT_BY_ID', listener);
    //   return () => {
    //     event.removeListener('REFERSH_DOCUMENT_BY_ID', listener);
    //   };
    // }, [apiParams]);
    useEffect(function () {
        // ??????????????????????????????(??????apiData?????????????????????????????????????????????)???????????????
        if (firstIndex && apiData.commonItems.length > 0) {
            // ?????????form??????????????????????????????????????????
            var curFormData_1 = getFieldsValue(true);
            var commonList = apiData.commonItems;
            var noCommonList = apiData.noCommonItems;
            // console.log('=====+3,firstIndex?????????');
            setApiData(__assign({}, formatFirshIndex(commonList, noCommonList)));
            setTimeout(function () {
                // ????????????????????????
                setFieldsValue(__assign({}, curFormData_1));
            }, 300);
        }
    }, [firstIndex]);
    var handleSave = function () {
        return new Promise(function (resolve, reject) {
            var _a, _b;
            var itemsLength = (((_a = apiData === null || apiData === void 0 ? void 0 : apiData.commonItems) === null || _a === void 0 ? void 0 : _a.length) || 0) + (((_b = apiData === null || apiData === void 0 ? void 0 : apiData.noCommonItems) === null || _b === void 0 ? void 0 : _b.length) || 0);
            validateFields()
                .then(function (values) {
                // console.log('validateFields', values);
                // console.log('itemsLength', itemsLength);
                // console.log('apiParams', apiParams);
                // apiParams
                var documentId = apiParams.documentId, documentName = apiParams.documentName, sampleFrom = apiParams.sampleFrom;
                var params = __assign(__assign({ documentId: documentId,
                    documentName: documentName, documentType: 'HYD', source: apiParams.source, sourceSid: apiParams.sourceSid, sampleFroms: [sampleFrom] }, timeAndOrg.current), { indexList: formatSubmitItems(values, itemsLength) });
                // console.log('params22221', params);
                resolve(params);
            })
                .catch(function (err) {
                reject(err);
            });
        });
    };
    var handleInitForm = function () {
        var initForm = {};
        // ?????????????????????????????????????????????
        var all = __spreadArray(__spreadArray([], __read((apiData.commonItems || []))), __read((apiData.noCommonItems || [])));
        // console.log('handleInitForm', all);
        all.forEach(function (item) {
            var _a;
            var id = item.id, name = item.name, formIndex = item.formIndex, indexId = item.indexId, references = item.references, sourceSid = item.sourceSid, source = item.source, referenceList = item.referenceList, originReferences = item.originReferences;
            console.log('-----item', item);
            var referenceData = {};
            if ((referenceList === null || referenceList === void 0 ? void 0 : referenceList.length) > 0) {
                var keys_1 = ['value', 'indexValue'];
                referenceList.forEach(function (reference, index) {
                    keys_1.forEach(function (k) {
                        if (reference[k]) {
                            referenceData[formIndex + "_" + index + "_" + k] = reference[k];
                        }
                    });
                    // ?????????referenceId???????????????????????????????????????select??????????????????
                    if (reference.referenceId) {
                        referenceData[formIndex + "_" + index + "_reference"] = reference.referenceId;
                    }
                });
            }
            else {
                if (references && !isEmpty(references)) {
                    var defaultReferenceId_1 = '';
                    references === null || references === void 0 ? void 0 : references.forEach(function (refitem) {
                        if (refitem.isDefault) {
                            defaultReferenceId_1 = refitem.id;
                        }
                    });
                    referenceData[formIndex + "_0_reference"] = defaultReferenceId_1 || references[0].id;
                }
            }
            initForm = __assign(__assign(__assign({}, initForm), (_a = {}, _a[formIndex + "_indexId"] = id || indexId, _a[formIndex + "_name"] = name, _a[formIndex + "_sourceSid"] = sourceSid, _a[formIndex + "_source"] = source, _a[formIndex + "_referenceList"] = originReferences || references, _a[formIndex + "_valueCount"] = referenceList && !isEmpty(referenceList) ? referenceList.map(function (refI, inx) {
                console.log(refI);
                return inx;
            }) : [0], _a)), referenceData);
        });
        console.log('initForminitForminitForm+++++++++', initForm);
        setFormInit(initForm);
        setFieldsValue(__assign({}, initForm));
    };
    useEffect(function () {
        console.log('-----===apiData', apiData);
        handleInitForm(); // ???????????????
    }, [apiData]);
    useEffect(function () {
        if (handleDocumentsCallbackFns) {
            handleDocumentsCallbackFns({
                action: 'add',
                type: apiParams.documentId + apiParams.sampleFrom + apiParams.documentName,
                fn: handleSave,
            });
        }
        return function () {
            if (handleDocumentsCallbackFns) {
                handleDocumentsCallbackFns({
                    action: 'remove',
                    type: apiParams.documentId + apiParams.sampleFrom + apiParams.documentName,
                });
            }
        };
    }, [apiData]);
    var addIndexSuccess = function (newItemData) {
        // ?????????????????????????????????form???????????????apiData???????????????????????????????????????????????????????????????????????????????????????????????????
        // ??????????????????????????????apiData?????????????????????????????????????????????initForm???????????????????????????????????????????????????set?????????
        // ??????????????????????????????indexIdNew???????????????handleInitForm??????apiData???????????????????????????????????????????????????????????????
        // ???????????????????????????????????????
        var curFormData = getFieldsValue(true);
        var newApiData = __assign(__assign({}, apiData), { commonItems: __spreadArray([newItemData], __read(apiData.commonItems)) });
        var newAddInx = addIndexNum + 1;
        setaddIndexNum(function (pre) { return pre + 1; });
        // console.log('=====+4,????????????????????????????????????');
        setApiData(__assign({}, formatDataAddIndex(newApiData, newAddInx)));
        setTimeout(function () {
            // ????????????????????????
            setFieldsValue(__assign({}, curFormData));
        }, 300);
    };
    useEffect(function () {
        // ?????????????????? ????????????????????????????????????????????????????????????????????????????????????????????????
        if (selectIndex) {
            var isHasIndex = __spreadArray(__spreadArray([], __read(apiData.commonItems)), __read(apiData.noCommonItems)).filter(function (item) { return item.id === selectIndex.id || item.indexId === selectIndex.indexId; });
            if (isHasIndex.length === 0) {
                addIndexSuccess(selectIndex);
            }
        }
    }, [selectIndex]);
    var renderItem = useMemo(function () { return function (subName) {
        var param = { apiData: apiData, getFieldsValue: getFieldsValue, formInit: formInit };
        if (subName) {
            param.subName = subName;
        }
        return React.createElement(IndexTable, __assign({}, param, { form: form }));
    }; }, [apiData, formInit]);
    return (React.createElement("div", { className: "relative" },
        React.createElement("div", { className: "flex text-sm justify-between items-center mb-20 structured-edit-wrap" },
            !(!((_e = initList === null || initList === void 0 ? void 0 : initList.orgAndTime) === null || _e === void 0 ? void 0 : _e.orgName)) ? (React.createElement("div", { className: "flex", style: { flex: '0 0 47%' } },
                React.createElement("div", { className: "font-medium mr-5", style: { flex: '0 0 63px', lineHeight: '25px' } }, "\u68C0\u67E5\u673A\u6784:"), (_f = initList === null || initList === void 0 ? void 0 : initList.orgAndTime) === null || _f === void 0 ? void 0 :
                _f.orgName)) : (React.createElement("div", null)),
            React.createElement(ItemDate
            // ???????????????????????????????????????????????????????????????????????????
            , { 
                // ???????????????????????????????????????????????????????????????????????????
                initReportTime: ((_g = initList === null || initList === void 0 ? void 0 : initList.orgAndTime) === null || _g === void 0 ? void 0 : _g.measuredAt) || new Date().getTime(), isUnknownTime: (_h = initList === null || initList === void 0 ? void 0 : initList.orgAndTime) === null || _h === void 0 ? void 0 : _h.unknownReport, type: "HYD" })),
        React.createElement(Form, { name: "custom_" + formKey, form: form }, renderItem())));
};
export default CustomIndex;
