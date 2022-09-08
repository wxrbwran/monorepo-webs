import React, { useState, useMemo, useEffect } from 'react';
import { Empty, message } from 'antd';
import { useSelector } from 'umi';
import { debounce } from 'lodash';
import hand from '@/assets/img/change.svg';
import DragModal from 'xzl-web-shared/dist/components/DragModal';
import { defaultAvatar } from 'xzl-web-shared/dist/utils/consts';
import { btnRender } from '@/utils/button';
import * as api from '@/services/api';
import { Role } from 'xzl-web-shared/dist/utils/role';
import styles from './index.scss';

interface IProps {
  data: ISubject;
  curRole: string; // 我目前是什么角色医生
  refresh: () => void;
}
function ChangeDoctor(props: IProps) {
  const { data, curRole, refresh } = props;
  const [showModal, setShowModal] = useState(false);
  const [step, setStep] = useState(1); // 1我做为什么角色  2选择关联的主管医生或医生助手
  const [choiceRoleId, setChoiceRoleId] = useState<string>(); // 要改成什么角色
  const [relationDoctorId, setRelationDoctorId] = useState<string>(); // 选中的关联医生wcid
  const [doctorTeams, setDoctorTeams] = useState<ISubject[]>([]); // 我做为上/下，选择对应的下/主管医生团队
  const { wcl } = useSelector((state: IState) => state.auth);

  const resetState = () => {
    setDoctorTeams([]);
    setRelationDoctorId('');
    setChoiceRoleId('');
    setStep(1);
  };
  useEffect(() => {
    if (!showModal) {
      resetState();
    }
  }, [showModal]);

  const fetchDoctorTeams = (roleId: string) => {
    // 选自己作为主管医生，就传主管医生角色
    api.doctor.getDotorTeams(roleId).then((res) => {
      // 我做为上级，选择下级医生，此时过滤出团队里的下级医生集合。反之相同。
      const filterRole: string =
        roleId === Role.UPPER_DOCTOR.id ? Role.LOWER_DOCTOR.id : Role.UPPER_DOCTOR.id;
      const doctors: ISubject[] = [];
      res.teams.forEach((item: { members: ISubject[] }) => {
        const filtermMember = item.members.filter(
          (member: ISubject) => member.role === filterRole,
        )[0];
        if (filtermMember) {
          doctors.push(filtermMember);
        }
      });
      setDoctorTeams(doctors);
    });
  };

  const handleChangeBind = (toWcId: string) => {
    const params = {
      toWcId,
      pwcId: data.wcId, // 患者
      sid: window.$storage.getItem('sid'),
    };
    api.doctor.postChangePatientBind(params).then(() => {
      message.success('更换成功');
      setShowModal(false);
      refresh(); // 更新成功后，刷新当前患者列表
    });
  };
  const handleChoiceRole = (roleId: string) => {
    setChoiceRoleId(roleId);
    if (roleId !== Role.ALONE_DOCTOR.id) {
      setStep(2);
      fetchDoctorTeams(roleId);
    } else {
      // 独立管理直接绑定   过滤出做为独立医生角色 的wcId
      for (let i: number = 0; i < wcl.length; i++) {
        if (wcl[i].roles[0].id === Role.ALONE_DOCTOR.id) {
          handleChangeBind(wcl[i].wcId);
          break;
        }
      }
    }
  };
  const handleSave = () => {
    if (relationDoctorId) {
      handleChangeBind(relationDoctorId!);
    }
  };
  // choiceRole
  // const btnList = [{ text: '我作为下级医生参与管理', roleId: Role.LOWER_DOCTOR.id }];
  // if (curRole === 'alone') {
  //   btnList.unshift({ text: '我作为主管医生参与管理', roleId: Role.UPPER_DOCTOR.id });
  // } else {
  //   btnList.unshift({ text: '我独立管理', roleId: Role.ALONE_DOCTOR.id });
  // }
  const btnList = [{ text: '我独立管理', roleId: Role.ALONE_DOCTOR.id }];
  const renderTitle = useMemo(
    () => () => {
      if (step === 1) {
        return '更换医生团队';
      }
      if (choiceRoleId === Role.UPPER_DOCTOR.id) {
        return '选择下级医生';
      }
      return '选择主管医生';
    },
    [step, choiceRoleId],
  );
  return (
    <div>
      <img
        className="cursor-pointer"
        src={hand}
        alt="更换医生团队"
        onClick={() => setShowModal(true)}
      />
      <DragModal
        wrapClassName="ant-modal-wrap-center"
        width={step === 1 ? 590 : 790}
        visible={showModal}
        title={renderTitle()}
        onCancel={() => setShowModal(false)}
        destroyOnClose
        footer={
          step === 2 && [
            <div className={styles.btn}>
              {btnRender({
                okText: '完成',
                cancelText: '上一步',
                onOk: debounce(handleSave, 300),
                okDisabled: !relationDoctorId,
                onCancel: () => resetState(),
              })}
            </div>,
          ]
        }
      >
        <div>
          {step === 1 && (
            <div className={styles.btn_wrap}>
              {btnList.map((item) => (
                <div
                  className={item.roleId === choiceRoleId ? styles.active : ''}
                  onClick={debounce(() => handleChoiceRole(item.roleId), 300)}
                >
                  {item.text}
                </div>
              ))}
            </div>
          )}
          {step === 2 && (
            <div>
              <div className={styles.doctor_list}>
                {doctorTeams.map((doctor) => (
                  <div
                    className={`${styles.doctor_item} ${
                      relationDoctorId === doctor.wcId && styles.active
                    }`}
                    onClick={() => setRelationDoctorId(doctor.wcId)}
                  >
                    <img src={doctor.avatarUrl || defaultAvatar} alt="医生头像" />
                    <div className={styles.name}>{doctor.name}</div>
                    <div>
                      {doctor.title}
                      <span>{doctor.title && doctor.departmentName && '|'}</span>
                      {doctor.departmentName}
                    </div>
                  </div>
                ))}
                {doctorTeams.length === 0 && (
                  <div className="flex justify-center w-full">
                    <Empty />
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </DragModal>
    </div>
  );
}

export default ChangeDoctor;
