import React, { FC, useState, useEffect } from 'react';
import { SearchOutlined, RightOutlined, PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { Input, List, Space, Popconfirm, message } from 'antd';
import { history, useDispatch, useLocation } from 'umi';
import * as api from '@/services/api';
import { isOneSelf, isOthers, isSystem } from './util';
import AddEditDocument from '../AddEditDocument';
import styles from './index.scss';

type TTemplate = {
  list: TIndexItem[];
  meta: {
    id: string;
  };
};

const { Search } = Input;
const SideMenu: FC = () => {
  const [activeMenu, setActiveMenu] = useState<string>(''); // 当前选中项
  const [HYD, setHYD] = useState<TIndexItem[]>([]);
  const [JCD, setJCD] = useState<TIndexItem[]>([]);
  const [OTHER, setOther] = useState<TIndexItem[]>([]);
  const [activeSubMenu, setActiveSubMenu] = useState<string>('');
  const [keyword, setKeyword] = useState(''); // 只用于搜索框展示文案用，点击菜单时会清空这里
  const [menu, setMenu] = useState<TIndexItem[]>([]);
  const [source, setSource] = useState<string>('SYSTEM');
  const [showSubMenu, setShowSubMenu] = useState(false);
  const dispatch = useDispatch();
  const location = useLocation();
  // const [imgType, setImgType] = useState<IImgType>({});

  const curSid = window.$storage.getItem('sid');
  const handleClickMenu = async (item: TIndexItem) => {
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
      const { sourceSid } = curDocument;
      let from = 'SYSTEM';
      if (curDocument.source === 'DOCTOR' && sourceSid === curSid) {
        from = 'ONESELF';
      } else if (curDocument.source === 'DOCTOR' && sourceSid !== curSid) {
        from = 'OTHERS';
      }
      setActiveSubMenu(curDocument.id);
      setActiveMenu(curDocument.type + from);
      setShowSubMenu(false);
      history.push(`/index_library?documentId=${item.id}&documentType=${curDocument.type}`);
    }
  };

  const fetchHYD = async (params?: Record<string, string>) => {
    const apiParams: { name?: string; sourceSid: string; source: string } = {
      sourceSid: curSid,
      source: 'DOCTOR',
      ...params,
    };
    const res: { list: TIndexItem[] } = await api.indexLibrary.fetchIndexDocument(apiParams);
    console.log('fetchHYD', res);
    if (res.list?.length > 0) {
      setHYD([...res.list]);
    } else {
      setHYD([]);
    }
    return [...res.list];
  };

  const fetchJcdAndOther = async (datum?: Record<string, string>) => {
    console.log('fetchJcdAndOther', datum);
    const params: { source: string; jcdName?: string } = {
      ...datum,
      jcdName: datum?.name,
      source: 'DOCTOR',
    };

    const res = await api.indexLibrary.fetchImageTemplate(params);
    if (res.list.length > 0) {
      const allTemplate: TIndexItem[] = res.list.map((tem: TTemplate) => tem.meta);
      const jcds: TIndexItem[] = allTemplate.filter((tem) => tem.title === 'JCD');
      const others: TIndexItem[] = allTemplate.filter((tem) => tem.title === 'OTHER');
      setJCD([...jcds]);
      setOther([...others]);
      return { jcds, others };
    } else {
      setJCD([]);
      setOther([]);
      return { jcds: [], others: [] };
    }
  };

  const fetchImageType = async (params: Record<string, string>) => {
    const hyds = await fetchHYD(params);
    const { jcds, others } = await fetchJcdAndOther(params);
    // await fetchJcdAndOther(params);
    // if (!route.query.documentId && !route.query.documentType) {
    // console.log('fetchImageType', hyds, res);
    console.log('location', location);
    const { query } = location;
    const firstDoc = hyds[0] || jcds[0] || others[0];
    if (!(query.documentId && query.documentType)) {
      handleClickMenu(firstDoc);
    }
    // }
  };

  useEffect(() => {
    fetchImageType({});
  }, []);

  const handleSearch = (value: string) => {
    fetchImageType({ name: value });
    setShowSubMenu(true);
  };
  const handleChangeMenu = (typeItem: string, src: string) => {
    console.log(typeItem, src);
    setKeyword('');
    setActiveMenu(typeItem + src);
    setShowSubMenu(true);
    let tmp: TIndexItem[] = [];
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
    // console.log('handledList', handledList);
    // console.log('source', source);
    // console.log('tmp', tmp);
    setMenu([...tmp]);
    setSource(source);
    // fetchImageType({});
  };

  const handleDeleteDocument = async (ev: MouseEvent, item: TIndexItem) => {
    ev.stopPropagation();
    const type = item.type || item.title;
    try {
      if (type === 'HYD') {
        await api.indexLibrary.deleteIndexDocument(item.id);
      } else {
        await api.indexLibrary.deleteImageTemplate(item.id);
      }
      message.success('删除成功');
      fetchImageType({});
    } catch (e) {
      console.log(e);
    }
  };


  const documentTypeText: Record<string, string> = { HYD: '化验单', JCD: '检查单', OTHER: '其他医学单据' };
  const documentTypeSource: Record<string, string> = {
    SYSTEM: '系统',
    ONESELF: '自己',
    OTHERS: '他人',
  };
  return (
    <div className={styles.menu} onMouseLeave={() => setShowSubMenu(false)}>
      <Search
        placeholder="请输入名称"
        className={styles.search_wrap}
        // allowClear
        onSearch={handleSearch}
        prefix={<SearchOutlined />}
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
      />
      {Object.keys(documentTypeText).map((typeItem) => (
        <div key={typeItem}>
          <div className={styles.title}>
            <span>{documentTypeText[typeItem]}</span>
            <AddEditDocument mode="add" type={typeItem} onSuccess={fetchImageType}>
              <PlusOutlined />
            </AddEditDocument>
          </div>
          <div className={styles.type_list}>
            {Object.keys(documentTypeSource).map((src) => (
              <div
                className={`${styles.type_item} ${
                  typeItem + src === activeMenu ? styles.active : ''
                }`}
                data-type={typeItem}
                data-source={src}
                key={typeItem + src}
                onMouseEnter={() => handleChangeMenu(typeItem, src)}
              >
                <span>{documentTypeSource[src]}添加</span>
                <RightOutlined />
              </div>
            ))}
          </div>
        </div>
      ))}
      {/* showSubMenu */}
      <div className={`${styles.index_list} ${showSubMenu ? 'visible' : 'invisible'}`}>
        <List
          size="default"
          dataSource={menu}
          className="cursor-pointer"
          renderItem={(item: TIndexItem) => (
            <List.Item className={activeSubMenu === item.id ? 'font-bold' : ''}>
              <Space>
                <span onClick={() => handleClickMenu(item)}>{item.name || item.jcdName}</span>
                {source === 'ONESELF' && (
                  <>
                    <AddEditDocument
                      mode="edit"
                      record={item}
                      type={item.type || item.title}
                      onSuccess={fetchImageType}
                    >
                      <EditOutlined title="编辑" />
                    </AddEditDocument>
                    <Popconfirm
                      title="确认删除吗?"
                      onConfirm={(e) => handleDeleteDocument(e, item)}
                      okText="确认"
                      cancelText="取消"
                    >
                      <DeleteOutlined title="删除" />
                    </Popconfirm>
                  </>
                )}
              </Space>
            </List.Item>
          )}
        />
      </div>
    </div>
  );
};

export default SideMenu;
