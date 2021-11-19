import React, { FC, useState, useEffect } from 'react';
import DragModal from 'xzl-web-shared/src/components/DragModal';
import { Button } from 'antd';
import styles from './index.scss';
import * as api from '@/services/api';
import { useSelector } from 'umi';
import { TeamMember } from '../Member';
import radioCheck from '@/assets/img/radio_check.png';
import radioUnCheck from '@/assets/img/radio_uncheck.png';
import { Role } from 'xzl-web-shared/src/utils/role';
interface IProps {

  teamNSId?: string;
  onSaveSuccess: (choiceTeam) => void;
  onCancel: () => void;
  show: boolean;
  onCreateTeam: () => void;
}
const ChoiceTeam: FC<IProps> = (props) => {
  const { children, onSaveSuccess, show, onCancel, onCreateTeam, teamNSId } = props;
  const [teams, setTeams] = useState([]);

  const [choiceTeam, setChoiceTeam] = useState();
  const { projectNsId } = useSelector((state: IState) => state.project.projDetail);



  // 是否是该team的创建人
  const isTeamCreater = (team) => {

    return team.innerTeams
      .find((innerTeam) => innerTeam.members.find((item) => localStorage.getItem('xzl-web-doctor_sid') == item.sid && item.role == Role.NS_OWNER.id));
  };

  useEffect(() => {

    if (show) {
      api.service.getTeams({ 'teamNSLabels': ['research_pro_patient'], 'targetNSId': projectNsId }).then(res => {


        // 选择团队只能选择是自己创建的服务包
        setTeams(res.teams.filter((team) => isTeamCreater(team)));

        const choices = res.teams.filter((team) => team.teamNSId == teamNSId);
        if (teamNSId && choices.length > 0) {
          setChoiceTeam(choices[0]);
        }

      });
    }
  }, [show]);


  const onCheckTeam = (team) => {

    setChoiceTeam(team);
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
        title="分配CRO团队"
        footer={null}
        destroyOnClose
      >
        <div className={styles.add_service}>
          <p className='flex mb-20 text-lg'>没找到团队?<p className='text-blue-400' onClick={onCreateTeam}>点击创建团队</p></p>
          {
            teams.map((team) => {

              // border-dashed ${(choiceTeam && team?.teamNSId == choiceTeam?.teamNSId) ? 'border-red-300' : 'border-gray-300'}
              return (
                <div className={`${styles.member} py-15 px-20 mb-15`} onClick={() => { onCheckTeam(team); }}>

                  <div className='flex justify-between text-base mb-50'>
                    <div className='font-bold'>{team.name}</div>
                    <div className={`${styles.operator} flex items-center`}>
                      <p><img style={{ width: 16, height: 16 }} src={(choiceTeam && team?.teamNSId == choiceTeam?.teamNSId) ? radioCheck : radioUnCheck} className='mr-5' /></p>
                    </div>
                  </div>
                  {/* //onChange={handleChoiceOrg} defaultValue={currentChoice ? currentChoice.choiceOrgNsId : ''} */}
                  <TeamMember team={team}></TeamMember>
                </div>
              );
            })
          }
          <Button className="w-98 mt-20 mb-0 mx-auto block" type="primary" onClick={() => { onSaveSuccess(choiceTeam); }}>完成</Button>
        </div>
      </DragModal>
    </div>
  );
};

export default ChoiceTeam;



