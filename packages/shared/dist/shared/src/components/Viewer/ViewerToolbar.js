import * as React from 'react';
import Icon, { ActionType } from './Icon';
export var defaultToolbars = [
    {
        key: 'zoomIn',
        actionType: ActionType.zoomIn,
        text: '放大',
    },
    {
        key: 'zoomOut',
        actionType: ActionType.zoomOut,
        text: '缩小',
    },
    {
        key: 'prev',
        actionType: ActionType.prev,
        text: '上一张',
    },
    {
        key: 'reset',
        actionType: ActionType.reset,
        text: '还原',
    },
    {
        key: 'next',
        actionType: ActionType.next,
        text: '下一张',
    },
    {
        key: 'rotateLeft',
        actionType: ActionType.rotateLeft,
        text: '向左旋转',
    },
    {
        key: 'rotateRight',
        actionType: ActionType.rotateRight,
        text: '向右旋转',
    },
    {
        key: 'scaleX',
        actionType: ActionType.scaleX,
        text: '水平翻转',
    },
    {
        key: 'scaleY',
        actionType: ActionType.scaleY,
        text: '垂直翻转',
    },
    {
        key: 'download',
        actionType: ActionType.download,
        text: '下载',
    },
];
function deleteToolbarFromKey(toolbars, keys) {
    var targetToolbar = toolbars.filter(function (item) { return keys.indexOf(item.key) < 0; });
    return targetToolbar;
}
export default function ViewerToolbar(props) {
    function handleAction(config) {
        props.onAction(config);
    }
    function renderAction(config) {
        var content = null;
        // default toolbar
        if (typeof ActionType[config.actionType] !== 'undefined') {
            content = (React.createElement(React.Fragment, null,
                React.createElement(Icon, { type: config.actionType }),
                React.createElement("p", null, config.text)));
        }
        // extra toolbar
        if (config.render) {
            content = config.render;
        }
        return (React.createElement("li", { key: config.key, className: props.prefixCls + "-btn", onClick: function () { handleAction(config); }, "data-key": config.key }, content));
    }
    var attributeNode = props.attribute ? (React.createElement("p", { className: props.prefixCls + "-attribute" },
        props.alt && "" + props.alt,
        props.noImgDetails || React.createElement("span", { className: props.prefixCls + "-img-details" }, "(" + props.width + " x " + props.height + ")"),
        props.showTotal
            && React.createElement("span", { className: props.prefixCls + "-showTotal" }, props.activeIndex + 1 + " of " + props.count))) : null;
    var toolbars = props.toolbars;
    if (!props.zoomable) {
        toolbars = deleteToolbarFromKey(toolbars, ['zoomIn', 'zoomOut']);
    }
    if (!props.changeable) {
        toolbars = deleteToolbarFromKey(toolbars, ['prev', 'next']);
    }
    if (!props.rotatable) {
        toolbars = deleteToolbarFromKey(toolbars, ['rotateLeft', 'rotateRight']);
    }
    if (!props.scalable) {
        toolbars = deleteToolbarFromKey(toolbars, ['scaleX', 'scaleY']);
    }
    if (!props.downloadable) {
        toolbars = deleteToolbarFromKey(toolbars, ['download']);
    }
    return (React.createElement("div", null,
        attributeNode,
        React.createElement("ul", { className: props.prefixCls + "-toolbar" }, toolbars.map(function (item) { return renderAction(item); }))));
}
