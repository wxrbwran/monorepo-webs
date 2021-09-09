import React, { useState } from 'react';
import { Drawer, Table } from 'antd';
import AssignMember from '../assign_member';
import IconTip from '@/assets/img/icon_tip.png';
import { fetchRolePropValue } from '@/utils/role';
import styles from './index.scss';
import { IState, ISubject } from 'typings/global';
import { useSelector } from 'umi';
import { handleInviteMemberList } from '@/components/XzlTable/util';
import MemberDetail from '../member_detail';
import * as api from '@/services/api';

type Iprops = {
  children: React.ReactElement;
  refresh: () => void;
  data: {
    name: string;
    role: string;
    groupName: string;
    dataSource: IRecord[];
    subjectDetail: ISubject;
    nsId: string;
  }
  style?: object;
}
interface IRecord {
  groupName: string;
  name: string;
  nsId: string;
  patientCount: number;
  role: string;
  status: number;
  subjectId: string;
  wcId: string
  subjectDetail: ISubject;
}
function ViewDetails({ children, data, style, refresh }: Iprops) {
  const { subjectDetail, role, groupName, nsId } = data;
  const { projectNsId } = useSelector((state: IState) => state.project.projDetail);
  const [dataSource, setData] = useState<ISubject[]>([]);
  const [visible, setVisible] = useState(false);
  const handleToggleDetail = () => {
    setVisible(!visible);
  };
  const fetchData = () => {
    const params = {
      groupId: nsId,
      projectNsId,
      role,
    }
    api.research.fetchGroupDetail(params).then((res: any) => {
      const data = [
        { ...res },
        ...res.subWC
      ]
      setData(handleInviteMemberList(data));
    })
  }
  const handleShowModel = (e) => {
    setVisible(true);
    fetchData();
  }
  const refreshData = () => {
    refresh(); // 刷新架构树的数据
    fetchData();
  }
  const columns: any = [
    {
      title: '姓名',
      dataIndex: 'name',
      key: 'name',
      render: (text: string, record: IRecord) => (
      <div>
        { text ? text : (
          window.$storage.getItem('isLeader') ? <AssignMember refresh={refreshData} data={record}>暂未指定</AssignMember> : '暂未指定'
        )}
      </div>
      )
    },
    {
      title: '组名',
      dataIndex: 'groupName',
      key: 'groupName',
      align: 'center',
      render: (text: string) => (
        <div className="text-overflow" style={{maxWidth: 350}} title={text}>{text}</div>
      )
    },
    {
      title: '角色',
      dataIndex: 'role',
      key: 'role',
    },
    {
      title: '职位',
      dataIndex: 'title',
      key: 'title',
      render: (text: string) =>  text || '--'
    },
    {
      title: '单位',
      dataIndex: 'firstProfessionCompany',
      key: 'firstProfessionCompany',
      render: (text: string) =>  text || '--'
    },
    {
      title: '科室',
      dataIndex: 'firstPracticeDepartment',
      key: 'firstPracticeDepartment',
      render: (text: string) =>  text || '--'
    },
    {
      title: '操作',
      dataIndex: 'nsId',
      key: 'nsId',
      render: (text: string, record: IRecord) => (
        <div>
          {
            record.name ?
              <MemberDetail record={record}>查看详情</MemberDetail> : (
                window.$storage.getItem('isLeader') && <AssignMember refresh={refreshData} data={record}>{`指定${record.role}`}</AssignMember>
              )
          }
        </div>
      )
    }

  ];
  return(
    <>
      <div
        className={styles.view_details}
        onClick={handleShowModel}
        style={style}
      >
        {children}
      </div>
      <Drawer
        title={groupName}
        placement="right"
        onClose={handleToggleDetail}
        visible={visible}
        mask={false}
        getContainer={false}
        width={970}
      >
        <div className={styles.content}>
          {
            !subjectDetail && (
              <div className={styles.top}>
                <div className={styles.left}>
                  <img src={IconTip} alt="提醒"/>
                  <span>{groupName}暂未指定{fetchRolePropValue(role, 'desc')}</span>
                </div>
              </div>
            )
          }
          <Table
            dataSource={dataSource}
            columns={columns}
            pagination={false}
            rowKey="nsId"
          />
        </div>
      </Drawer>
    </>
  )
}

export default ViewDetails;
