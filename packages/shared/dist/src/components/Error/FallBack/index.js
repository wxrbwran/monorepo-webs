/**
 * Created by wuxiaoran on 2019/3/6.
 */
import React from 'react';
var Fallback = function (props) { return (React.createElement("div", null,
    React.createElement("h1", null, "\u9875\u9762\u51FA\u9519\uFF0C\u8BF7\u68C0\u67E5\uFF01"),
    React.createElement("details", null,
        "====================Error Message:",
        React.createElement("p", null, props.error.message),
        "====================componentStack:",
        React.createElement("p", null, props.info.componentStack),
        "====================Info:",
        React.createElement("p", null, JSON.stringify(props))))); };
export default Fallback;
