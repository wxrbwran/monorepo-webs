import React, { FC, useState, useEffect } from 'react';
import DragModal from 'xzl-web-shared/src/components/DragModal';
import { Input, Button } from 'antd';
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
  source: any;
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
  });
  const doctorSid = localStorage.getItem('xzl-web-doctor_sid');

  const { projectNsId } = useSelector((state: IState) => state.project.projDetail);
  const [teamName, setTeamName] = useState();

  const handleFetchFriends = () => {
    api.service.fetchDoctorFriends().then(res => {
      setfriends(handleRelatedDoctorsDataSource(res.teams));
    });
  };

  useEffect(() => {

    if (show) {
      handleFetchFriends();
    }
  }, [show]);

  useEffect(() => {

    console.log('============ useEffect', JSON.stringify(source));


    // 刷新选中的CRC、CRA、PM
    if (source && !isEmpty(source)) {

      setTeamName(source.name);

      const crcArray = [];
      const craArray = [];
      const pmArray = [];
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
          } else if (memb.role == Role.ORG.id) {
            org = memb;
          }
        }
        doctorList.forEach((item) => {
          item.orgs = [org];
        });
      }

      console.log('============ useEffect CRC CRA PM', JSON.stringify(crcArray));
      console.log('============ useEffect CRC CRA PM', JSON.stringify(craArray));
      console.log('============ useEffect CRC CRA PM', JSON.stringify(pmArray));
      setChoiceMember({
        CRC: crcArray,
        CRA: craArray,
        PM: pmArray,
      });
    } else {

      setTeamName(undefined);
      setChoiceMember({
        CRC: [],
        CRA: [],
        PM: [],
      });
    }

  }, [source]);



  const onHandleChoice = (type: string, choices: any[]) => {

    console.log('========onSaveTeam type choices', type, JSON.stringify(choices));
    setChoiceMember({
      ...choiceMember,
      [type]: [...choiceMember[type], ...choices],
    });
  };

  const onRemove = (type: string, index: number) => {
    choiceMember[type].splice(index, 1);
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

    const members = [];
    const types = ['CRC', 'CRA', 'PM'];
    const roles = [Role.CRO_CRC.id, Role.CRO_CRA.id, Role.CRO_PM.id];
    for (let i = 0; i < types.length; i++) {
      const choices = choiceMember[types[i]];
      console.log('========== onSaveTeam choices', JSON.stringify(choices));
      for (let j = 0; j < choices.length; j++) {
        const item = choices[j];
        console.log('========== onSaveTeam item', JSON.stringify(item));
        members.push({
          sid: item.sid,
          role: roles[i],
          sourceNSId: item.sourceNSId ?? item.orgs[0].nsId,
        });
      }
    }

    const member = friends.filter(item => item?.sid === doctorSid);

    console.log('============ member member member ', JSON.stringify(member));
    console.log('============ friends friends friends ', JSON.stringify(friends));
    if (member && member.length > 0) {
      members.push({
        sid: member[0].sid,
        role: Role.RESEARCH_PROJECT_DOCTOR.id,
        sourceNSId: member[0].sourceNSId ?? member[0].orgs[0].nsId,
      });
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
        destroyOnClose
      >
        <div className={styles.add_service}>
          <Input className={styles.package_name} placeholder="请输入服务小组名称" value={teamName} onChange={onTeamNameChange} />
          <Member title='研究者' members={friends.filter(item => item?.sid === doctorSid)} editable={false} friends={friends}></Member>
          <Member title='CRC' members={choiceMember.CRC} editable={true} friends={friends} handleChoice={(choices: any[]) => onHandleChoice('CRC', choices)} onRemove={(item: any, index: number) => onRemove('CRC', item, index)}></Member>
          <Member title='CRA' members={choiceMember.CRA} editable={true} friends={friends} handleChoice={(choices: any[]) => onHandleChoice('CRA', choices)} onRemove={(item: any, index: number) => onRemove('CRA', item, index)}></Member>
          <Member title='PM' members={choiceMember.PM} editable={true} friends={friends} handleChoice={(choices: any[]) => onHandleChoice('PM', choices)} onRemove={(item: any, index: number) => onRemove('PM', item, index)}></Member>
          <Button className="w-98 mt-20 mb-0 mx-auto block" type="primary" onClick={onSaveTeam}>完成</Button>
        </div>
      </DragModal>
    </div>
  );
};

export default AddServicePackage;



