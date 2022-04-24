import React, { FC, useEffect, useState } from 'react';
import { Button, Collapse, Dropdown, Menu } from 'antd';
import { CaretRightOutlined } from '@ant-design/icons';
import servecePeople from '@/assets/img/icon/service_people.png';
import deleteIcon from '@/assets/img/icon/delete.png';
import renameIcon from '@/assets/img/icon/rename.png';
// import AddEditRole from '../AddEditRole';
import styles from './index.scss';
import { useHistory, useSelector } from 'umi';

const { Panel } = Collapse;
const SideRoles: FC = () => {
  const { roleList } = useSelector((state: IState) => state.personnel);
  const history = useHistory();
  console.log('useParams', history);
  // const menu = (
  //   <Menu>
  //     <Menu.Item><img src={renameIcon} className="w-12 h-12 mr-3" />重命名</Menu.Item>
  //     <Menu.Item><img src={deleteIcon} className="w-12 h-12 mr-3" />删除</Menu.Item>
  //   </Menu>
  // );
  return (
    <div className={styles.roles}>
      {/* <AddEditRole mode="add" refresh={() => {}}>
        <Button className='ml-75' type="dashed">+新增角色</Button>
      </AddEditRole> */}
      <Collapse
        defaultActiveKey={['1']}
        ghost
        expandIcon={({ isActive }) => <CaretRightOutlined style={{ color: '#AAAAAA' }} rotate={isActive ? 90 : 0} />}
      >
        <Panel
          header={
            <div className='flex items-center'><img src={servecePeople} className="w-14 h-14" alt="" /><span className='ml-3'>服务人员</span></div>
          } key="1">
          <div>
            {
              roleList?.map(item => (
                <div
                  key={item.id}
                  className='pl-30 pr-20 py-9 cursor-pointer text-gray-600 ml-3 flex justify-between'
                  style={{ background: history.location?.query?.roleId === item.id ? '#EEF2F4' : '#Ffffff' }}
                  onClick={() => history.push(`/personnel/role-list?roleId=${item.id}`)}
                >
                  <span>{item.name}</span>
                  {/* <Dropdown overlay={menu} placement="bottomLeft" arrow={true}>
                    <span>...</span>
                  </Dropdown> */}
                </div>
              ))
            }
          </div>
        </Panel>
      </Collapse>
    </div>
  );
};

export default SideRoles;

