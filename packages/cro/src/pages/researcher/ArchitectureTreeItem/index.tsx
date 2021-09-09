import React, { FC } from 'react';
import ViewDetails from '../compontents/view_details';
import { fetchRolePropValue, Role } from '@/utils/role';
import AddGroup from '../compontents/add_group';
import AddResearcher from '../compontents/add_researcher';
import EditGroup from '../compontents/edit_group';
import styles from '../architecture/index.scss';
import { PlusOutlined, EditOutlined } from '@ant-design/icons';
import AssignMember from '../compontents/assign_member';
import { ITree } from 'typings/researcher';
import { Tooltip } from 'antd';

interface IProps {
  data: ITree;
  refresh: () => void;
}
const ArchitectureTreeItem: FC<IProps> = ({ data, refresh }) => {
  const doctorSid = localStorage.getItem('xzl-web-doctor_sid');
  const croRoleType = window.$storage.getItem('croRoleType');
  const groupName = data.role === Role.MAIN_PI.id ? window.$storage.getItem('projectName') : (data.groupName || '--');
  return (
    <div
      className={styles.item}
      style={{ background: data.subjectId === doctorSid ? "#EAF4FF" : '#fff'}}
    >
      {
        data.name ?
        <ViewDetails
          data={data}
          style={{'flex': '0 0 100px', 'marginRight': 38}}
          refresh={refresh}
        >
          <span className={styles.name_level1}>{data.name}</span>
        </ViewDetails>
        :
        <span className={`${styles.name_level1} ${styles.not_specified}`}>
          {
            window.$storage.getItem('isLeader') ?
            <AssignMember data={data}  refresh={refresh}>暂未指定</AssignMember>
            : <span style={{color: '#000'}}>暂未指定</span>
          }
        </span>
      }
      <ViewDetails
        data={data}
        refresh={refresh}
      >
      <>
        <span>
          {fetchRolePropValue(data.role, 'desc')}
        </span>
        <Tooltip
          title={groupName}
        >
          <span className={`${styles.flex3} text-overflow`}>
            {groupName}
          </span>
        </Tooltip>
        <span className={styles.flex3}>
          {data.subjectDetail?.firstProfessionCompany || '--'}
        </span>
        <span>
          {
           data.subjectDetail?.firstPracticeDepartment || '--'
          }
          </span>
      </>
      </ViewDetails>
        {
          croRoleType === Role.MAIN_PI.id && (
            <span className={styles.btn_wrap}>
              {
                [Role.MAIN_PI.id, Role.SUB_PI.id].includes(data.role) && (
                  <AddGroup
                    role={data.role}
                    nsId={data.nsId}
                    refresh={refresh}
                  ><PlusOutlined /></AddGroup>
                )
              }
              {
                Role.PI.id === data.role && (
                  <AddResearcher
                    role={data.role}
                    nsId={data.nsId}
                    refresh={refresh}
                  ><PlusOutlined /></AddResearcher>
                )
              }
              {
                data.role !== Role.MAIN_PI.id && (
                  <EditGroup data={data} refresh={refresh}><EditOutlined /></EditGroup>
                )
              }
            </span>
          )
        }
    </div>
  )
};
export default ArchitectureTreeItem;
