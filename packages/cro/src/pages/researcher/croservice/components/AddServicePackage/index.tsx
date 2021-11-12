import React, { FC, useState, useEffect } from 'react';
import DragModal from 'xzl-web-shared/src/components/DragModal';
import { Input, Button, Select } from 'antd';
import styles from './index.scss';
import * as api from '@/services/api';
import { handleRelatedDoctorsDataSource } from 'xzl-web-shared/src/components/XzlTable/util';
import { Role } from 'xzl-web-shared/src/utils/role';
import { useSelector } from 'umi';
import { message } from '@umijs/plugin-request/lib/ui';
import Member from '../Member';
import { isEmpty } from 'lodash';


interface IProps {

  edit: boolean;
  source: any; // 数据源，团队信息，编辑传
  onSaveSuccess: () => void;
  onCancel: () => void;
  show: boolean;
}

const AddServicePackage: FC<IProps> = (props) => {
  const { children, onSaveSuccess, source, show, onCancel, edit } = props;

  const [friends, setfriends] = useState([]);

  const [choiceMember, setChoiceMember] = useState({
    CRC: [],
    CRA: [],
    PM: [],
    SELF: [],
  });
  const doctorSid = localStorage.getItem('xzl-web-doctor_sid');

  const { projectNsId } = useSelector((state: IState) => state.project.projDetail);
  const [teamName, setTeamName] = useState();

  const handleFetchFriends = () => {
    api.service.fetchDoctorFriends().then(res => {

      const resFriends = handleRelatedDoctorsDataSource(res.teams);
      if (!edit) {

        const selfFriend = resFriends.filter(item => item?.sid === doctorSid);

        selfFriend.map((item) => {
          if (item?.orgs?.length == 1) {
            item.choiceOrg = item.orgs[0];
          }
        });

        setChoiceMember({
          CRC: [],
          CRA: [],
          PM: [],
          SELF: selfFriend,
        });
      }
      setfriends(resFriends.filter(item => item?.sid !== doctorSid));
    });
  };

  useEffect(() => {

    if (show) {
      handleFetchFriends();
    }
  }, [show]);

  useEffect(() => {

    console.log('============ useEffect source source', JSON.stringify(source));

    if (show) {
      // 刷新选中的CRC、CRA、PM
      if (source && !isEmpty(source)) {

        setTeamName(source.name);

        const crcArray = [];
        const craArray = [];
        const pmArray = [];
        const selfArray = [];
        for (let i = 0; i < source.innerTeams.length; i++) {
          const members = source.innerTeams[i].members;

          const doctorList = [];
          let org: any;
          for (let j = 0; j < members.length; j++) {
            const memb = members[j];
            console.log('=========== memb', JSON.stringify(memb));
            if (memb.role == Role.CRO_CRC.id) {
              crcArray.push(memb);
              doctorList.push(memb);
            } else if (memb.role == Role.CRO_CRA.id) {
              craArray.push(memb);
              doctorList.push(memb);
            } else if (memb.role == Role.CRO_PM.id) {
              pmArray.push(memb);
              doctorList.push(memb);
            } else if (memb.role == Role.RESEARCH_PROJECT_DOCTOR.id) {
              selfArray.push(memb);
              doctorList.push(memb);
            } else if (memb.role == Role.ORG.id) {
              org = memb;
            }
          }
          doctorList.forEach((item) => {
            item.orgs = [org];
            item.choiceOrg = org;
          });
        }

        console.log('============ useEffect CRC CRA PM', JSON.stringify(crcArray));
        console.log('============ useEffect CRC CRA PM', JSON.stringify(craArray));
        console.log('============ useEffect CRC CRA PM', JSON.stringify(pmArray));
        setChoiceMember({
          CRC: crcArray,
          CRA: craArray,
          PM: pmArray,
          SELF: selfArray,
        });
      } else {

        setTeamName(undefined);
        const selfFriend = friends.filter(item => item?.sid === doctorSid);
        selfFriend.map((item) => {
          if (item?.orgs?.length == 1) {
            item.choiceOrg = item.orgs[0];
          }
        });

        setChoiceMember({
          CRC: [],
          CRA: [],
          PM: [],
          SELF: selfFriend,
        });
      }
    }

  }, [source, show]);



  const onHandleChoice = (type: string, choices: any[]) => {

    console.log('========onSaveTeam type choices', type, JSON.stringify(choices));
    setChoiceMember({
      ...choiceMember,
      [type]: [...choiceMember[type], ...choices],
    });
  };

  const getSameMember = (member) => {


    // 如果这个医生被其他角色选中了，那么医院机构不能再选
    let choice;
    const types = ['CRC', 'CRA', 'PM', 'SELF'];
    for (let typeIndex = 0; typeIndex < types.length; typeIndex++) {
      const crcMember = choiceMember[types[typeIndex]];
      const crcChoiceMember = crcMember.filter((item) => item.sid == member.sid);
      if (crcChoiceMember.length > 0) {
        choice = crcChoiceMember[0];
        break;
      }
    }

    console.log('==============onDoctorChoice choice choice', JSON.stringify(choice));
    return choice;
  };

  const onDoctorChoice = (member) => {

    const choice = getSameMember(member);
    return {
      show: (member.orgs.length > 1 && !choice),
      orgs: member.orgs,
      defaultChoiceOrg: choice ? choice.choiceOrg : member.orgs[0],
    };
  };

  const onDoctorUnChoice = (member) => {

    const choice = getSameMember(member);
    return !choice; // 如果同一个人被选中多次，则返回false
  };

  const onRemove = (type: string, item: any, index: number) => {

    choiceMember[type].splice(index, 1);

    if (onDoctorUnChoice(item)) {
      item.choiceOrg = null;
    }
    console.log('====================== onRemove onRemove', JSON.stringify(item));
    setChoiceMember({
      ...choiceMember,
      [type]: [...choiceMember[type]],
    });
  };

  const onTeamNameChange = (val) => {
    setTeamName(val.target.value);
  };

  const onSaveTeam = () => {

    console.log('projectNsId projectNsId', projectNsId);
    if (!teamName || teamName.length == 0) {
      message.error('请输入服务小组名称');
      return;
    }
    if (!(choiceMember.SELF && choiceMember.SELF[0].choiceOrg)) {
      message.error('请选择我所在机构');
      return;
    }

    const members = [];
    const types = ['SELF', 'CRC', 'CRA', 'PM'];
    const roles = [Role.RESEARCH_PROJECT_DOCTOR.id, Role.CRO_CRC.id, Role.CRO_CRA.id, Role.CRO_PM.id];
    for (let i = 0; i < types.length; i++) {
      const choices = choiceMember[types[i]];
      console.log('========== onSaveTeam choices', JSON.stringify(choices));
      for (let j = 0; j < choices.length; j++) {
        const item = choices[j];
        console.log('========== onSaveTeam item', JSON.stringify(item));
        members.push({
          sid: item.sid,
          role: roles[i],
          sourceNSId: item.sourceNSId ?? item.choiceOrg.nsId,
        });
      }
    }

    const parma = {

      name: teamName,
      teamNSId: source?.teamNSId ?? projectNsId,
      teamNSLabels: ['research_pro_patient'],
      members: members,
    };


    console.log('========onSaveTeam parma', JSON.stringify(parma));
    // 如果是编辑
    if (edit) {
      api.service.patchTeamMembers(parma).then(() => {
        // 弹窗消失
        if (onSaveSuccess) {
          onSaveSuccess();
        }
        // 
      });
    } else {
      api.service.putTeamMembers(parma).then(() => {
        // 弹窗消失
        if (onSaveSuccess) {
          onSaveSuccess();
        }
        // 
      });
    }
  };

  const onSelfOrgChange = (val) => {

    console.log('============== val , val', JSON.stringify(val));
    const choice = choiceMember.SELF[0].orgs.filter((item) => item.nsId == val)[0];
    choiceMember.SELF[0].choiceOrg = choice;
    console.log('============== val , option', JSON.stringify(choiceMember.SELF));
    setChoiceMember({
      ...choiceMember,
      SELF: choiceMember.SELF,
    });
  };

  console.log('==============onDoctorChoice  return (', JSON.stringify(choiceMember.CRC));
  return (
    <div>
      <div>{children}</div>
      <DragModal
        wrapClassName="ant-modal-wrap-center cancel_text_blue"
        width={1000}
        maskClosable
        visible={show}
        onCancel={onCancel}
        title={edit ? '编辑团队' : '添加新团队'}
        footer={null}
      // destroyOnClose
      >
        <div className={styles.add_service}>
          <Input className={styles.package_name} placeholder="请输入服务小组名称" value={teamName} onChange={onTeamNameChange} />

          {
            !edit && <div className="mt-15">
              <span className="mr-15">我在</span>
              <Select placeholder="请选择机构" onChange={onSelfOrgChange} style={{ width: 240 }} value={choiceMember.SELF.length > 0 ? (choiceMember.SELF[0].choiceOrg?.nsId ?? '') : ''}>
                {
                  choiceMember.SELF && choiceMember.SELF.length > 0 && choiceMember.SELF[0].orgs.map(({ nsId, name, wcId }) => (
                    <Option value={nsId} title={name} key={wcId}>
                      {name}
                    </Option>
                  ))
                }
              </Select>
            </div>
          }
          <Member title='研究者' members={choiceMember.SELF} editable={false} friends={friends}></Member>
          <Member title='CRC' members={choiceMember.CRC} editable={true} friends={friends} handleChoice={(choices: any[]) => onHandleChoice('CRC', choices)} onRemove={(item: any, index: number) => onRemove('CRC', item, index)} onDoctorChoice={onDoctorChoice} onDoctorUnChoice={onDoctorUnChoice}></Member>
          <Member title='CRA' members={choiceMember.CRA} editable={true} friends={friends} handleChoice={(choices: any[]) => onHandleChoice('CRA', choices)} onRemove={(item: any, index: number) => onRemove('CRA', item, index)} onDoctorChoice={onDoctorChoice} onDoctorUnChoice={onDoctorUnChoice}></Member>
          <Member title='PM' members={choiceMember.PM} editable={true} friends={friends} handleChoice={(choices: any[]) => onHandleChoice('PM', choices)} onRemove={(item: any, index: number) => onRemove('PM', item, index)} onDoctorChoice={onDoctorChoice} onDoctorUnChoice={onDoctorUnChoice}></Member>
          <Button className="w-98 mt-20 mb-0 mx-auto block" type="primary" onClick={onSaveTeam}>完成</Button>

        </div>
      </DragModal >
    </div >
  );
};

export default AddServicePackage;



