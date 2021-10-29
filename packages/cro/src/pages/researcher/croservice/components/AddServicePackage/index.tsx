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


interface IProps {

  onSaveSuccess: () => void;
}
const AddServicePackage: FC<IProps> = (props) => {
  const { children, onSaveSuccess } = props;
  const [showModal, setshowModal] = useState(false);
  const handleShowModal = () => {
    setshowModal(true);
  };

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

    // Role.CRO_PM.id

    // CRO_PM:  
    // CRO_CRA:  
    // CRO_CRC: 

    api.service.fetchDoctorFriends().then(res => {
      setfriends(handleRelatedDoctorsDataSource(res.teams));
    });
  };
  useEffect(() => {
    handleFetchFriends();
  }, []);

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
      message.error('请输入服务包名称');
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
          nsId: projectNsId,
        });
      }
    }

    const member = friends.filter(item => item?.sid === doctorSid);
    if (member && member.length > 0) {
      members.push({
        sid: member[0].sid,
        role: Role.RESEARCH_PROJECT_DOCTOR.id,
        nsId: projectNsId,
      });
    }

    const parma = {

      name: teamName,
      teamNSId: projectNsId,
      teamNSLabel: 'research_cro_team',
      members: members,
    };


    console.log('========onSaveTeam parma', JSON.stringify(parma));
    api.service.putTeamMembers(parma).then(() => {
      // 弹窗消失
      setshowModal(false);
      if (onSaveSuccess) {
        onSaveSuccess();
      }
      // 
    });
  };

  return (
    <div>
      <div onClick={handleShowModal}>{children}</div>
      <DragModal
        wrapClassName="ant-modal-wrap-center cancel_text_blue"
        width={1000}
        maskClosable
        visible={showModal}
        onCancel={() => setshowModal(false)}
        title="添加新团队"
        footer={null}
        destroyOnClose
      >
        <div className={styles.add_service}>
          <Input className={styles.package_name} placeholder="请输入服务包名称" onChange={onTeamNameChange} />
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



