import React, { FC, useRef, useState, useEffect } from 'react';
import * as api from '@/services/api';
// import { sendType, IPlanItem } from '@/utils/consts';
import { useSelector } from 'umi';
// import ScaleCondition from '@/components/ScaleCondition';

import styles from './index.scss';
import FirstSendTime from './FirstSendTime';
import { ContentListModel } from './FirstSendTime/ChoiceContent';
import SendFrequency from './SendFrequency';
import SendCondition from './ScaleCondition';
import SendGroup from './SendGroup';

// import { CrfScaleSourceType, SubectiveScaleSourceType, transformDynamicToStatic, ObjectiveSourceType } from '../../pages/query/util';
// import { isEmpty, cloneDeep } from 'lodash';
// import { IChooseValues, ICondition, IItem, IRuleDoc } from '../../pages/subjective_table/util';
import { Button } from 'antd';
import { IItem } from './util';
import { isEmpty } from 'lodash';
import ContentPopover from './ContentPopover/index';





// const { TextArea } = Input;
// const CheckboxGroup = Checkbox.Group;
// const { Option } = Select;
// let timer: any = null;
interface IProps {
  mode: string;

  type: 'FOLLOW' | 'PUBLICIZE_EDUCATION'; // isScale ? 2 : 3
  sourceType: 2 | 3;

  dragModalSources: ContentListModel[]; //ContentListModel[]会作为+号点击弹窗的数据来源
  dragModalDidShow: () => void; // 弹窗显示会调


  onCancelClick: () => void;
  onSaveClick: ({ }) => void;
}

type ContentType = 'firstTime' | 'frequency';

const TemplateRule: FC<IProps> = ({
  mode, dragModalDidShow, dragModalSources, onCancelClick,
  type, sourceType,
}: IProps) => {

  const currentOrgInfo = useSelector((state: IState) => state.user.currentOrgInfo);

  // const [contentListVisible, setContentListVisible] = useState(false); //选中的起始发送时间子item

  const firstTimeRef = useRef<{ choiceModel: any, choiceContentSids: string[] }>({ choiceModel: null, choiceContentSids: [] });
  const frequencyRef = useRef<{ choiceModel: any, choiceContentSids: string[] }>({ choiceModel: null, choiceContentSids: [] });

  const [scopeSource, setScopeSource] = useState<IItem>({});
  const [choseScope, setChoseScope] = useState<IItem[]>([]);

  const [conditionSource, setConditionSource] = useState<IItem>({});
  const initItems = {
    chooseItem: {
      name: '',
      description: '',
    },
    chooseValue: {

    },
  };
  const [choseConditions, setChoseConditions] = useState<ICondition[]>([initItems]); //选中的起始发送时间子item
  // const [frequency, setFrequency] = useState(initFrequency); //发送频率

  useEffect(() => {
    api.education
      .getRules(type)
      .then((res) => {
        console.log('resrules', res);

        for (let i = 0; i < res.keys.length; i++) {
          if (res.keys[i].name == 'start') {
            // fillValueInStartTimeKey(res.keys[i], projectSid, projectRoleType);
            // setStartTimeKey(res.keys[i]);

            // setChooseStartTime((preState) => {
            //   if (isEmpty(preState)) {
            //     return res.keys[i].items[0];
            //   }
            //   return preState;
            // });
          } else if (res.keys[i].name == 'scope') {

            const element = res.keys[i].items[0];
            if (element.type == 'dynamic') {

              const params = {
                sourceType: sourceType,
                kp: element.name,
                rsList: [{
                  sid: window.$storage.getItem('sid'),
                  roleType: window.$storage.getItem('currRoleId'),
                  nsId: window.$storage.getItem('nsId'),
                }, {
                  sid: currentOrgInfo.sid,
                  roleType: currentOrgInfo.role,
                  nsId: currentOrgInfo.nsId,
                }],
              };
              api.education
                .fetchNodeEl(element.assign.value, params)
                .then((r) => {
                  // fillValueInScopeKey(r);
                  setScopeSource(r);
                  setChoseScope((preState) => {
                    if (isEmpty(preState)) {
                      return [res.keys[i].items[0]];
                    }
                    return preState;
                  });
                })
                .catch((err: string) => {
                  console.log('err', err);
                });
            }
          } else if (res.keys[i].name == 'condition') {
            setConditionSource(res.keys[i]);
          }
        }
      });
  }, []);


  const onChoiceModelChange = (choiceModel: IModel) => {
    firstTimeRef.current.choiceModel = choiceModel;
  };

  // 平率
  const onFrequencyChange = (frequency) => {
    frequencyRef.current = frequency;
  };

  // 发送条件
  const onUpdateChoseConditions = (conditions: any[]) => {
    setChoseConditions(conditions);
  };

  // 发送小组
  const onGroupChange = (_choseScope: IItem[]) => {

  };

  const saveClick = () => {

    const choice = {
      firstTime: firstTimeRef.current,
      frequency: frequencyRef.current,
    };

    console.log('================== saveClick saveClick', JSON.stringify(choice));
  };

  const onContentListAdd = (contentType: ContentType, _choicesSid: string[]) => {

    if (contentType == 'firstTime') {
      // firstTimeRef.current.choiceContentSids = choicesSid;
    }
  };

  const onRemoveSuccess = (contentType: ContentType, _item: any, _index: number, _list: any[]) => {

    if (contentType == 'firstTime') {

    }
    // setContentList(list);
  };

  const contentPopver = (contentType: ContentType) => {

    return (
      <ContentPopover contentListsources={[]}
        onRemoveSuccess={(item: any, index: number, list: any[]) => { onRemoveSuccess(contentType, item, index, list); }}
        dragModalSources={dragModalSources}
        onDragModalDidShow={dragModalDidShow}
        onSaveChoices={(choicesSid) => onContentListAdd(contentType, choicesSid)} />
    );
  };

  return (
    <div className={mode === 'Add' ? styles.send_plan : `${styles.send_plan} ${styles.edit}`}>
      <FirstSendTime choiceModelChange={onChoiceModelChange} popverContent={
        contentPopver('firstTime')
      } />
      <SendFrequency onFrequencyChange={onFrequencyChange} popverContent={
        contentPopver('frequency')
      } ></SendFrequency>
      <SendCondition
        conditions={conditionSource}
        updateChoseConditions={onUpdateChoseConditions}
        values={choseConditions}
      />
      <SendGroup scopeSources={scopeSource} onGroupChange={onGroupChange} choseScope={choseScope}></SendGroup>
      <div className='flex flex-row justify-center'>
        <Button className="w-98 mt-20 mb-0 mr-20" type="primary" onClick={onCancelClick}>取消</Button>
        <Button className="w-98 mt-20 mb-0 " type="primary" onClick={saveClick}>完成</Button>
      </div>
    </div>
  );
};


TemplateRule.defaultProps = {

};

export default TemplateRule;
