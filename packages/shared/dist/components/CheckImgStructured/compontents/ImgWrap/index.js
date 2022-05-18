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
import React, { useEffect, useState, useRef } from 'react';
import { CloseOutlined } from '@ant-design/icons';
import Viewer from '../../../Viewer';
import './index.css';
var ImgWrap = function (props) {
    var handleClose = props.handleClose, images = props.images;
    var _a = __read(useState(false), 2), show = _a[0], setShow = _a[1];
    var curImage = useRef(images[0]);
    useEffect(function () {
        setShow(true);
    }, []);
    var handleImageRotate = function (degreeNum) {
        // && isRotateInit.current
        if (curImage.current.imageId) {
            var params = {
                imageId: curImage.current.imageId,
                degree: degreeNum,
                sid: window.$storage.getItem('patientSid'),
                wcId: window.$storage.getItem('patientWcId'),
            };
            window.$api.image.patchImageDegree(params);
        }
    };
    console.log('imagesimages', images);
    console.log('2322222', images.map(function (imgItem) {
        return {
            src: imgItem.url,
            alt: '化验单检查单',
            degree: imgItem.degree,
        };
    }));
    var handleImageChange = function (imgDetil) {
        curImage.current = imgDetil;
    };
    return (React.createElement("div", { className: 'img_box' },
        React.createElement("div", { className: 'img_wrap', id: "images" }),
        React.createElement(Viewer, { className: "structured_viewer", noClose: true, onClose: function () { }, onMaskClick: function () { }, 
            // changeable={isEmpty(images)} // 是否隐藏切换上一张下一张
            // noNavbar // 是否展示底部缩略图
            onRotateClick: handleImageRotate, onChange: handleImageChange, container: document.getElementById('images'), visible: show, disableKeyboardSupport: true, images: images.map(function (imgItem) {
                return {
                    src: imgItem.url,
                    alt: '化验单检查单',
                    degree: imgItem.degree,
                    imageId: imgItem.imageId,
                };
            }), customToolbar: function (config) { return (__spreadArray(__spreadArray([], __read(config)), [
                {
                    key: 'customClose',
                    render: (React.createElement("div", null,
                        React.createElement(CloseOutlined, null),
                        React.createElement("div", null, "\u5173\u95ED"))),
                    onClick: handleClose,
                },
            ])); } })));
};
export default ImgWrap;
