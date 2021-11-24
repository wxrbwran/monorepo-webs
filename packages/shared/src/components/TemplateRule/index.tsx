import React from 'react';
// import * as api from '@/services/api';
// import { sendType, IPlanItem } from '@/utils/consts';
// import { useSelector } from 'umi';
// import ScaleCondition from '@/components/ScaleCondition';
import styles from './index.scss';
import FirstSendTime from './FirstSendTime';
// import { CrfScaleSourceType, SubectiveScaleSourceType, transformDynamicToStatic, ObjectiveSourceType } from '../../pages/query/util';
// import { isEmpty, cloneDeep } from 'lodash';
// import { IChooseValues, ICondition, IItem, IRuleDoc } from '../../pages/subjective_table/util';


// const { TextArea } = Input;
// const CheckboxGroup = Checkbox.Group;
// const { Option } = Select;
// let timer: any = null;
interface IProps {
  mode: string;
}

function TemplateRule({ mode }: IProps) {

  return (
        <div className={mode === 'Add' ? styles.send_plan : `${styles.send_plan} ${styles.edit}`}>
            <FirstSendTime></FirstSendTime>
        </div>
  );
}

export default TemplateRule;
