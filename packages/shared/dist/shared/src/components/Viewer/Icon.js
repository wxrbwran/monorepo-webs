import * as React from 'react';
export var ActionType;
(function (ActionType) {
    ActionType[ActionType["zoomIn"] = 1] = "zoomIn";
    ActionType[ActionType["zoomOut"] = 2] = "zoomOut";
    ActionType[ActionType["prev"] = 3] = "prev";
    ActionType[ActionType["next"] = 4] = "next";
    ActionType[ActionType["rotateLeft"] = 5] = "rotateLeft";
    ActionType[ActionType["rotateRight"] = 6] = "rotateRight";
    ActionType[ActionType["reset"] = 7] = "reset";
    ActionType[ActionType["close"] = 8] = "close";
    ActionType[ActionType["scaleX"] = 9] = "scaleX";
    ActionType[ActionType["scaleY"] = 10] = "scaleY";
    ActionType[ActionType["download"] = 11] = "download";
})(ActionType || (ActionType = {}));
export default function Icon(props) {
    var prefixCls = 'react-viewer-icon';
    return (React.createElement("i", { className: prefixCls + " " + prefixCls + "-" + ActionType[props.type] }));
}
