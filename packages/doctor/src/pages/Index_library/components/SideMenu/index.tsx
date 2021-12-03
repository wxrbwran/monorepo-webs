import React, { FC, useState, useEffect } from 'react';
import { SearchOutlined, RightOutlined, EditOutlined } from '@ant-design/icons';
import { Input, List, Space } from 'antd';
import { history, useDispatch } from 'umi';
import * as api from '@/services/api';
import { isOneSelf, isOthers, isSystem } from './util';
import AddType from '../AddType';
import styles from './index.scss';

export type IIndexItem = {
  id: string;
  type: string;
  name?: string;
  sample?: string;
  title?: string;
  jcdName?: string;
  method?: string;
  source: string;
  sourceSid?: string;
};

// type ITemplate = {
//   list: IIndexItem;
//   meta: any;
// };

type TSearchType = {
  name?: string;
};

const { Search } = Input;
const SideMenu: FC = () => {
  const [activeMenu, setActiveMenu] = useState<string>(''); // 当前选中项
  const [HYD, setHYD] = useState<IIndexItem[]>([]);
  const [JCD, setJCD] = useState<IIndexItem[]>([]);
  const [OTHER, setOther] = useState<IIndexItem[]>([]);
  const [activeSubMenu, setActiveSubMenu] = useState<string>('');
  const dispatch = useDispatch();
  // const [imgType, setImgType] = useState<IImgType>({});
  const [keyword, setKeyword] = useState(''); // 只用于搜索框展示文案用，点击菜单时会清空这里
  const [menu, setMenu] = useState<IIndexItem[]>([]);
  const [showSubMenu, setShowSubMenu] = useState(false);
  const curSid = window.$storage.getItem('sid');
  const handleClickMenu = async (item: IIndexItem) => {
    if (item) {
      console.log(item);
      const curDocument = { ...item };
      if (item.title) {
        curDocument.name = item.jcdName;
        curDocument.type = item.title;
      }
      dispatch({
        type: 'document/setCurDocument',
        payload: curDocument,
      });
      const { source, sourceSid } = curDocument;
      let from = 'SYSTEM';
      if (source === 'DOCTOR' && sourceSid === curSid) {
        from = 'ONESELF';
      } else if (source === 'DOCTOR' && sourceSid !== curSid) {
        from = 'OTHERS';
      }
      setActiveSubMenu(curDocument.id);
      setActiveMenu(curDocument.type + from);
      setShowSubMenu(false);
      history.push(`/index_library?documentId=${item.id}&documentType=${curDocument.type}`);
    }
  };

  const fetchHYD = async (params?: TSearchType) => {
    const apiParams: { name?: string; sourceSid: string; source: string } = {
      sourceSid: curSid,
      source: 'DOCTOR',
      ...params,
    };
    const res: { list: IIndexItem[] } = await api.indexLibrary.fetchIndexDocument(apiParams);
    console.log('fetchHYD', res);
    if (res.list?.length > 0) {
      setHYD([...res.list]);
    } else {
      setHYD([]);
    }
    return [...res.list];
  };

  const fetchJcdAndOther = async (param?: TSearchType) => {
    console.log('fetchJcdAndOther', param);
    // const params: { source: string; jcdName?: string } = {
    //   ...param,
    //   jcdName: param?.name,
    //   source: 'SYSTEM',
    // };

    // const res = await api.indexLibrary.fetchImageTemplate(params);
    // if (res.list.length > 0) {
    //   const allTemplate: ITemplate[] = res.list.map((tem) => tem.meta);
    //   const jcds: IIndexItem[] = allTemplate.filter((tem) => tem.title === 'JCD');
    //   const others: IIndexItem[] = allTemplate.filter((tem) => tem.title === 'OTHER');
    //   setJCD([...jcds]);
    //   setOther([...others]);
    // } else {
    setJCD([]);
    setOther([]);
    // }
  };

  const fetchImageType = async (params: TSearchType) => {
    const hyds = await fetchHYD(params);
    const jcds = await fetchJcdAndOther(params);
    // await fetchJcdAndOther(params);
    // if (!route.query.documentId && !route.query.documentType) {
    console.log('fetchImageType', hyds);
    const firstDoc = hyds[0] || jcds[0];
    handleClickMenu(firstDoc);
    // }
  };

  useEffect(() => {
    fetchImageType({});
  }, []);

  const handleSearch = (value: string) => {
    fetchImageType({ name: value });
    setShowSubMenu(true);
  };
  const handleChangeMenu = (typeItem: string, source: string) => {
    console.log(typeItem, source);
    setKeyword('');
    setActiveMenu(typeItem + source);
    setShowSubMenu(true);
    let tmp: IIndexItem[] = [];
    let handledList = HYD;
    if (typeItem === 'JCD') {
      handledList = JCD;
    } else if (typeItem === 'OTHER') {
      handledList = OTHER;
    }
    switch (source) {
      case 'SYSTEM':
        tmp = handledList.filter(isSystem);
        break;
      case 'ONESELF':
        tmp = handledList.filter((h) => isOneSelf(h, curSid));
        break;
      case 'OTHERS':
        tmp = handledList.filter((h) => isOthers(h, curSid));
        break;
    }
    console.log('handledList', handledList);
    console.log('source', source);
    console.log('tmp', tmp);
    setMenu([...tmp]);
    // fetchImageType({});
  };


  const imgTypeText: CommonData = { HYD: '化验单', JCD: '检查单', OTHER: '其他医学单据' };
  const imgTypeSource: CommonData = { SYSTEM: '系统', ONESELF: '自己', OTHERS: '他人' };
  return (
    <div className={styles.menu}>
      <Search
        placeholder="请输入名称"
        className={styles.search_wrap}
        // allowClear
        onSearch={handleSearch}
        prefix={<SearchOutlined />}
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
      />
      {Object.keys(imgTypeText).map((typeItem) => (
        <div key={typeItem}>
          <div className={styles.title}>
            <span>{imgTypeText[typeItem]}</span>
            <AddType imageType={typeItem} onSuccess={fetchImageType} />
          </div>
          <div className={styles.type_list}>
            {Object.keys(imgTypeSource).map((source) => (
              <div
                className={`${styles.type_item} ${
                  typeItem + source === activeMenu ? styles.active : ''
                }`}
                data-type={typeItem}
                data-source={source}
                key={typeItem + source}
                onClick={() => handleChangeMenu(typeItem, source)}
              >
                <span>{imgTypeSource[source]}添加</span>
                <RightOutlined />
              </div>
            ))}
          </div>
        </div>
      ))}
      {showSubMenu && (
        <div className={styles.index_list}>
          <List
            size="default"
            dataSource={menu}
            className="cursor-pointer"
            renderItem={(item: IIndexItem) => (
              <List.Item className={activeSubMenu === item.id ? 'font-bold' : ''}>
                <Space>
                  <span onClick={() => handleClickMenu(item)}>{item.name || item.jcdName}</span>{' '}
                  <EditOutlined />
                </Space>
              </List.Item>
            )}
          />
        </div>
      )}
    </div>
  );
};

export default SideMenu;
