import React, { FC, useState, useEffect, MouseEvent } from 'react';
import { SearchOutlined, RightOutlined, PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { Input, List, Space, Popconfirm, message } from 'antd';
import { history, useDispatch, useLocation, useSelector } from 'umi';
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
  const dispatch = useDispatch();
  const location: ILocation = useLocation<undefined>();
  const { query } = location;
  const [activeMenu, setActiveMenu] = useState<string>(''); // 当前选中项
  const [HYD, setHYD] = useState<TIndexItem[]>([]);
  const [JCD, setJCD] = useState<TIndexItem[]>([]);
  const [OTHER, setOther] = useState<TIndexItem[]>([]);
  const [activeSubMenu, setActiveSubMenu] = useState<string>('');
  const [keyword, setKeyword] = useState(''); // 只用于搜索框展示文案用，点击菜单时会清空这里
  const [menu, setMenu] = useState<TIndexItem[]>([]);
  const [source, setSource] = useState<string>(query?.src || 'SYSTEM');
  const [showSubMenu, setShowSubMenu] = useState(false);
  const curDocument = useSelector((state: IState) => state.document.curDocument);

  // const [imgType, setImgType] = useState<IImgType>({});

  const curSid = window.$storage.getItem('sid');
  const handleClickMenu = async (item: TIndexItem, src: string) => {
    if (item) {
      // console.log('handleClickMenu', item, src);
      const document = { ...item };
      if (item.title) {
        document.name = item.jcdName;
        document.type = item.title;
      }
      dispatch({
        type: 'document/setCurDocument',
        payload: document,
      });

      setActiveSubMenu(document.id);
      setActiveMenu(document.type + src);
      setShowSubMenu(false);
      history.push({
        pathname: '/index_library',
        query: {
          documentId: item.id,
          documentType: document.type,
          src,
        },
      });
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
    const {
      query: { documentId, documentType, src },
    } = location;
    const firstDoc = hyds[0] || jcds[0] || others[0];
    firstDoc.sourceSid = firstDoc.sourceSid || firstDoc.sid;
    if (!(documentId && documentType && src)) {
      let to = 'SYSTEM';
      if (firstDoc.source === 'DOCTOR' && firstDoc.sourceSid === curSid) {
        to = 'ONESELF';
      } else if (firstDoc.source === 'DOCTOR' && firstDoc.sourceSid !== curSid) {
        to = 'OTHERS';
      }
      console.log('fetchImageType', firstDoc, to);
      handleClickMenu(firstDoc, to);
    } else {
      handleClickMenu(curDocument, src);
    }
  };

  useEffect(() => {
    fetchImageType({});
  }, []);

  const handleSearch = (value: string) => {
    fetchImageType({ name: value });
    setShowSubMenu(true);
  };
  const handleMouseOverMenu = (docType: string, src: string) => {
    console.log(docType, src);
    let tmp: TIndexItem[] = [];
    let handledList = HYD;
    if (docType === 'JCD') {
      handledList = JCD;
      handledList.forEach((h) => h.sourceSid === h.sid);
    } else if (docType === 'OTHER') {
      handledList = OTHER;
      handledList.forEach(h => h.sourceSid === h.sid);
    }
    switch (src) {
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
    console.log('tmp', tmp);
    setMenu([...tmp]);
    setSource(src);
    setShowSubMenu(true);
  };

  const handleDeleteDocument = async (item: TIndexItem, ev?: MouseEvent) => {
    ev?.stopPropagation();
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
    <div
      className={styles.menu}
      onMouseLeave={() => {
        // handleClickMenu(curDocument, source);
        setShowSubMenu(false);
      }}
    >
      <Search
        placeholder="请输入名称"
        className={styles.search_wrap}
        // allowClear
        onSearch={handleSearch}
        prefix={<SearchOutlined />}
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
      />
      {Object.keys(documentTypeText).map((docType) => (
        <div key={docType}>
          <div className={styles.title}>
            <span>{documentTypeText[docType]}</span>
            <AddEditDocument mode="add" type={docType} onSuccess={fetchImageType}>
              <PlusOutlined />
            </AddEditDocument>
          </div>
          <div className={styles.type_list}>
            {Object.keys(documentTypeSource).map((src) => (
              <div
                className={`${styles.type_item} ${
                  docType + src === activeMenu ? styles.active : ''
                }`}
                data-type={docType}
                data-source={src}
                key={docType + src}
                onMouseEnter={() => handleMouseOverMenu(docType, src)}
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
                <span onClick={() => handleClickMenu(item, source)}>
                  {item.name || item.jcdName}
                </span>
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
                      onConfirm={(e?: React.MouseEvent<HTMLElement>) => handleDeleteDocument(item, e)}
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
