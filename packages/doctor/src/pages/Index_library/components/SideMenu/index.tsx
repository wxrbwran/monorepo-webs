import React, { FC, useState, useEffect } from 'react';
import { SearchOutlined, RightOutlined, EditOutlined } from '@ant-design/icons';
import { Input, message, Tooltip } from 'antd';
import { history } from 'umi';
import * as api from '@/services/api';
import AddType from '../AddType';
import styles from './index.scss';

interface IIndexItem {
  id: string;
  type: string;
  name: string;
}

interface IImgType {
  JCD?: IIndexItem[];
  HYD?: IIndexItem[];
}

const { Search } = Input;
const SideMenu: FC = () => {
  const [activeMenu, setactiveMenu] = useState(''); // 当前选中项
  const [imgType, setImgType] = useState<IImgType>({});
  const [keyword, setKeyword] = useState('');
  const [showSubMenu, setShowSubMenu] = useState(false);
  const fetchImageType = () => {
    const params: { name?: string;sourceSid: string;source: string } = {
      sourceSid: window.$storage.getItem('sid'),
      source: 'DOCTOR',
    };
    if (keyword) params.name = keyword;
    api.indexLibrary.fetchIndexDocument(params).then((res: { list : IIndexItem[] }) => {
      if (res.list.length > 0) {
        const JCD: IIndexItem[] = [];
        const HYD: IIndexItem[] = [];
        res.list.forEach((item) => {
          if (item.type === 'JCD') {
            JCD.push(item);
          } else {
            HYD.push(item);
          }
        });
        // 取第一个选中项
        const firstId = HYD?.[0]?.id || JCD?.[0]?.id;
        const newAddtype = HYD.length > 0 ? 'HYD' : 'JCD';
        setactiveMenu(firstId);
        history.push(`/index_library?documentId=${firstId}&documentType=${newAddtype}`);
        setImgType({ HYD, JCD });
      } else {
        setImgType({ HYD: [], JCD: [] });
        message.success('查询为空');
      }
    });
  };

  useEffect(() => {
    fetchImageType();
  }, []);
  const handleSearch = (value, event) => {
    console.log('value, event', value, event);
    fetchImageType();
    setShowSubMenu(true);
  };
  const handleChangeMenu = (typeItem: string, source: string) => {
    setactiveMenu(typeItem + source);
    setShowSubMenu(true);
  };

  const handleGoDetail = (indexData: { id: string, type: string }) => {
    history.push(`/index_library?documentId=${indexData.id}&documentType=${indexData.type}`);
    setShowSubMenu(false);
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
        onChange={(e) => setKeyword(e.target.value)}
      />
      {
        Object.keys(imgTypeText).map((typeItem) => (
          <div key={typeItem}>
            <div className={styles.title}>
              <span>{imgTypeText[typeItem]}</span>
              <AddType imageType={typeItem} onSuccess={fetchImageType} />
            </div>
            <div className={styles.type_list}>
              {
                Object.keys(imgTypeSource).map((source) => (
                  <div
                    className={`${styles.type_item} ${typeItem + source === activeMenu ? styles.active : ''}`}
                    key={typeItem + source}
                    onClick={() => handleChangeMenu(typeItem, source)}
                  >
                    <span>{imgTypeSource[source]}添加</span>
                    <RightOutlined />
                  </div>
                ))
              }
            </div>
          </div>
        ))
      }
      {
        showSubMenu && (
          <div className={styles.index_list}>
            {
              imgType?.HYD?.map((item: IIndexItem) => (
                <div className={styles.index_item} key={item.id}>
                  <EditOutlined />
                  <Tooltip placement="right" title={<span dangerouslySetInnerHTML={{ __html: item.name }} />}>
                    <div
                      className={styles.index_name}
                      onClick={() => handleGoDetail(item)}
                      dangerouslySetInnerHTML={{ __html: item.name }}
                    />
                  </Tooltip>
                </div>
              ))
            }
            {/* <div className={styles.no_data}>暂无数据</div> */}
          </div>
        )
      }

    </div>
  );
};

export default SideMenu;
