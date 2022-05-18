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
import React, { useState } from 'react';
import DragModal from '../DragModal';
import ImageList from './ImageList';
import './index.css';
function CheckImages() {
    var _a = __read(useState(false), 2), showModal = _a[0], setShowModal = _a[1];
    var _b = __read(useState(), 2), activeItem = _b[0], setActiveItem = _b[1];
    var _c = __read(useState(false), 2), hideCont = _c[0], setHideCont = _c[1];
    return (React.createElement(React.Fragment, null,
        React.createElement(DragModal
        // ant-modal-wrap-center
        , { 
            // ant-modal-wrap-center
            wrapClassName: "" + (hideCont ? 'mode_hide' : 'ant-modal-wrap-center'), mask: !hideCont, width: "1200px", visible: showModal, title: (activeItem === null || activeItem === void 0 ? void 0 : activeItem.name) || '单据', onCancel: function () { return setShowModal(false); }, footer: null, style: { display: hideCont ? 'none' : 'block' } },
            React.createElement("div", { className: 'shared_check_images' },
                React.createElement("div", { className: 'images_wrap' },
                    React.createElement(ImageList, { data: activeItem, handleHideCont: function () { return setHideCont(!hideCont); } }),
                    React.createElement("div", null))))));
}
export default CheckImages;
