import React, { useState, useEffect } from 'react';
import { Link } from 'umi';
import { PlusOutlined, FormOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import './index.scss';
import { CommonData, IState } from 'typings/global';
import { InputNumber, message } from 'antd';
import AddEditGroup from '../add_edit_group';
import { Role } from 'xzl-web-shared/dist/utils/role';
import * as api from '@/services/api';
import { hasPermissions } from '@/utils/utils';

interface IProps {
  location: {
    pathname: string;
    query: {
      groupId?: string;
    };
  };
}

function SideMenu(props: IProps) {
  const dispatch = useDispatch();
  const pathname = props.location.pathname.split('/').pop();
  const [activeMenu, setActiveMenu] = useState(pathname);
  const [activeIndex, setActiveIndex] = useState<number>(-1);//用于标识编辑状态还是非编辑状态
  const [editPatientNum, seteditPatientNum] = useState(false);
  const groupList = useSelector((state: IState) => state.project.objectiveGroup);
  const { projectNsId, status, detail, projectSid, roleType } = useSelector((state: IState) => state.project.projDetail);
  const teamMembers = useSelector((state: IState) => state.project.teamMembers);

  useEffect(() => {
    const currentPathname = props.location.pathname.split('/').pop();
    if (currentPathname !== activeMenu) {
      setActiveMenu(currentPathname);
    }
  }, [props]);

  const getGroupList = () => {
    //获取实验组
    dispatch({
      type: 'project/fetchGroupList',
      payload: projectNsId,
    });
  };
  //重置index
  const resetIndex = (index: number) => {
    if (activeIndex !== index) {
      setActiveIndex(-1);
    }
  };
  const handlePatientNum = (e: React.FocusEventHandler<HTMLInputElement>) => {
    console.log(e.target.value);
    const params: CommonData = {
      projectSid,
      detail: {
        effectiveCaseNum: e.target.value,
      },
    };
    api.detail.updateCroProject(params).then((_res: any) => {
      message.success('更改信息成功');
      dispatch({
        type: 'project/fetchProjectDetail',
        payload: projectSid,
      });
    })
      .catch((err) => {
        message.error(err);
      });
    seteditPatientNum(false);
  };

  const routerList = hasPermissions(teamMembers) ? [
    {
      name: '全部患者',
      pathName: 'patient',
    },
    {
      name: '全部受试者',
      pathName: 'patient_cro',
    },
  ] : [
    {
      name: '全部受试者',
      pathName: 'patient_cro',
    },
  ];


  const currentGroupId = props.location.query.groupId;
  return (
    <div className="patient-manage-side">
      {

        routerList.map((item) => {
          return (
            <div className={['menu', activeMenu === item.pathName ? 'active' : ''].join(' ')} key={item.name}>
              <Link to={`/patient_manage/${item.pathName}`}>{item.name}</Link>
            </div>
          );
        })
      }
      <div className="group-title">
        <span>试验分组</span>
        {
          window.$storage.getItem('isLeader') && status !== 1001 && hasPermissions(teamMembers) && (
            <AddEditGroup type="add" projectNsId={projectNsId} onSuccess={getGroupList}>
              <PlusOutlined style={{ fontSize: 14 }} />
            </AddEditGroup>
          )
        }
      </div>
      <div className="group-list">
        {
          groupList.length > 0 && (
            <div className="flex justify-around">
              <div className="mr-80"></div>
              <div>目标人数</div>
              <div>我管理人数</div>
              <div></div>
            </div>
          )
        }
        {
          groupList.map((item, index) => {
            return (
              <div className={['item', currentGroupId === item.groupId ? 'active' : ''].join(' ')} key={item.groupName}>
                <Link className="flex justify-between pl-10 pr-20 group_item" to={`/patient_manage/group_details?groupId=${item.groupId}`} onClick={() => resetIndex(index)}>
                  <span title={item.groupName} className="name">{item.groupName}</span>
                  <span title={item?.note?.note1 ? item?.note?.note1 + '人' : '--'} className="name">{item?.note?.note1}{item?.note?.note1 ? '人' : '--'}</span>
                  <span title={(item?.patientCount || 0) + '人'} className="name">{item?.patientCount || 0}人</span>
                </Link>

                {(activeIndex !== index && window.$storage.getItem('isLeader')) && status !== 1001 && (
                  <AddEditGroup
                    type="edit"
                    className='editGroup'
                    projectNsId={projectNsId}
                    onSuccess={getGroupList}
                    initData={item}
                  >
                    <FormOutlined />
                  </AddEditGroup>
                )}
              </div>
            );
          })
        }
      </div>
      {
        groupList.length === 0 && window.$storage.getItem('isLeader') && status !== 1001 && hasPermissions(teamMembers) && (
          <div className="creact-tip">
            <div>
              您的项目内暂无试验分组，创建分组并加入受试者开始您的科研吧。
            </div>
            <AddEditGroup type="add" projectNsId={projectNsId} onSuccess={getGroupList}>
              <div className="btn" >立即创建</div>
            </AddEditGroup>
          </div>
        )
      }
      <div className="patient_num">
        <span>有效病例数:</span>
        {
          editPatientNum || !detail?.effectiveCaseNum ?
            <span>
              <InputNumber
                min={0}
                onBlur={handlePatientNum}
                disabled={![Role.MAIN_PI.id, Role.PROJECT_LEADER.id].includes(roleType) || status === 1001}
                // autoFocus
                defaultValue={detail?.effectiveCaseNum}
              />人</span> :
            <span
              style={{ cursor: 'pointer' }}
              onClick={() => seteditPatientNum(true)}
            >{detail.effectiveCaseNum}人</span>
        }
      </div>
    </div>
  );
}
export default SideMenu;
