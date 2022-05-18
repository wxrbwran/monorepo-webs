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
// @ts-ignore
import { Button, Empty } from 'antd';
import Viewer from '../Viewer';
import CheckImgStructured from '../CheckImgStructured';
import './index.css';
import dayjs from 'dayjs';
function ImageList(props) {
    var data = props.data, handleHideCont = props.handleHideCont, refresh = props.refresh, sid = props.sid;
    console.log('33232300000', props);
    var _a = __read(useState(false), 2), showViewer = _a[0], setShowViewer = _a[1];
    var _b = __read(useState(0), 2), activeIndex = _b[0], setActiveIndex = _b[1]; // 预览图片，当前选中第几张
    var _c = __read(useState(), 2), imageId = _c[0], setImageId = _c[1];
    var _d = __read(useState({}), 2), imgList = _d[0], setImgList = _d[1]; // key是时间
    var viewerImages = useRef([]);
    var _e = __read(useState([]), 2), selectImgs = _e[0], setSelectImgs = _e[1];
    var fetchImgList = function () {
        console.log('res3333', data);
        var imgs = {};
        if (data) {
            Object.keys(data).forEach(function (groupId) {
                var time = data[groupId][0].lastReportAt;
                var date = dayjs(time).format('YYYY.MM.DD');
                if (imgs[date]) {
                    imgs[date].push(data[groupId]);
                }
                else {
                    imgs[date] = [data[groupId]];
                }
            });
            var orderImgs_1 = {};
            Object.keys(imgs).sort().reverse().forEach(function (timeKey) {
                orderImgs_1[timeKey] = imgs[timeKey];
            });
            setImgList(orderImgs_1);
            viewerImages.current = Object.values(orderImgs_1).flat(2);
        }
        else {
            setImgList({});
            viewerImages.current = [];
        }
        // const params: CommonData = {
        //   sid: window.$storage.getItem('patientSid'),
        //   wcId: window.$storage.getItem('patientWcId'),
        //   category: data.category,
        //   groupName: data.name,
        // };
        // if (data.imageIdList) {  // 检查单
        //   params.imageIdList = data.imageIdList;
        // } else { // 其他图片，化验单
        //   params.typeNew = data.typeNew;
        // }
        // window.$api.image.fetchImageDetailV1(params).then((res: { imageInfos: IImg[] }) => {
        //   let imgs: { [key: string]: IImg[] } = {};
        // });
    };
    useEffect(function () {
        fetchImgList();
    }, [data]);
    // 点击图片显示图片查看器
    var toggleShowViewer = function (imgId) {
        Object.values(imgList).flat(2).forEach(function (img, imgInx) {
            if (img.imageId === imgId) {
                setActiveIndex(imgInx);
            }
        });
        setImageId(imgId);
        setShowViewer(!showViewer);
        handleHideCont();
    };
    var hideViewer = function () {
        setShowViewer(false);
        handleHideCont();
    };
    var handleRefresh = function () {
        if (showViewer) {
            setShowViewer(false);
            handleHideCont();
        }
        setActiveIndex(0);
        fetchImgList();
        setSelectImgs([]);
        refresh();
    };
    var handleImageRotate = function (degreeNum) {
        console.log('degreeNumdegreeNum', degreeNum);
        var params = {
            imageId: imageId,
            degree: degreeNum,
            sid: window.$storage.getItem('patientSid'),
            wcId: window.$storage.getItem('patientWcId'),
        };
        window.$api.image.patchImageDegree(params);
    };
    var handleImageChange = function (imgDetail, inx) {
        setActiveIndex(inx);
        setImageId(imgDetail.imageId);
    };
    var renderItem = useMemo(function () { return function (groupItem) {
        var item = groupItem[0];
        return (React.createElement("div", { key: item.imageId, className: "images_item" },
            groupItem.length > 1 && React.createElement("span", { className: "img_count" },
                "\u5171",
                groupItem.length,
                "\u5F20"),
            React.createElement("img", { src: item.url, style: { transform: "rotate(" + item.degree + "deg)" }, onClick: function () { return toggleShowViewer(item.imageId); } }),
            React.createElement(Button, { className: "mt-10 border-blue-500 text-blue-400", onClick: function () { return setSelectImgs(groupItem); } },
                React.createElement(CheckImgStructured, { handleRefresh: handleRefresh, images: selectImgs, sid: sid }, '查看详情'))));
    }; }, [imgList, selectImgs]);
    console.log('=====imgList', imgList);
    console.log('selectImgs', selectImgs);
    return (React.createElement("div", { className: 'shared_check_images' },
        React.createElement("div", { className: "images_wrap" },
            Object.keys(imgList).map(function (dateItem) { return (React.createElement("div", { className: "flex", key: dateItem },
                React.createElement("div", { className: "mr-10 mt-20" }, dateItem),
                React.createElement("div", { className: "images_list" }, imgList[dateItem].map(function (item) { return renderItem(item); })))); }),
            Object.values(imgList).length === 0 && React.createElement(Empty, null),
            React.createElement(Viewer, { visible: showViewer, images: viewerImages.current.map(function (image) { return ({
                    src: image.url,
                    alt: '化验单检查单',
                    degree: image.degree,
                    imageId: image.imageId,
                }); }), activeIndex: activeIndex, scalable: false, onClose: hideViewer, onRotateClick: handleImageRotate, onMaskClick: hideViewer, disableKeyboardSupport: true, 
                // onChange={(img, inx) => setActiveIndex(inx)}
                onChange: handleImageChange, 
                // 已和产品沟通，由于待审核问题处，可以勾选多张，再查看大图，此时点击结构化，是结构当前图片还是外面勾选的图片有歧义，此按钮隐藏
                customToolbar: function (config) { return __spreadArray(__spreadArray([], __read(config)), [
                    {},
                ]); } }))));
}
export default ImageList;
