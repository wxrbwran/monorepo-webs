import React, { useState, useEffect } from 'react';
import { Link, useSelector } from 'umi';
import iconArchitecture from '@/assets/img/icon_architecture.svg';
import iconMember from '@/assets/img/icon_people.svg';
import iconTree from '@/assets/img/icon_tree.svg';
import './index.scss';
import { IState } from 'typings/global';

interface IProps {
  location: {
    pathname: string;
  };
}
interface IRouterItem {
  name: string;
  pathName: string;
  imgSrc: string;
}
function SideMenu(props: IProps) {
  // const croLabel = window.$storage.getItem('croLabel');
  const croLabel = useSelector((state: IState) => state.project.projDetail.label);
  const pathname = props.location.pathname.split('/').pop();
  const [activeMenu, setActiveMenu] = useState(pathname);
  const [routerList, setRouterList] = useState<IRouterItem[]>([]);
  const routerItem = (name: string, pathName: string, imgSrc: string) => {
    return {name, pathName, imgSrc};
  }
  const getRouterList = () => {
    let list = [routerItem('成员 (邀请研究者加入)','member', iconMember)];
    if (croLabel === 'multi_project') {
      list = [
        ...list,
        routerItem('架构 (分配角色)','architecture', iconArchitecture),
        routerItem('组织架构图','tree', iconTree),
      ]
    }
    return list;
  }
  useEffect(() => {
    setRouterList(getRouterList());
  }, [croLabel])
  useEffect(() => {
    const currentPathname = props.location.pathname.split('/').pop();
    if (currentPathname !== activeMenu) {
      setActiveMenu(currentPathname);
    }
  }, [props]);

  return (
    <div className="side">
      {routerList.map((item) => {
        return (
          <div
            className={['menu', activeMenu === item.pathName ? 'active' : ''].join(' ')}
            key={item.name}
          >
            <img src={item.imgSrc} alt="" />
            <Link to={`/researcher/${item.pathName}`}>{item.name}</Link>
          </div>
        );
      })}
    </div>
  );
}
export default SideMenu;
