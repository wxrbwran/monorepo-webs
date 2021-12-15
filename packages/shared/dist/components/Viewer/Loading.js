import * as React from 'react';
export default function Loading(props) {
    var cls = 'circle-loading';
    return (React.createElement("div", { className: "loading-wrap", style: props.style },
        React.createElement("div", { className: cls })));
}
