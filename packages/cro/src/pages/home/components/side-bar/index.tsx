import React, {useState} from 'react';
import { Link } from 'umi';
import projectIcon from '@/assets/img/icon_project.svg';
import { HomeOutlined, PieChartOutlined } from '@ant-design/icons';
import styles from './index.scss';

interface IProps {
  projectList: {
    projectSid: string;
    name: string;
  }[],
  location: {
    pathname: string;
  };
}
const routerList = [
  {
    name: '我的桌面',
    pathName: '/home',
    icon: <HomeOutlined />,
  },
  {
    name: '数据统计',
    pathName: '/home/count',
    icon: <PieChartOutlined />,
  },
]
function sideBar({ projectList, location } : IProps) {
  const [activeMenu, setActiveMenu] = useState(location.pathname);
  return (
    <div className={styles.sidebar}>
      {
        routerList.map((item) => {
          return(
            <div
              className={activeMenu === item.pathName ? `${styles.desktop} ${styles.active}` : styles.desktop}>
              {item.icon}
              <Link to={`${item.pathName}`}>{item.name}</Link>
            </div>
          )
        })
      }
      <div className={styles.project_title}>
        <img src={projectIcon} alt="" />
        <span>近期项目</span>
      </div>
      <div className={styles.project_list}>
        {
          projectList.slice(0, 5).map(item => {
            return (
              <div className={styles.project_item} key={item.projectSid}>
                <Link to={`/proj_detail?projectSid=${item.projectSid}&projectName=${item.name}`}>{item.name}</Link>
              </div>
            )
          })
        }
      </div>
    </div>
  );
}

export default sideBar;
