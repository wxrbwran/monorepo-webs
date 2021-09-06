import React, { FC, useState, useEffect } from 'react';
import { SearchOutlined } from '@ant-design/icons';
import { Input, message } from 'antd';
import { Link, history } from 'umi';
import * as api from '@/services/api';
import AddType from '../AddType';

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
  const [activeId, setactiveId] = useState(''); // 当前选中项
  const [imgType, setImgType] = useState<IImgType>({});
  const [keyword, setKeyword] = useState('');
  const fetchImageType = () => {
    const params: {name?: string;sourceSid: string;source: string} = {
      sourceSid: window.$storage.getItem('sid'),
      source: 'DOCTOR',
    };
    if (keyword) params.name = keyword;
    api.indexLibrary.fetchIndexDocument(params).then((res: {list : IIndexItem[]}) => {
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
        setactiveId(firstId);
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
  const handleSearch = () => {
    fetchImageType();
  };

  const type: CommonData = {
    HYD: '化验单',
    JCD: '检查单',
  };
  return (
    <div className="ui-index-library__menu">
      <Search
        placeholder="搜索项目"
        className="search-wrap"
        allowClear
        onSearch={handleSearch}
        prefix={<SearchOutlined />}
        onChange={(e) => setKeyword(e.target.value)}
      />
      {
        Object.keys(imgType).map((key) => (
          <div key={key}>
            <div className="type-title">
              <span>{type[key]}</span>
              <AddType imageType={key} onSuccess={fetchImageType} />
            </div>
            <div className="type-list">
              {
                imgType[key].map((item: IIndexItem) => (
                  <Link
                    to={`/index_library?documentId=${item.id}&documentType=${key}`}
                    onClick={() => setactiveId(item.id)}
                    key={item.id}
                  >
                    <div
                      className={`type-item ${item.id === activeId ? 'active' : ''}`}
                      key={item.id}
                    >
                      <span>{item.name}</span>
                    </div>
                  </Link>
                ))
              }
            </div>
          </div>
        ))
      }
    </div>
  );
};

export default SideMenu;
