import React from 'react';
// import * as api from '@/services/api';
// import { sendType, IPlanItem } from '@/utils/consts';
// import { useSelector } from 'umi';
// import ScaleCondition from '@/components/ScaleCondition';
import styles from './index.scss';
import FirstSendTime from './FirstSendTime';
function TemplateRule(_a) {
    var mode = _a.mode;
    return (React.createElement("div", { className: mode === 'Add' ? styles.send_plan : styles.send_plan + " " + styles.edit },
        React.createElement(FirstSendTime, null)));
}
export default TemplateRule;
