import React, { useState, useEffect } from 'react';
import {  Form, Modal, message } from 'antd';
import number from '@/assets/img/number.svg';
import InviteMember from '../compontents/invite_member';
import { Search, InviteStatus } from 'xzl-web-shared/src/components/Selects';
import * as api from '@/services/api';
import XzlTable from 'xzl-web-shared/src/components/XzlTable';
import { memberListColumns, groupName } from '@/utils/columns';
import MemberDetail from '../compontents/member_detail';
import { Role } from 'xzl-web-shared/src/utils/role';
import { useSelector, useDispatch } from 'umi';
import styles from './index.scss';
import { CommonData, IState } from 'typings/global';
import { ExclamationCircleOutlined } from '@ant-design/icons';

const { confirm } = Modal;
function Member() {
  const croRoleType = window.$storage.getItem('croRoleType');
  const { projectNsId, label } = useSelector((state: IState) => state.project.projDetail);
  const [memberCount, setMemberCount] = useState(0);
  const [depOptions, setOptions] = useState({
    projectNsId,
  });
  const projType = window.$storage.getItem('croLabel');
  const projectSid = window.$storage.getItem('projectSid')!;
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  useEffect(() => {
    // 查询成员医生统计信息
    api.research.fetchMemberStatistics({
      projectNsId,
    }).then(res => {
      setMemberCount(res.count);
    });
  }, []);
  console.log(2);
  const handleSelectChange = (changedValues: string[], allValues: CommonData) => {
    console.log(changedValues);
    const params: CommonData = {};
    Object.keys(allValues).forEach((item: string) => {
      if (!!allValues[item]) {
        params[item] = allValues[item];
      }
    });
    setOptions({
      projectNsId,
      ...params,
    });
  };
  const refreshList = () => {
    setOptions({
      ...depOptions,
    });
  };
  const detailColumn = {
    title: '',
    dataIndex: 'subjectId',
    render: (text: any, record: any) => {
      console.log(text);
      return <MemberDetail record={record}>查看详情</MemberDetail>;
    },
  };
  const handleUpgrade = () => {
    confirm({
      title: '升级成为多中心试验后不能再改为单中心试验',
      icon: <ExclamationCircleOutlined />,
      content: <div className={styles.confirm_content}>
                <span>您的组员会改为暂未分配状态，</span>您还要继续吗？
              </div>,
      cancelText: '取消',
      okText: '继续',
      onOk() {
        return new Promise((resolve, reject) => {
          api.research.patchProjectUpgrade(projectSid).then(() => {
            resolve(true);
            message.success('升级成功');
            refreshList();
            dispatch({
              type: 'project/fetchProjectDetail',
              payload: projectSid,
            });
          }).catch(() => {
            reject(false);
          });
          // setTimeout(Math.random() > 0.5 ? resolve : reject, 1000);
        }).catch(() => console.log('Oops errors!'));
      },
      onCancel() {},
    });
  };
  return (
    <div className={styles.member}>
      <div className={styles.title}>
        <h3>成员</h3><img src={number} alt=""/> <span>{memberCount}</span>
      </div>
      <Form form={form} onValuesChange={handleSelectChange} style={{ position: 'relative' }}>
        <Search form={form} searchKey="var" placeholder="搜索姓名或手机号"  />
        <div className={styles.lists_head}>
          <InviteStatus />
          {
            [
              Role.MAIN_PI.id,
              Role.PROJECT_LEADER.id,
            ].includes(croRoleType) && (
             <div>
               {
                 label === 'single_project' && <div className={styles.upgrade_btn} onClick={handleUpgrade}>升级成多中心试验</div>
               }
                <InviteMember
                  refreshList={refreshList}
                >
                  邀请研究者参与管理
                </InviteMember>
             </div>
            )
          }
        </div>
      </Form>
      <XzlTable
        // 单中心没有“分组”表头字段
        columns={projType === 'multi_project' ? [...memberListColumns, groupName, detailColumn] : [...memberListColumns, detailColumn]}
        dataKey="infos"
        category="memberList"
        request={api.research.fetchMemberDoctor}
        depOptions={depOptions}
        noPagination={true}
        tableOptions={{
          rowSelection: false,
          pagination: false,
        }}
      />
    </div>
  );
}

export default Member;
