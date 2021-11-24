import React, { useState, useEffect } from 'react';
import { Button, Form, message } from 'antd';
import defaultAvatar from '@/assets/img/default_doctor.png';
// import { Organization, Department } from '@/components/Selects';
import { Search } from 'xzl-web-shared/src/components/Selects';
import * as api from '@/services/api';
import XzlTable from 'xzl-web-shared/src/components/XzlTable';
import { name, practiceAreas, title, orgName, inviteStatus } from '@/utils/columns';
import styles from './index.scss';
import { Store } from 'antd/lib/form/interface';
import { useSelector } from 'umi';
import { IState } from 'typings/global';

interface Iprops {
  onClose: () => void;
  refreshList: () => void;
}

function InviteMemberList(props: Iprops) {
  const { projectNsId, roleType } = useSelector((state: IState) => state.project.projDetail);
  const initOption = { conditions: [], targetNSId: projectNsId };
  const user = useSelector((state: IState) => state?.user?.user);
  const croLabel = window.$storage.getItem('croLabel');
  const [selectIds, setSelectIds] = useState<string[]>([]);
  const [depOptions, setOptions] = useState(initOption);
  const [singleOrg, setSingleOrg] = useState('');
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const { setFieldsValue } = form;

  useEffect(() => {
    if (croLabel === 'single_project') {
      api.research.fetchProjectOrg(projectNsId).then(res => {
        setSingleOrg(res.infos[0]?.name ?? '');
        const params: Store = { ...initOption };
        params.conditions.push({
          var: "practice_areas->>'name'",
          value: res.infos[0]?.name ?? '',
          operator: 'like',
        });
        setOptions({ ...params });
      });
    }
  }, []);
  const columns: any = [
    {
      title: selectIds.length > 0 ? `已选${selectIds.length}人` : '头像',
      dataIndex: 'avatar',
      render: (text: string) => <img style={{ borderRadius: '50%', width: 40, height: 40 }} src={text || defaultAvatar} />,
    },
    name,
    practiceAreas,
    title,
    orgName,
    inviteStatus,
  ];

  const handleSelectChange = (_changedValues: Store, allValues: Store) => {
    const params: Store = { ...initOption };
    // setFieldsValue
    Object.keys(allValues).forEach((item: string) => {
      if (!!allValues[item]) {
        if (item == 'single_project') {

          params.conditions.push({
            var: "sj.details->>'name',sj.details->>'tel'",
            value: allValues[item],
            operator: 'like',
          }, {
            var: "practice_areas->>'name'",
            value: singleOrg,
            operator: 'like',
          });
        } else {
          params.conditions.push({
            var: "practice_areas->>'name',sj.details->>'name',sj.details->>'tel',o_subject.name,practice_areas->>'sub'",
            value: allValues[item],
            operator: 'like',
          });
        }
      }
    });
    if (allValues.orgId === '') {
      setFieldsValue({ 'depId': '' });
      delete params.orgId;
      delete params.depId;
    }

    if (croLabel === 'single_project' && params.conditions.length == 0) {
      params.conditions.push({
        var: "practice_areas->>'name'",
        value: singleOrg,
        operator: 'like',
      });
    }
    console.log('================= handleSelectChange handleSelectChange', JSON.stringify(params));
    setOptions({ ...params });
  };
  const handleSubmit = () => {
    setLoading(true);
    const params = {
      inviterName: user?.roles?.[0].subject.name, // 邀请医生的名称
      inviterSid: user?.roles?.[0].subject.id, // 邀请者的sid
      inviterWcId: user.wcId, // 邀请者wcid
      memberSIds: selectIds, // 被邀请者的sid数组
      projectName: window.$storage.getItem('projectName'),
      projectNsId,
      roleType,
      projectSid: window.$storage.getItem('projectSid'),
      // roleType: window.$storage.getItem('croRoleType'),
    };
    console.log('params', params);
    api.research.postInviteDoctor(params).then(() => {
      message.success('邀请成功');
      setLoading(false);
      props.refreshList();
      props.onClose();
    });
  };
  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
      const ids: string[] = [];
      selectedRows.forEach((item: { sid: string, name: string }) => {
        ids.push(item.sid);
      });
      setSelectIds(ids);
    },
  };
  return (
    <>
      <Form form={form} onValuesChange={handleSelectChange}>
        <div className={styles.lists_head}>
          {
            croLabel === 'single_project'
              ? (
                <>
                  {`已为您显示【${singleOrg}】全部医生`}
                  <Search form={form} searchKey="single_project" placeholder="搜索姓名或手机号" />
                </>
              ) : (
                <Search
                  form={form}
                  searchKey="mulit_project"
                  placeholder="搜索研究者姓名、手机号、第一执业医院、所在线上医院和项目机构、科室"
                  width={500}
                />
              )
          }
        </div>
      </Form>
      <XzlTable
        columns={columns}
        dataKey="teams"
        category="inviteMemberList"
        request={croLabel === 'single_project' ? (singleOrg ? api.research.fetchProjectDoctor : null) : api.research.fetchProjectDoctor}
        depOptions={depOptions}
        tableOptions={{
          rowSelection: {
            ...rowSelection,
            // pagination: false,
          },
        }}
      // noPagination={true}


      />
      <div className={styles.btn} style={{ marginTop: 0 }}>
        <Button onClick={props.onClose} > 取消 </Button>
        <Button type="primary" disabled={selectIds.length === 0} onClick={handleSubmit} loading={loading} > 确认邀请 </Button>
      </div>
    </>
  );
}

export default InviteMemberList;
