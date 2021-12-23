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
import classnames from 'classnames';
import Loading from './Loading';
export default function ViewerCanvas(props) {
    var _a;
    var isMouseDown = React.useRef(false);
    var prePosition = React.useRef({
        x: 0,
        y: 0,
    });
    var _b = __read(React.useState({
        x: 0,
        y: 0,
    }), 2), position = _b[0], setPosition = _b[1];
    React.useEffect(function () { return function () {
        bindEvent(true);
        bindWindowResizeEvent(true);
    }; }, []);
    React.useEffect(function () {
        bindWindowResizeEvent();
        return function () {
            bindWindowResizeEvent(true);
        };
    });
    React.useEffect(function () {
        if (props.visible && props.drag) {
            bindEvent();
        }
        if (!props.visible && props.drag) {
            handleMouseUp({});
        }
        return function () {
            bindEvent(true);
        };
    }, [props.drag, props.visible]);
    React.useEffect(function () {
        var diffX = position.x - prePosition.current.x;
        var diffY = position.y - prePosition.current.y;
        prePosition.current = {
            x: position.x,
            y: position.y,
        };
        props.onChangeImgState(props.width, props.height, props.top + diffY, props.left + diffX);
    }, [position]);
    function handleResize(e) {
        props.onResize();
    }
    function handleCanvasMouseDown(e) {
        props.onCanvasMouseDown(e);
        handleMouseDown(e);
    }
    function handleMouseDown(e) {
        if (e.button !== 0) {
            return;
        }
        if (!props.visible || !props.drag) {
            return;
        }
        e.preventDefault();
        e.stopPropagation();
        isMouseDown.current = true;
        prePosition.current = {
            x: e.nativeEvent.clientX,
            y: e.nativeEvent.clientY,
        };
    }
    var handleMouseMove = function (e) {
        if (isMouseDown.current) {
            setPosition({
                x: e.clientX,
                y: e.clientY,
            });
        }
    };
    function handleMouseUp(e) {
        isMouseDown.current = false;
    }
    function bindWindowResizeEvent(remove) {
        var funcName = 'addEventListener';
        if (remove) {
            funcName = 'removeEventListener';
        }
        window[funcName]('resize', handleResize, false);
    }
    function bindEvent(remove) {
        var funcName = 'addEventListener';
        if (remove) {
            funcName = 'removeEventListener';
        }
        document[funcName]('click', handleMouseUp, false);
        document[funcName]('mousemove', handleMouseMove, false);
    }
    var imgStyle = {
        width: props.width + "px",
        height: props.height + "px",
        transform: "\ntranslateX(" + (props.left !== null ? props.left + "px" : 'aoto') + ") translateY(" + props.top + "px)\n    rotate(" + props.rotate + "deg) scaleX(" + props.scaleX + ") scaleY(" + props.scaleY + ")",
        pointerEvents: 'auto',
    };
    var imgClass = classnames(props.prefixCls + "-image", (_a = {
            drag: props.drag
        },
        _a[props.prefixCls + "-image-transition"] = !isMouseDown.current,
        _a));
    var style = {
        zIndex: props.zIndex,
        pointerEvents: 'none',
    };
    var imgNode = null;
    if (props.imgSrc !== '') {
        imgNode = React.createElement("img", { className: imgClass, src: props.imgSrc, style: imgStyle, onMouseDown: handleMouseDown });
    }
    if (props.loading) {
        imgNode = (React.createElement("div", { style: {
                display: 'flex',
                height: window.innerHeight - 84 + "px",
                justifyContent: 'center',
                alignItems: 'center',
            } },
            React.createElement(Loading, null)));
    }
    return (React.createElement("div", { className: props.prefixCls + "-canvas", 
        // onMouseDown={handleCanvasMouseDown}
        style: style }, imgNode));
}
