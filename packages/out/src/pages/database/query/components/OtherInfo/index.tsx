import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Checkbox } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import styles from '../../index.scss';

const CheckboxGroup = Checkbox.Group;

const otherInfo = [
  {
    key: 'FOURHIGH',
    value: '四大代谢疾病',
  },
];
const options = [
  { label: '高血压病', value: 'HYPERTENSION' },
  { label: '糖尿病', value: 'HYPERGLYCEMIA' },
  { label: '高脂血症', value: 'HYPERLIPEMIA' },
  { label: '高尿酸症', value: 'HYPERURICEMIA' },
];

function OtherInfo() {
  const dispatch = useDispatch();
  const [tabKey, setTabKey] = useState('');
  // const [disease, setDisease] = useState([]);
  const other = useSelector((state: IQuery) => state.query.other);

  const changeTab = (key: string) => {
    if (key === tabKey) {
      setTabKey('');
    } else {
      setTabKey(key);
    }
  };

  const changeDisease = (checkedValues: any) => {
    // setDisease(checkedValues);
    dispatch({
      type: 'query/setOther',
      payload:
        checkedValues.length === 0
          ? null
          : {
              fourHigh: checkedValues,
            },
    });
  };

  return (
    <div className={styles.main}>
      <div className={styles.lable}>其他</div>
      <div
        className={styles.group_value}
        style={tabKey ? { paddingBottom: 60 } : { paddingBottom: 22 }}
      >
        {otherInfo.map((item) => (
          <div className={styles.item_box} key={item.key}>
            <div
              onClick={() => changeTab(item.key)}
              className={item.key === tabKey ? `${styles.title} ${styles.active}` : styles.title}
            >
              {item.value} <DownOutlined />
            </div>
            <div
              style={item.key === tabKey ? { display: 'block' } : { display: 'none' }}
              className={styles.value}
            >
              <CheckboxGroup
                options={options}
                onChange={changeDisease}
                defaultValue={other ? other.fourHigh : []}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default OtherInfo;
