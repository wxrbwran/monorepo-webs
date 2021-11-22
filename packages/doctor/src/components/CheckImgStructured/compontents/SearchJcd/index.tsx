import React, { FC, useState, useRef, useEffect } from 'react';
import { AutoComplete, Select, Button, Row, Col, message } from 'antd';
import iconGf from '@/assets/img/icon_official.png';
import * as api from '@/services/api';
import { IAddJcdItem } from '../type';
import { isEmpty } from 'lodash';
import styles from './index.scss';

const { Option } = Select;
type IPartMethod = {
  part: string;
  method: string
};
type INameItem = {
  jcdName: string;
  sid: string;
  source: string;
  id: string; // 单据模板id
};
interface IProps {
  changePartMethod: (data: IPartMethod) => void;
  handleAddJcdTab: (data: IAddJcdItem) => void;
  handleShowAddJctBtn: (isShow: boolean) => void;
  createJcdNum: number;
}

const SearchJcd: FC<IProps> = (props) => {
  const { changePartMethod, handleAddJcdTab, handleShowAddJctBtn, createJcdNum } = props;
  const partMethod = useRef({ part: '', method: '' });
  const [partsMethods, setPartsMethods] = useState({}); // 部位+方法列表数据源
  const [partList, setPartList] = useState([]);
  const [methodList, setMethodList] = useState([]);
  const [nameList, setNameList] = useState<INameItem[]>([]);
  const [selectName, setSelectName] = useState<string | undefined>();

  useEffect(() => {
    api.image.fetchImageTemplatePart().then(res => {
      setPartsMethods(res);
    });
  }, [createJcdNum]);
  const handleSearch = (val: string, type: string) => {
    if (val) {
      const filterList = partsMethods[type].filter(item => {
        return item.toUpperCase().indexOf(val.toUpperCase()) !== -1;
      }).map(item => { return { value: item };});
      if (type === 'partList') {
        setPartList(filterList);
      } else {
        setMethodList(filterList);
      }
    }
  };
  const handleChangePartMethod = (val: string, type: string) => {
    partMethod.current = { ...partMethod.current, [type]: val };
  };
  const handleBlur = () => {
    changePartMethod(partMethod.current);
    const { part, method } = partMethod.current;
    if (part && method) {
      api.image.fetchImageTemplateName(partMethod.current).then(res => {
        setNameList(res.jcdTitleSet);
        setSelectName(undefined);
        handleShowAddJctBtn(!!isEmpty(res.jcdTitleSet));
      });
    }
  };
  const handleSelectJcd = (val: string) => {
    setSelectName(val);
  };
  const handleAddJcd = () => {
    if (selectName) {
      console.log('添加检查单', selectName, partMethod);
      // handleAddJcdTab
      const baseInfo:INameItem = nameList.find(item => item.jcdName === selectName) as INameItem;
      handleAddJcdTab({ ...baseInfo, ...partMethod.current });
    } else {
      message.warn('请选择检查单');
    }

  };
  return (
    <div className={styles.search_jcd}>
      <Row>
        <Col span={11} className='my-10 flex'>
          <span className={styles.tit}>检查部位：</span>
          <AutoComplete
            options={partList}
            placeholder="请输入检查部位"
            onSearch={(e) => handleSearch(e, 'partList')}
            onChange={(e) => handleChangePartMethod(e, 'part')}
            onBlur={handleBlur}
          />
        </Col>
        <Col span={13} className='my-10 flex pl-28'>
          <span className={styles.tit}>检查方法：</span>
          <AutoComplete
            options={methodList}
            placeholder="请输入检查方法"
            onSearch={(e) => handleSearch(e, 'methodList')}
            onChange={(e) => handleChangePartMethod(e, 'method')}
            onBlur={handleBlur}
          />
        </Col>
      </Row>
      {
        !isEmpty(nameList) && (
          <div className="mt-10 flex items-center">
            <span className={styles.tit}>检查名称：</span>
            <Select style={{ flex: 1 }} onChange={handleSelectJcd} placeholder="请选择检查单">
              {
                nameList.map(item => (
                  <Option value={item.jcdName} key={item.jcdName}>
                    {
                      item.source === 'SYSTEM' &&  <img className="w-16 h-16" src={iconGf} />
                    }
                    <span>{ item.source === 'SYSTEM' && '【官方】'}{item.jcdName}</span>
                  </Option>
                ))
              }
            </Select>
            <Button className={styles.add_btn} onClick={handleAddJcd}>添加</Button>
          </div>
        )
      }
    </div>
  );
};

export default SearchJcd;
