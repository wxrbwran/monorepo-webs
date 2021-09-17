import React, { FC, useState } from 'react';
import {
  Form, InputNumber, Select, Input,
} from 'antd';
import openIcon from '@/assets/img/showNocommon.png';
import closeIcon from '@/assets/img/closeNocommon.png';
import HiddenItems from '../HiddenItems';
import styles from '../CustomIndex/index.scss';

const { Option } = Select;
interface IProps {
  apiData: any;
  subName?: string;
}

const IndexTable: FC<IProps> = (props) => {
  const { apiData, subName } = props;
  const [showAll, setshowAll] = useState(false);
  const renderItem = (type: string) => {
    // 有subName的是有子分类的情况，inx是为了索引唯一使用
    let showDom: any = null;
    let indexListAll: CommonData = {};
    indexListAll = apiData;
    showDom = indexListAll[type].map((item: ICommonItem, index: number) => (
      <div
        className={`${styles.item} ${styles.cont} ${type === 'noCommonItems' ? styles.bg_gray : ''}`}
        key={item.formIndex}
      >
        <div>{indexListAll[type][index].name}</div>
        <div>{indexListAll[type][index]?.abbreviation || '--'}</div>
        <Form.Item name={`${item.formIndex}_value`}>
          <InputNumber width={80} />
        </Form.Item>
        <Form.Item name={`${item.formIndex}_unit`}>
          {
            indexListAll[type][index]?.units?.length > 0 ? (
              <Select style={{ maxWidth: 80 }}>
                {
                  item.units?.map((unit: string) => (
                    <Option key={unit} value={unit}>{unit}</Option>
                  ))
                }
              </Select>
            ) : '--'
          }
        </Form.Item>
        <div className="flex items-start" style={{ minWidth: 170, paddingTop: 10 }}>
          <Form.Item name={`${item.formIndex}_minValue`} noStyle>
            <InputNumber />
          </Form.Item>
          <span className="mr-10 ml-10">-</span>
          <Form.Item name={`${item.formIndex}_maxValue`} noStyle>
            <InputNumber />
          </Form.Item>
        </div>
        {
          subName && (
            <Form.Item name={`${item.formIndex}_subCategoryName`} noStyle><Input type="hidden" /></Form.Item>
          )
        }
        <HiddenItems inx={item.formIndex} />
      </div>
    ));
    return showDom;
  };
  return (
    <div className={styles.list_wrap}>
      <div className={`${styles.item} ${styles.bg_gray} ${styles.header}`}>
        <div>名称</div>
        <div>缩写</div>
        <div>数值</div>
        <div>单位</div>
        <div>参考值</div>
      </div>
      {renderItem('commonItems')}
      <div style={{ display: showAll ? 'block' : 'none' }}>
        {renderItem('noCommonItems')}
      </div>
      <div className={styles.open_btn} onClick={() => setshowAll(!showAll)}>
        {`点击${showAll ? '收起' : '展开'}不常用指标`}
        <img className="w-14 h-14" src={showAll ? closeIcon : openIcon} alt="" />
      </div>
    </div>
  );
};

export default IndexTable;
