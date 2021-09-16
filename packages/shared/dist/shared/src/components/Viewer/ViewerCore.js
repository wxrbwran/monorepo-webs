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
import * as React from 'react';
import './style/index.less';
import classnames from 'classnames';
import ViewerCanvas from './ViewerCanvas';
import ViewerNav from './ViewerNav';
import ViewerToolbar, { defaultToolbars } from './ViewerToolbar';
import Icon, { ActionType } from './Icon';
import * as constants from './constants';
function noop() { }
// const transitionDuration = 300;
var ACTION_TYPES = {
    setVisible: 'setVisible',
    setActiveIndex: 'setActiveIndex',
    update: 'update',
    clear: 'clear',
};
function createAction(type, payload) {
    return {
        type: type,
        payload: payload || {},
    };
}
export default (function (props) {
    var _a;
    var _b = props.visible, visible = _b === void 0 ? false : _b, _c = props.onClose, onClose = _c === void 0 ? noop : _c, _d = props.images, images = _d === void 0 ? [] : _d, _e = props.activeIndex, activeIndex = _e === void 0 ? 0 : _e, _f = props.zIndex, zIndex = _f === void 0 ? 1000 : _f, _g = props.drag, drag = _g === void 0 ? true : _g, _h = props.attribute, attribute = _h === void 0 ? true : _h, _j = props.zoomable, zoomable = _j === void 0 ? true : _j, _k = props.rotatable, rotatable = _k === void 0 ? true : _k, _l = props.scalable, scalable = _l === void 0 ? false : _l, _m = props.onMaskClick, onMaskClick = _m === void 0 ? noop : _m, _o = props.onRotateClick, onRotateClick = _o === void 0 ? noop : _o, _p = props.changeable, changeable = _p === void 0 ? true : _p, _q = props.customToolbar, customToolbar = _q === void 0 ? function (toolbars) { return toolbars; } : _q, _r = props.zoomSpeed, zoomSpeed = _r === void 0 ? 0.05 : _r, _s = props.disableKeyboardSupport, disableKeyboardSupport = _s === void 0 ? false : _s, _t = props.noResetZoomAfterChange, noResetZoomAfterChange = _t === void 0 ? false : _t, _u = props.noLimitInitializationSize, noLimitInitializationSize = _u === void 0 ? false : _u, _v = props.defaultScale, defaultScale = _v === void 0 ? 1 : _v, _w = props.loop, loop = _w === void 0 ? true : _w, _x = props.disableMouseZoom, disableMouseZoom = _x === void 0 ? false : _x, _y = props.downloadable, downloadable = _y === void 0 ? false : _y, _z = props.noImgDetails, noImgDetails = _z === void 0 ? false : _z, _0 = props.noToolbar, noToolbar = _0 === void 0 ? false : _0, _1 = props.showTotal, showTotal = _1 === void 0 ? true : _1, _2 = props.minScale, minScale = _2 === void 0 ? 0.1 : _2;
    var initialState = {
        visible: false,
        visibleStart: false,
        transitionEnd: false,
        activeIndex: props.activeIndex,
        width: 0,
        height: 0,
        top: 15,
        left: null,
        rotate: 0,
        imageWidth: 0,
        imageHeight: 0,
        scaleX: defaultScale,
        scaleY: defaultScale,
        loading: false,
        loadFailed: false,
        startLoading: false,
    };
    function setContainerWidthHeight() {
        var width = window.innerWidth;
        var height = window.innerHeight;
        if (props.container) {
            width = props.container.offsetWidth;
            height = props.container.offsetHeight;
        }
        return {
            width: width,
            height: height,
        };
    }
    var containerSize = React.useRef(setContainerWidthHeight());
    var footerHeight = constants.FOOTER_HEIGHT;
    function reducer(s, action) {
        switch (action.type) {
            case ACTION_TYPES.setVisible:
                return __assign(__assign({}, s), { visible: action.payload.visible });
            case ACTION_TYPES.setActiveIndex:
                return __assign(__assign({}, s), { activeIndex: action.payload.index, startLoading: true });
            case ACTION_TYPES.update:
                return __assign(__assign({}, s), action.payload);
            case ACTION_TYPES.clear:
                return __assign(__assign({}, s), { width: 0, height: 0, scaleX: defaultScale, scaleY: defaultScale, rotate: 1, imageWidth: 0, imageHeight: 0, loadFailed: false, top: 0, left: 0, loading: false });
            default:
                break;
        }
        return s;
    }
    var viewerCore = React.useRef(null);
    var init = React.useRef(false);
    var currentLoadIndex = React.useRef(0);
    var _3 = __read(React.useReducer(reducer, initialState), 2), state = _3[0], dispatch = _3[1];
    React.useEffect(function () {
        init.current = true;
        return function () {
            init.current = false;
        };
    }, []);
    React.useEffect(function () {
        containerSize.current = setContainerWidthHeight();
    }, [props.container]);
    React.useEffect(function () {
        if (visible) {
            if (init.current) {
                dispatch(createAction(ACTION_TYPES.setVisible, {
                    visible: true,
                }));
            }
        }
    }, [visible]);
    React.useEffect(function () {
        bindEvent();
        return function () {
            bindEvent(true);
        };
    });
    React.useEffect(function () {
        if (visible) {
            if (!props.container) {
                document.body.style.overflow = 'hidden';
                if (document.body.scrollHeight > document.body.clientHeight) {
                    document.body.style.paddingRight = '15px';
                }
            }
        }
        else {
            dispatch(createAction(ACTION_TYPES.clear, {}));
        }
        return function () {
            document.body.style.overflow = '';
            document.body.style.paddingRight = '';
        };
    }, [state.visible]);
    React.useEffect(function () {
        if (visible) {
            dispatch(createAction(ACTION_TYPES.setActiveIndex, {
                index: activeIndex,
            }));
        }
    }, [activeIndex, visible, images]);
    function loadImg(currentActiveIndex, isReset) {
        if (isReset === void 0) { isReset = false; }
        dispatch(createAction(ACTION_TYPES.update, {
            loading: true,
            loadFailed: false,
        }));
        var activeImage = null;
        if (images.length > 0) {
            activeImage = images[currentActiveIndex];
        }
        var loadComplete = false;
        var img = new Image();
        img.onload = function () {
            if (!init.current) {
                return;
            }
            if (!loadComplete) {
                loadImgSuccess(img.width, img.height, true);
            }
        };
        img.onerror = function () {
            if (!init.current) {
                return;
            }
            if (props.defaultImg) {
                dispatch(createAction(ACTION_TYPES.update, {
                    loading: false,
                    loadFailed: true,
                    startLoading: false,
                }));
                var deafultImgWidth = props.defaultImg.width || containerSize.current.width * 0.5;
                var defaultImgHeight = props.defaultImg.height || containerSize.current.height * 0.5;
                loadImgSuccess(deafultImgWidth, defaultImgHeight, false);
            }
            else {
                dispatch(createAction(ACTION_TYPES.update, {
                    loading: false,
                    loadFailed: false,
                    startLoading: false,
                }));
            }
        };
        img.src = activeImage.src;
        if (img.complete) {
            loadComplete = true;
            loadImgSuccess(img.width, img.height, true);
        }
        function loadImgSuccess(imgWidth, imgHeight, success) {
            if (currentActiveIndex !== currentLoadIndex.current) {
                return;
            }
            var realImgWidth = imgWidth;
            var realImgHeight = imgHeight;
            if (props.defaultSize) {
                realImgWidth = props.defaultSize.width;
                realImgHeight = props.defaultSize.height;
            }
            if (activeImage.defaultSize) {
                realImgWidth = activeImage.defaultSize.width;
                realImgHeight = activeImage.defaultSize.height;
            }
            var _a = __read(getImgWidthHeight(realImgWidth, realImgHeight), 2), width = _a[0], height = _a[1];
            var left = (containerSize.current.width - width) / 2;
            var top = (containerSize.current.height - height - footerHeight) / 2;
            var scaleX = defaultScale;
            var scaleY = defaultScale;
            if (noResetZoomAfterChange && !isReset) {
                scaleX = state.scaleX;
                scaleY = state.scaleY;
            }
            dispatch(createAction(ACTION_TYPES.update, {
                width: width,
                height: height,
                left: left,
                top: top,
                imageWidth: imgWidth,
                imageHeight: imgHeight,
                loading: false,
                rotate: 0,
                scaleX: scaleX,
                scaleY: scaleY,
                loadFailed: !success,
                startLoading: false,
            }));
        }
    }
    React.useEffect(function () {
        if (state.startLoading) {
            currentLoadIndex.current = state.activeIndex;
            loadImg(state.activeIndex);
        }
    }, [state.startLoading, state.activeIndex]);
    function getImgWidthHeight(imgWidth, imgHeight) {
        var width = 0;
        var height = 0;
        var maxWidth = containerSize.current.width * 0.8;
        var maxHeight = (containerSize.current.height - footerHeight) * 0.8;
        width = Math.min(maxWidth, imgWidth);
        height = width / imgWidth * imgHeight;
        if (height > maxHeight) {
            height = maxHeight;
            width = height / imgHeight * imgWidth;
        }
        if (noLimitInitializationSize) {
            width = imgWidth;
            height = imgHeight;
        }
        return [width, height];
    }
    function handleChangeImg(newIndex) {
        if (!loop && (newIndex >= images.length || newIndex < 0)) {
            return;
        }
        if (newIndex >= images.length) {
            newIndex = 0;
        }
        if (newIndex < 0) {
            newIndex = images.length - 1;
        }
        if (newIndex === state.activeIndex) {
            return;
        }
        if (props.onChange) {
            var activeImage = getActiveImage(newIndex);
            props.onChange(activeImage, newIndex);
        }
        dispatch(createAction(ACTION_TYPES.setActiveIndex, {
            index: newIndex,
        }));
    }
    function getActiveImage(activeIndex2) {
        if (activeIndex2 === void 0) { activeIndex2 = undefined; }
        var activeImg2 = {
            src: '',
            alt: '',
            downloadUrl: '',
        };
        var realActiveIndex = null;
        if (activeIndex2 !== undefined) {
            realActiveIndex = activeIndex2;
        }
        else {
            realActiveIndex = state.activeIndex;
        }
        if (images.length > 0 && realActiveIndex >= 0) {
            activeImg2 = images[realActiveIndex];
        }
        return activeImg2;
    }
    function handleDownload() {
        var activeImage = getActiveImage();
        if (activeImage.downloadUrl) {
            if (props.downloadInNewWindow) {
                window.open(activeImage.downloadUrl, '_blank');
            }
            else {
                location.href = activeImage.downloadUrl;
            }
        }
    }
    function handleScaleX(newScale) {
        dispatch(createAction(ACTION_TYPES.update, {
            scaleX: state.scaleX * newScale,
        }));
    }
    function handleScaleY(newScale) {
        dispatch(createAction(ACTION_TYPES.update, {
            scaleY: state.scaleY * newScale,
        }));
    }
    function handleRotate(isRight) {
        if (isRight === void 0) { isRight = false; }
        var rotate = state.rotate + 90 * (isRight ? 1 : -1);
        dispatch(createAction(ACTION_TYPES.update, {
            rotate: rotate,
        }));
        onRotateClick(rotate);
    }
    function handleDefaultAction(type) {
        switch (type) {
            case ActionType.prev:
                handleChangeImg(state.activeIndex - 1);
                break;
            case ActionType.next:
                handleChangeImg(state.activeIndex + 1);
                break;
            case ActionType.zoomIn:
                var imgCenterXY = getImageCenterXY();
                handleZoom(imgCenterXY.x, imgCenterXY.y, 1, zoomSpeed);
                break;
            case ActionType.zoomOut:
                var imgCenterXY2 = getImageCenterXY();
                handleZoom(imgCenterXY2.x, imgCenterXY2.y, -1, zoomSpeed);
                break;
            case ActionType.rotateLeft:
                handleRotate();
                break;
            case ActionType.rotateRight:
                handleRotate(true);
                break;
            case ActionType.reset:
                loadImg(state.activeIndex, true);
                onRotateClick(0);
                break;
            case ActionType.scaleX:
                handleScaleX(-1);
                break;
            case ActionType.scaleY:
                handleScaleY(-1);
                break;
            case ActionType.download:
                handleDownload();
                break;
            default:
                break;
        }
    }
    function handleAction(config) {
        handleDefaultAction(config.actionType);
        if (config.onClick) {
            var activeImage = getActiveImage();
            config.onClick(activeImage);
        }
    }
    function handleChangeImgState(width, height, top, left) {
        dispatch(createAction(ACTION_TYPES.update, {
            width: width,
            height: height,
            top: top,
            left: left,
        }));
    }
    function handleResize() {
        containerSize.current = setContainerWidthHeight();
        if (visible) {
            var left = (containerSize.current.width - state.width) / 2;
            var top_1 = (containerSize.current.height - state.height - footerHeight) / 2;
            dispatch(createAction(ACTION_TYPES.update, {
                left: left,
                top: top_1,
            }));
        }
    }
    function handleCanvasMouseDown(e) {
        onMaskClick(e);
    }
    function bindEvent(remove) {
        if (remove === void 0) { remove = false; }
        var funcName = 'addEventListener';
        if (remove) {
            funcName = 'removeEventListener';
        }
        if (!disableKeyboardSupport) {
            document[funcName]('keydown', handleKeydown, true);
        }
        if (viewerCore.current) {
            viewerCore.current[funcName]('wheel', handleMouseScroll, false);
        }
    }
    function handleKeydown(e) {
        var keyCode = e.keyCode || e.which || e.charCode;
        var isFeatrue = false;
        switch (keyCode) {
            // key: esc
            case 27:
                onClose();
                isFeatrue = true;
                break;
            // key: ←
            case 37:
                if (e.ctrlKey) {
                    handleDefaultAction(ActionType.rotateLeft);
                }
                else {
                    handleDefaultAction(ActionType.prev);
                }
                isFeatrue = true;
                break;
            // key: →
            case 39:
                if (e.ctrlKey) {
                    handleDefaultAction(ActionType.rotateRight);
                }
                else {
                    handleDefaultAction(ActionType.next);
                }
                isFeatrue = true;
                break;
            // key: ↑
            case 38:
                handleDefaultAction(ActionType.zoomIn);
                isFeatrue = true;
                break;
            // key: ↓
            case 40:
                handleDefaultAction(ActionType.zoomOut);
                isFeatrue = true;
                break;
            // key: Ctrl + 1
            case 49:
                if (e.ctrlKey) {
                    loadImg(state.activeIndex);
                    isFeatrue = true;
                }
                break;
            default:
                break;
        }
        if (isFeatrue) {
            e.preventDefault();
            e.stopPropagation();
        }
    }
    function handleMouseScroll(e) {
        if (disableMouseZoom) {
            return;
        }
        if (state.loading) {
            return;
        }
        e.preventDefault();
        var direct = 0;
        var value = e.deltaY;
        if (value === 0) {
            direct = 0;
        }
        else {
            direct = value > 0 ? -1 : 1;
        }
        if (direct !== 0) {
            var x = e.clientX;
            var y = e.clientY;
            if (props.container) {
                var containerRect = props.container.getBoundingClientRect();
                x -= containerRect.left;
                y -= containerRect.top;
            }
            handleZoom(x, y, direct, zoomSpeed);
        }
    }
    function getImageCenterXY() {
        return {
            x: state.left + state.width / 2,
            y: state.top + state.height / 2,
        };
    }
    function handleZoom(targetX, targetY, direct, scale) {
        var imgCenterXY = getImageCenterXY();
        var diffX = targetX - imgCenterXY.x;
        var diffY = targetY - imgCenterXY.y;
        var top = 0;
        var left = 0;
        var width = 0;
        var height = 0;
        var scaleX = 0;
        var scaleY = 0;
        if (state.width === 0) {
            var _a = __read(getImgWidthHeight(state.imageWidth, state.imageHeight), 2), imgWidth = _a[0], imgHeight = _a[1];
            left = (containerSize.current.width - imgWidth) / 2;
            top = (containerSize.current.height - footerHeight - imgHeight) / 2;
            width = state.width + imgWidth;
            height = state.height + imgHeight;
            scaleX = scaleY = 1;
        }
        else {
            var directX = state.scaleX > 0 ? 1 : -1;
            var directY = state.scaleY > 0 ? 1 : -1;
            scaleX = state.scaleX + scale * direct * directX;
            scaleY = state.scaleY + scale * direct * directY;
            if (typeof props.maxScale !== 'undefined') {
                if (Math.abs(scaleX) > props.maxScale) {
                    scaleX = props.maxScale * directX;
                }
                if (Math.abs(scaleY) > props.maxScale) {
                    scaleY = props.maxScale * directY;
                }
            }
            if (Math.abs(scaleX) < minScale) {
                scaleX = minScale * directX;
            }
            if (Math.abs(scaleY) < minScale) {
                scaleY = minScale * directY;
            }
            top = state.top + -direct * diffY / state.scaleX * scale * directX;
            left = state.left + -direct * diffX / state.scaleY * scale * directY;
            width = state.width;
            height = state.height;
        }
        dispatch(createAction(ACTION_TYPES.update, {
            width: width,
            scaleX: scaleX,
            scaleY: scaleY,
            height: height,
            top: top,
            left: left,
            loading: false,
        }));
    }
    var prefixCls = 'react-viewer';
    var className = classnames("" + prefixCls, prefixCls + "-transition", (_a = {},
        _a[prefixCls + "-inline"] = props.container,
        _a[props.className] = props.className,
        _a));
    var viewerStryle = {
        opacity: (visible && state.visible) ? 1 : 0,
        display: (visible || state.visible) ? 'block' : 'none',
    };
    var activeImg = {
        src: '',
        alt: '',
    };
    if (visible && state.visible && !state.loading && state.activeIndex !== null && !state.startLoading) {
        activeImg = getActiveImage();
    }
    return (React.createElement("div", { className: className, style: viewerStryle, onTransitionEnd: function () {
            if (!visible) {
                dispatch(createAction(ACTION_TYPES.setVisible, {
                    visible: false,
                }));
            }
        }, ref: viewerCore },
        React.createElement("div", { className: prefixCls + "-mask", style: { zIndex: zIndex, display: 'none' } }),
        props.noClose || (React.createElement("div", { className: prefixCls + "-close " + prefixCls + "-btn", onClick: function () {
                onClose();
            }, style: { zIndex: zIndex + 10 } },
            React.createElement(Icon, { type: ActionType.close }))),
        React.createElement(ViewerCanvas, { prefixCls: prefixCls, imgSrc: state.loadFailed ? (props.defaultImg.src || activeImg.src) : activeImg.src, visible: visible, width: state.width, height: state.height, top: state.top, left: state.left, rotate: state.rotate, onChangeImgState: handleChangeImgState, onResize: handleResize, zIndex: zIndex + 5, scaleX: state.scaleX, scaleY: state.scaleY, loading: state.loading, drag: drag, container: props.container, onCanvasMouseDown: handleCanvasMouseDown }),
        props.noFooter || (React.createElement("div", { className: prefixCls + "-footer", style: { zIndex: zIndex + 5 } },
            noToolbar || (React.createElement(ViewerToolbar, { prefixCls: prefixCls, onAction: handleAction, alt: activeImg.alt, width: state.imageWidth, height: state.imageHeight, attribute: attribute, zoomable: zoomable, rotatable: rotatable, scalable: scalable, changeable: changeable, downloadable: downloadable, noImgDetails: noImgDetails, toolbars: customToolbar(defaultToolbars), activeIndex: state.activeIndex, count: images.length, showTotal: showTotal })),
            props.noNavbar || (React.createElement(ViewerNav, { prefixCls: prefixCls, images: props.images, activeIndex: state.activeIndex, onChangeImg: handleChangeImg }))))));
});
