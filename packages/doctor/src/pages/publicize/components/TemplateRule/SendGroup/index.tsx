import React, { FC, useEffect, useState } from 'react';
import { Checkbox } from 'antd';
// import * as api from '@/services/api';
import styles from './index.scss';
import { IItem } from '../util';
import { isEmpty } from 'lodash';


interface IProps {

  scopeSources: IItem;
  onGroupChange: (choseScope: IItem[]) => void;
  choseScopes: IItem[];
}

const CheckboxGroup = Checkbox.Group;

const SendGroup: FC<IProps> = ({ scopeSources, onGroupChange, choseScopes }: IProps) => {


  const [choseScope, setChoseScope] = useState<IItem[]>(choseScopes);

  useEffect(() => {
    onGroupChange(choseScope);
  }, [choseScope]);


  useEffect(() => {
    setChoseScope(choseScopes);
  }, [choseScopes]);

  //发送实验组-zhou
  const handleChangeGroup = (checkedValues: any[]) => {

    const choseList = scopeSources.items.filter(item => checkedValues.includes(item.description));
    setChoseScope(choseList);
  };

  const options = isEmpty(scopeSources) ? [] : scopeSources.items.map((item: IItem) => ({
    label: item.description,
    value: item.description,
  }));

  const des = choseScope.map(item => item.description);

  return (
    <div className={styles.template_rule}>
      <h2>
        <span className={styles.start}>*</span>发送对象：
      </h2>
      <CheckboxGroup
        options={options}
        onChange={handleChangeGroup}
        value={des}
      />
    </div>
  );
};


export default SendGroup;
