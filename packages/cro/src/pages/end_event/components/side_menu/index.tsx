import React, { useState, useEffect } from 'react';
import { Link } from 'umi';
import { PlusOutlined } from '@ant-design/icons';
import { Collapse } from 'antd';
import styles from './index.scss';

const { Panel } = Collapse;
interface IProps {
  location: {
    pathname: string;
    query: {
      groupId?: string;
      id?: string;
    };
  };
  tableList: any[]
}

function SideMenu(props: IProps) {
  const { tableList, location } = props;
  const pathname = props.location.pathname.split('/').pop();
  const [activeMenu, setActiveMenu] = useState(pathname);
console.log('tableList', tableList)
  useEffect(() => {
    const currentPathname = props.location.pathname.split('/').pop();
    console.log('currentPathname', currentPathname)
    if (currentPathname !== activeMenu) {
      setActiveMenu(currentPathname);
    }
  }, [location])


  const routerList = [
    {
      name: '终点事件(定义)',
      pathName: 'define',
    },
    {
      name: '终点事件(统计)',
      pathName: 'count',
    },
  ]
  return (
    <div className={styles.end_event_side}>
      <Collapse defaultActiveKey={['1', '2']} expandIconPosition="right" bordered={false} ghost>
        <Panel header="终点事件" key="1">
          {
            routerList.map((item) => {
              return (
                <div className={[styles.menu, activeMenu === item.pathName ? styles.active : ''].join(' ')} key={item.name}>
                  <Link to={`/end_event/${item.pathName}`}>{item.name}</Link>
                </div>
              )
            })
          }
        </Panel>
        <Panel header="CRF量表" key="2">
          {
            tableList.map(item => {
              const isActive = ['reply','detail', 'send_record'].includes(activeMenu as string) && location.query?.id === item.id;
              return (
                <div
                  className={`${ styles.menu} ${isActive ? styles.active : ''}`}
                >
                  <Link to={`/end_event/detail?id=${item.id}`}>{item.name}</Link>
                </div>
              )
            })
          }
          {
            tableList.length === 0 && <span className={styles.notable}>暂无CRF量表</span>
          }
        </Panel>
      </Collapse>
      {
        window.$storage.getItem('isLeader') && window.$storage.getItem('projectStatus') != 1001 && (
          <div className="create">
            <Link to="/end_event/create">
              <PlusOutlined style={{ fontSize: 14 }} /> 创建CRF量表
            </Link>
          </div>
        )
      }
    </div>
  )
}
export default SideMenu;
