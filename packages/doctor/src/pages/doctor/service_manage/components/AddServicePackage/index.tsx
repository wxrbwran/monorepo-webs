import React, { FC, useState, useMemo, useEffect } from 'react';
import DragModal from 'xzl-web-shared/src/components/DragModal';
import { Input, Button, message } from 'antd';
import iconClose from '@/assets/img/icon_close.png';
import iconAdd from '@/assets/img/icon_add_large.png';
import ChoiceDoctor, { IMember } from '../ChoiceDoctor';
import { defaultAvatar } from 'xzl-web-shared/src/utils/consts';
import styles from './index.scss';
import ChoiceSelfRole from '../ChoiceSelfRole';
import { Role } from 'xzl-web-shared/src/utils/role';
import * as api from '@/services/api';
import { isEmpty, debounce } from 'lodash';
import { handleRelatedDoctorsDataSource } from 'xzl-web-shared/src/components/XzlTable/util';
import { roleMembers } from '@/utils/tools';
interface IProps {
  initData?: {
    innerTeams: {
      members: ISubject[]
    }[],
    name: string; // 套餐名
    teamNSId: string; // 套餐nsid
  };
  onSuccess: () => void;
}
interface IRoleMember {
  title: string;
  role: string;
}
const AddServicePackage: FC<IProps> = (props) => {
  const { children, initData, onSuccess } = props;

  const [showModal, setshowModal] = useState(false);
  const [packageName, setpackageName] = useState<string>('');
  const [members, setMembers] = useState<IMember[]>([]);
  const [teamNsId, setTeamNsId] = useState<string | null>(null);
  const [friends, setfriends] = useState([]); // 好友列表
  const [initSelfInfo, setInitSelfInfo] = useState({});
  const doctorSid = window.$storage.getItem('sid');

  const handleFetchFriends = () => {
    api.service.fetchDoctorFriends().then((res: { teams: ISubject[] }) => {
      setfriends(handleRelatedDoctorsDataSource(res.teams).filter((item: ISubject) => item?.sid !== doctorSid));
    });
  };
  useEffect(() => {
    if (!showModal) {
      setTeamNsId(null);
      setMembers([]);
      setpackageName('');
    }
  }, [showModal]);
  const formatInit = () => {
    if (initData) {
      setpackageName(initData.name);
      setTeamNsId(initData.teamNSId);
      const initMembers: IMember[] = [];
      initData.innerTeams.forEach((teamItem) => {
        let itemInfo: IMember = {};
        const roles: string[] = [];
        teamItem.members.forEach(member => {
          switch (member.role) {
            case Role.ORG.id:
              itemInfo.orgName = member.name!;
              itemInfo.sourceNSId = member.nsId!;
              break;
            case Role.UPPER_DOCTOR.id:
            case Role.LOWER_DOCTOR.id:
            case Role.DIETITIAN.id:
              itemInfo = {
                ...itemInfo,
                avatarUrl: member.avatarUrl || defaultAvatar,
                name: member.name!,
                sid: member.sid!,
              };
              roles.push(member.role);
              break;
            default:
              break;
          }
        });
        roles.forEach(roleItem => {
          initMembers.push({
            ...itemInfo,
            role: roleItem,
          });
        });

      });
      initMembers.forEach(item => {
        if (item.sid === doctorSid) {
          setInitSelfInfo({
            role: item.role,
            orgName: item.orgName,
            sourceNSId: item.sourceNSId,
          });
        }
      });
      setMembers([...initMembers]);
    }
  };

  const handleShowModal = () => {
    console.log('initData', initData);
    formatInit();
    setshowModal(true);
    handleFetchFriends();

  };
  const handleSelfRole = (selectData: any) => {
    console.log('我的信息', selectData);
    let originMember = [];
    if (selectData.role === Role.UPPER_DOCTOR.id) {
      // 把自己先从团队中去除掉，如果我要做主管，再把当前主管去除掉
      originMember = members.filter(item => item.sid !== selectData.sid && item.role !== Role.UPPER_DOCTOR.id);
    } else {
      originMember = members.filter(item => item.sid !== selectData.sid);
    }
    setMembers([...originMember, selectData]);
    if (!initData) {
      setTeamNsId(selectData.sourceNSId);
    }
  };
  const handleChoice = (choickMembers: IMember[]) => {
    setMembers([...members, ...choickMembers]);
  };
  const checkUpperLower = () => {
    const lower = members.filter(member => member.role === Role.LOWER_DOCTOR.id);
    // 如果有医生助手就必须有主管医生
    console.log('lower', lower);
    if (lower.length > 0){
      return !!(members.filter(member => member.role === Role.UPPER_DOCTOR.id).length === 0);
    } else {
      return false;
    }
  };
  const handleSubmit = () => {
    if (!packageName) {
      message.error('请输入服务小组名称');
    } else if (isEmpty(members.filter(member => member.sid === doctorSid))) {
      message.error('请选择你在服务小组中的位置');
    } else if (checkUpperLower()){
      message.error('请添加主管医生');
    } else {
      console.log(packageName);
      console.log(members);
      // teamNsId
      const params = {
        name: packageName,
        teamNSId: teamNsId,
        teamNSLabels: ['chronic_disease_team'],
        members,
      };
      console.log('saveeeparams', params);
      // patchDoctorTeamMembers
      const request = initData ? 'patchDoctorTeamMembers' : 'putDoctorTeamMembers';
      api.service[request](params).then(res => {
        console.log(res);
        message.success('保存成功');
        onSuccess();
        setshowModal(false);
      }).catch(err => {
        message.error(err?.result || '保存失败');
      });
    }
  };

  const handleDel = (sid: string, role: string) => {
    // 过滤掉，sid一致且角色与当前删除角色一致的
    setMembers([...members.filter(member => !(member.sid === sid && member.role === role))]);
  };
  const renderDom = useMemo(() => (roleInfo: IRoleMember) => {
    const curRoleMembers = members.filter(member => member.role === roleInfo.role);
    const selectedDoctorSid = curRoleMembers.map(doctor => doctor.sid);
    const initWordOrgs = {};
    members.forEach(member => initWordOrgs[member.sid!] = member.sourceNSId);
    return (
      <div className={styles.item_panel} key={roleInfo.role}>
        <div className="text-base font-bold mb-10">{roleInfo.title}</div>
        <div className="flex flex-wrap">
          {
            curRoleMembers.map(doctor => (
              <div className="box-shadow relative w-150 h-80 text-center rounded-md mr-20 flex items-center" key={doctor.role + doctor.sid}>
                {
                  doctor.sid !== doctorSid && (
                    <img className="absolute right-10 top-10 w-14" src={iconClose} alt="" onClick={() => handleDel(doctor.sid, roleInfo.role)} />
                  )
                }
                <img className="w-50 h-50 rounded m-12 mr-6" src={doctor.avatarUrl || defaultAvatar} alt="" />
                <div className="w-78">
                  <div className="text-sm font-bold mt-5 hide-text" title={doctor.name}>{doctor.name}</div>
                  <div className={`text-gray-600 text-xs ${styles.org_name}`} title={doctor.orgName}>{doctor.orgName}</div>
                </div>
              </div>
            ))
          }
          {
            !(roleInfo.role === Role.UPPER_DOCTOR.id && curRoleMembers.length > 0)
              && friends.length > selectedDoctorSid.length && (
              <ChoiceDoctor
                role={roleInfo.role}
                callbackSelectDoctor={handleChoice}
                title={roleInfo.title}
                selectedDoctorSid={selectedDoctorSid}
                friends={friends}
                members={members}
                initWorkOrgs={initWordOrgs}
              >
                <div className="flex items-center justify-center box-shadow w-80 h-80 rounded-md">
                  <img src={iconAdd} alt="" />
                </div>
              </ChoiceDoctor>
            )
          }
        </div>
      </div>
    );
  }, [members, friends]);
  return (
    <div>
      <div onClick={handleShowModal}>{children}</div>
      <DragModal
        wrapClassName="ant-modal-wrap-center cancel_text_blue"
        width={1200}
        maskClosable
        visible={showModal}
        onCancel={() => setshowModal(false)}
        title={`${initData ? '编辑' : '添加'}服务小组`}
        footer={null}
        // destroyOnClose
      >
        <div className={styles.add_service}>
          <Input
            className={styles.package_name}
            placeholder="请输入服务小组名称"
            value={packageName}
            onChange={(e) => setpackageName(e.target.value)}
          />
          <ChoiceSelfRole callback={handleSelfRole} initData={initSelfInfo} />
          <div className="flex flex-wrap">
            { roleMembers.map(item => renderDom(item)) }
          </div>
          <Button className="w-98 mt-20 mb-0 mx-auto block" type="primary" onClick={debounce(handleSubmit, 500)}>完成</Button>
        </div>
      </DragModal>
    </div>
  );
};

export default AddServicePackage;
