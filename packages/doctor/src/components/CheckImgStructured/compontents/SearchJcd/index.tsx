import React, { FC, useState, useRef, useEffect } from 'react';
import { AutoComplete, Select, Button, Row, Col, message } from 'antd';
import * as api from '@/services/api';
import { IAddJcdItem } from '../type';
import { isEmpty, debounce } from 'lodash';
import { getSource } from '../utils';
import styles from './index.scss';

const { Option } = Select;
type IPartMethod = {
  part?: string;
  method?: string
  jcdName?: string;
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
  outType: string;
}

const SearchJcd: FC<IProps> = (props) => {
  const { changePartMethod, handleAddJcdTab, handleShowAddJctBtn, createJcdNum, outType } = props;
  const partMethod = useRef({ part: '', method: '' });
  const [partsMethods, setPartsMethods] = useState({}); // 部位+方法列表数据源
  const [partList, setPartList] = useState([]);
  const [methodList, setMethodList] = useState([]);
  const [nameList, setNameList] = useState<INameItem[]>([]); // 检查单名称列表
  const [otherNames, setOtherNames] = useState<INameItem[]>([]); // 其它单据-单据名称
  const [selectId, setSelectId] = useState<string | undefined>();
  const handleBlur = () => {
    changePartMethod(partMethod.current);
    const { part, method } = partMethod.current;
    if (part && method) {
      api.image.fetchImageTemplateName(partMethod.current).then(res => {
        setNameList(res.jcdTitleSet);
        console.log('999999', res.jcdTitleSet);
        setSelectId(undefined);
        handleShowAddJctBtn(!!isEmpty(res.jcdTitleSet));
      });
    }
  };
  useEffect(() => {
    api.image.fetchImageTemplatePart().then(res => {
      setPartsMethods(res);
    });
    if (!isEmpty(nameList)) {
      handleBlur(); // 父组件，双击tab修改了检查单名称后，这里重新拉一下检查名称列表，更新数据
    }
  }, [createJcdNum]);
  const handleSearch = (val: string, type: string) => {
    if (val) {
      const filterList = partsMethods?.[type]?.filter(item => {
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

  const handleSelectJcd = (val: string) => {
    setSelectId(val);
  };
  const handleAddJcd = () => {
    if (selectId) {
      console.log('添加检查单', selectId, partMethod);
      // handleAddJcdTab
      const baseInfo:INameItem = nameList.find(item => item.id === selectId) as INameItem;
      console.log('9992', { ...baseInfo, ...partMethod.current, creatorSid: baseInfo.sid });
      handleAddJcdTab({ ...baseInfo, ...partMethod.current, creatorSid: baseInfo.sid });
    } else {
      message.warn('请选择检查单');
    }
  };
  const handleAddOther = (val: string) => {
    const curInfo = otherNames.find(item => item.jcdName === val);
    console.log('curInfo', curInfo);
    handleAddJcdTab({ ...curInfo, creatorSid: curInfo.sid });
  };
  const handleSearchOtherName = (val: string) => {
    changePartMethod({ 'jcdName': val  });
    if (val) {
      api.image.fetchImageTemplateName({ jcdName: val, title: 'OTHER' }).then(res => {
        setOtherNames(res.jcdTitleSet);
        handleShowAddJctBtn(!!isEmpty(res.jcdTitleSet));
      });
    }
  };
  console.log('nameList', nameList);
  console.log('otherNames', otherNames);
  return (
    <div className={styles.search_jcd}>
      <Row>
        {
          outType === 'JCD' ? (
            <>
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
            </>
          ) : (
            <Col span={24} className='my-10 flex pl-28'>
              <span className={styles.tit}>单据名称：</span>
              <AutoComplete
                placeholder="请输入单据名称"
                onSearch={debounce(handleSearchOtherName, 500)}
                onSelect={handleAddOther}
              >
                {
                  otherNames.map(item => (
                    <AutoComplete.Option key={item.id} value={item.jcdName}>
                      <span dangerouslySetInnerHTML={{ __html: getSource(item.source, item.sid) }}></span>
                      <span>{item.jcdName}</span>
                    </AutoComplete.Option>
                  ))
                }
              </AutoComplete>
            </Col>
          )
        }
      </Row>
      {!isEmpty(nameList) && (
        <div className="mt-10 flex items-center">
          <span className={styles.tit}>检查名称：</span>
          <Select style={{ flex: 1 }} onChange={handleSelectJcd} placeholder="请选择检查单">
            {nameList.map((item) => {
              // const { cName, title } = getSource(item.source, item.sid);
              return (
                <Option value={item.id} key={item.id}>
                  <span dangerouslySetInnerHTML={{ __html: getSource(item.source, item.sid) }}></span>
                  <span>{item.jcdName}</span>
                </Option>
              );
            })}
          </Select>
          <Button className={styles.add_btn} onClick={handleAddJcd}>
            添加
          </Button>
        </div>
      )}
    </div>
  );
};

export default SearchJcd;
