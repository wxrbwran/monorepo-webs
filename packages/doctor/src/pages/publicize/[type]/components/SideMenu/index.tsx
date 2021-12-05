import React, { useState, useEffect } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Link, useParams, useSelector, history } from 'umi';
import * as api from '@/services/api';
import { sfTypeUrl } from '../../../utils';
import './index.scss';
import { IState } from 'packages/doctor/typings/model';

interface IProps {
  location: {
    pathname: string;
    query: {
      id: string;
      name?: string;
    }
  };
}
interface INameItem {
  title: string;
  id: string;
}
function SideMenu({ location }: IProps) {
  const [currentId, setCurrentId] = useState('');
  const currentOrgInfo = useSelector((state: IState) => state.user.currentOrgInfo);
  const [fileNameList, setfileNameList] = useState<INameItem[]>([]);
  const { type } = useParams<{ type: string }>();
  const soruceType = {
    education: { text: '宣教' },
    suifang: { text: '随访' },
    crf_scale: { text: 'CRF量表' },
  };
  const fetchData = () => {
    const params = {
      operatorSid: window.$storage.getItem('sid'),
      operatorWcId: window.$storage.getItem('wcId'),
      ownershipSid: currentOrgInfo.sid, // 机构的sid
      type: sfTypeUrl?.[type].type, //0：随访表 1：CRF量表 2:宣教
    };
    api.education.getPublicizeGroup(params).then((res) => {
      console.log(34343, res);
      setfileNameList(res.list);
      if (res.list?.length > 0) {
        if (location.query.name) {
          const sameName = res.list.filter((item) => item.title == location.query.name);
          if (sameName.length > 0) {
            setCurrentId(sameName[0].id);
            history.replace(`/publicize/${type}/detail?id=${sameName[0].id}`);
          } else {
            history.replace(`/publicize/${type}/detail?id=${location.query.id ? location.query.id : res.list[0].id}`);
          }
        } else {
          history.replace(`/publicize/${type}/detail?id=${location.query.id ? location.query.id : res.list[0].id}`);
        }
      }
    });
  };

  useEffect(() => {
    // 机构更新了直接刷新整个页面
    history.replace(`/publicize/${type}`);
  }, [currentOrgInfo]);


  useEffect(() => {

    console.log('=============== useEffect useEffect location', location);
    console.log('=============== useEffect useEffect currentOrgInfo', currentOrgInfo);
    const id = location.query.id;
    if (!id) {
      setCurrentId('');
      fetchData();
    } else if (id !== currentId) {
      setCurrentId(id);
    }
  }, [location]);

  return (
    <div className="follow-table-menu">
      <div className="tit">
        <span>全部{soruceType[type].text}</span>
      </div>
      <div className="table-list">
        {
          fileNameList.map((item) => {
            return (
              <div
                className={['item', item.id === currentId ? 'active' : ''].join(' ')}
                key={item.id}
              >
                <Link to={`/publicize/${type}/detail?id=${item.id}`}>{item.title}</Link>
              </div>
            );
          })
        }
      </div>
      <div className="create">
        <Link to={`/publicize/${type}/create`}>
          <PlusOutlined style={{ fontSize: 14 }} /> 创建新{soruceType[type].text}
        </Link>
      </div>
    </div>
  );
}
export default SideMenu;
