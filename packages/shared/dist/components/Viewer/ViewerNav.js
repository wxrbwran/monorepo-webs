import * as React from 'react';
export default function ViewerNav(props) {
    var _a = props.activeIndex, activeIndex = _a === void 0 ? 0 : _a;
    function handleChangeImg(newIndex) {
        if (activeIndex === newIndex) {
            return;
        }
        props.onChangeImg(newIndex);
    }
    var marginLeft = "calc(50% - " + (activeIndex + 1) + " * 31px)";
    var listStyle = {
        marginLeft: marginLeft,
    };
    return (React.createElement("div", { className: props.prefixCls + "-navbar" },
        React.createElement("ul", { className: props.prefixCls + "-list " + props.prefixCls + "-list-transition", style: listStyle }, props.images.map(function (item, index) { return React.createElement("li", { key: index, className: index === activeIndex ? 'active' : '', onClick: function () { handleChangeImg(index); } },
            React.createElement("img", { src: item.src, alt: item.alt })); }))));
}
