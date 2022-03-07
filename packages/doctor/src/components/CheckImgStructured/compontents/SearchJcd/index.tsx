import React, { FC, useState, useRef, useEffect } from 'react';
import { AutoComplete, Row, Col, message, Button } from 'antd';
import * as api from '@/services/api';
import { IAddJcdItem } from '../type';
import { isEmpty, debounce } from 'lodash';
import { getSource } from '../utils';
import styles from './index.scss';

export type IPartMethod = {
  part?: string;
  method?: string
  jcdName?: string;
};
export type INameItem = {
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
  action?: string;
  onCancel?: () => void;
}

const SearchJcd: FC<IProps> = (props) => {
  const { changePartMethod, handleAddJcdTab, handleShowAddJctBtn, createJcdNum, outType, action, onCancel } = props;
  const partMethod = useRef({ part: '', method: '' });
  const [partsMethods, setPartsMethods] = useState({}); // 部位+方法列表数据源
  const [partList, setPartList] = useState([]);
  const [methodList, setMethodList] = useState([]);
  const [nameList, setNameList] = useState<INameItem[]>([]); // 检查单名称列表
  const [otherNames, setOtherNames] = useState<INameItem[]>([]); // 其它单据-单据名称
  const [selectId, setSelectId] = useState<string | undefined>(); // 检查单名称or单据名称勾选的id
  const isSearchModal = action === 'searchModal';
  const handleFetchNames = (jcdName?: string) => {
    changePartMethod(partMethod.current);
    const { part, method } = partMethod.current;
    const p = { ...partMethod.current, jcdName };
    if (part || method || !!jcdName) {
      let apiParams = { title: 'JCD' };
      Object.keys(p).forEach(key => {
        if (p[key]) {
          apiParams[key] = p[key];
        }
      });
      api.image.fetchImageTemplateName(apiParams).then(res => {
        setNameList(res.jcdTitleSet);
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
      handleFetchNames(); // 父组件，双击tab修改了检查单名称后，这里重新拉一下检查名称列表，更新数据
    }
  }, [createJcdNum]);
  const handleSearchPartMethod = (val: string, type: string) => {
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
    const oVal = { ...partMethod.current };
    if (val.trim() === '') { delete oVal[type]; } else { oVal[type] = val; }
    partMethod.current = { ...oVal };
  };
  // 往tab栏增加选择的单据
  const handleAddJcdBtn = (paramId?: string) => {
    const curId = paramId || selectId;
    if (curId) {
      const baseInfo:INameItem = nameList.find(item => item.id === curId) as INameItem;
      handleAddJcdTab({ ...baseInfo, ...partMethod.current, creatorSid: baseInfo.sid });
      if (onCancel) {onCancel();}
    } else {
      message.warn('请选择检查单');
    }
  };

  const handleAddOtherBtn = (paramId?: string) => {
    const curId = paramId || selectId;
    const curInfo = otherNames.find(item => item.id === curId);
    handleAddJcdTab({ ...curInfo, creatorSid: curInfo.sid });
    if (onCancel) {onCancel();}
  };
  // 勾选检查单名称或者其他单据名称
  const handleSelectName = (val: string, { key }: { key: string }) => {
    setSelectId(key);
    // 如果不是搜索弹框，则直接进行添加tab流程。
    if (!isSearchModal) {
      if (outType === 'JCD') {
        handleAddJcdBtn(key);
      } else {
        handleAddOtherBtn(key);
      }
    }
  };
  // 搜索其他医学单据-单据名称
  const handleSearchOtherName = (val: string) => {
    changePartMethod({ 'jcdName': val  });
    if (val) {
      api.image.fetchImageTemplateName({ jcdName: val, title: 'OTHER' }).then(res => {
        setOtherNames(res.jcdTitleSet);
        handleShowAddJctBtn(!!isEmpty(res.jcdTitleSet));
      });
    }
  };

  return (
    <div className={`${styles.search_jcd} ${isSearchModal ? styles.search_jcd_modal : ''}`}>
      <Row>
        {
          outType === 'JCD' ? (
            <>
               <Col span={isSearchModal ? 24 : 11} className='my-10 flex'>
                <span className={styles.tit}>检查部位：</span>
                <AutoComplete
                  options={partList}
                  placeholder="请输入检查部位"
                  onSearch={(e) => handleSearchPartMethod(e, 'partList')}
                  onChange={(e) => handleChangePartMethod(e, 'part')}
                  onBlur={() => handleFetchNames()}
                />
              </Col>
              <Col span={isSearchModal ? 24 : 13} className={`my-10 flex ${isSearchModal ? '' : 'pl-28'}`}>
                <span className={styles.tit}>检查方法：</span>
                <AutoComplete
                  options={methodList}
                  placeholder="请输入检查方法"
                  onSearch={(e) => handleSearchPartMethod(e, 'methodList')}
                  onChange={(e) => handleChangePartMethod(e, 'method')}
                  onBlur={() => handleFetchNames()}
                />
              </Col>
              <Col span={24}>
              <div className="mt-10 flex items-center">
                <span className={styles.tit}>检查名称：</span>
                <AutoComplete
                  placeholder="请输入检查单名称"
                  onSearch={debounce((val) => handleFetchNames(val), 500)}
                  onSelect={handleSelectName}
                  value={nameList.find(i => i.id === selectId)?.jcdName}
                  dropdownClassName={styles.autocomplete}
                >
                  {
                    nameList.map(item => (
                      <AutoComplete.Option key={item.id} value={item.id}>
                        <span dangerouslySetInnerHTML={{ __html: getSource(item.source, item.sid) }}></span>
                        <span>{item.jcdName}</span>
                      </AutoComplete.Option>
                    ))
                  }
                </AutoComplete>
              </div>
              </Col>
            </>
          ) : (
            <Col span={24} className='my-10 flex pl-28'>
              <span className={styles.tit}>单据名称：</span>
              <AutoComplete
                placeholder="请输入单据名称"
                onSearch={debounce(handleSearchOtherName, 500)}
                onSelect={handleSelectName}
                value={otherNames.find(i => i.id === selectId)?.jcdName}
              >
                {
                  otherNames.map(item => (
                    <AutoComplete.Option key={item.id} value={item.id}>
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
      {
        isSearchModal && (
          <div className="common__btn mt-20">
            <Button onClick={onCancel} > 取消 </Button>
            <Button htmlType="submit" type="primary" onClick={() => (
              outType === 'JCD' ? handleAddJcdBtn() : handleAddOtherBtn())
              } > 确定 </Button>
          </div>
        )
      }
    </div>
  );
};

export default SearchJcd;
