import React, { FC, useState, useEffect } from 'react';
import { Input, message } from 'antd';
import { useSelector } from 'umi';
import { isEmpty } from 'lodash';
import DragModal from 'xzl-web-shared/src/components/DragModal';
import { btnRender } from '@/utils/button';
import * as api from '@/services/api';
import { getCondition } from '@/utils/utils';
import { Role } from '@/utils/role';
import styles from './index.scss';

const AddPatient:FC = ({ children }) => {
  const [showModal, setShowModal] = useState(false);
  const [uuCode, setUuCode] = useState<number | undefined>(); // 患者识别码
  const [activeId, setActiveId] = useState<string>(); // 机构空间id
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);
  const [patientInfo, setPatientInfo] = useState<ISubject>({}); // 患者详情
  const [orgList, setOrgList] = useState<ISubject[]>([]);
  const orgTeams: IOrgTeams[] = useSelector((state: IState) => state.user.organizations.teams);

  const handleChangePatientId = (e: any) => {
    setUuCode(e.target.value);
  };

  const fetchFilterOrgList = () => {
    const filterList: ISubject[] = [];
    orgTeams.forEach((item: IOrgTeams) => {
      let isAlone: boolean = false;
      let orgInfo: ISubject = {};
      // 过滤只显示独立角色所在机构列表
      item.members.forEach((member:ISubject) => {
        if (member.role === Role.ALONE_DOCTOR.id) {
          isAlone = true;
        }
        if (member.role === Role.ORG.id) {
          orgInfo = {
            ...member,
            nsId: item.teamNSId,
          };
        }
      });
      if (isAlone && !isEmpty(orgInfo)) {
        filterList.push({
          ...orgInfo,
        });
      }
    });
    setOrgList([...filterList]);
  };
  useEffect(() => {
    if (!showModal) {
      setStep(1);
      setUuCode(undefined);
      setActiveId('');
    } else {
      fetchFilterOrgList();
    }
  }, [showModal]);
  const handleNext = () => {
    if (step === 1) {
      if (!uuCode) {
        message.error('请输入患者识别码！');
      } else if (!(/^[0-9]+$/.test(uuCode.toString()))) {
        message.warning('患者识别码为纯数字');
      } else if (!activeId) {
        message.error('请选择将患者添加到哪个机构');
      } else {
        // getUuCodePatientInfo
        setLoading(true);
        // 获取患者详情
        api.doctor.getUuCodePatientInfo(uuCode).then((res) => {
          setStep(2);
          setPatientInfo(res.members[0]);
          setLoading(false);
        }).catch(() => {
          setLoading(false);
        });
      }
    } else if (step === 2) {
      const params = {
        toBindSid: patientInfo.sid,
        conditions: [getCondition('cr.namespace', activeId)],
      };
      api.doctor.postPatientBind(params).then(() => {
        message.success('添加患者成功');
        setShowModal(false);
      });
    }
  };
  const handleCloseModal = () => {
    if (step === 1) {
      setShowModal(false);
    } else {
      setStep(1);
    }
  };

  const handleChangeId = (nsId: string) => {
    setActiveId(nsId);
  };
  return (
    <>
      <span onClick={() => setShowModal(true)}>{children}</span>
      <DragModal
        wrapClassName="ant-modal-wrap-center"
        width={step === 1 ? 692 : 460}
        visible={showModal}
        title="添加患者"
        onCancel={() => setShowModal(false)}
        footer={null}
      >
        <div className={styles.add_patient}>
          {
            step === 1 ? (
              <>
                <div className={styles.tip}>温馨提示：添加后，请您及时管理患者</div>
                <div className={styles.item}>
                  <span>患者识别码</span>
                  <Input
                    type="text"
                    placeholder="请输入您需要管理患者的识别码"
                    value={uuCode}
                    onChange={handleChangePatientId}
                  />
                </div>
                <div className={styles.item}>
                  <span>添加到医院</span>
                  {
                    isEmpty(orgList) && <span>暂无执业机构</span>
                  }
                  <ul className={styles.orgList}>
                    {
                      orgList.map((item) => (
                        <li
                          key={item.nsId}
                          className={activeId === item.nsId && styles.active}
                          onClick={() => handleChangeId(item.nsId as string)}
                        >
                          {item.name}
                        </li>
                      ))
                    }
                  </ul>
                </div>
              </>
            ) : (
              <div className={styles.patient_info}>
                <div>
                  <span>姓名:</span>
                  {patientInfo.name}
                </div>
                <div>
                  <span>年龄:</span>
                  {patientInfo.age || '--'}
                </div>
                <div>
                  <span>地址:</span>
                  {patientInfo.provinceName || '--'}
                </div>
              </div>
            )
          }
          {btnRender({
            okText: step === 1 ? '添加' : '确定',
            cancelText: '取消',
            onOk: handleNext,
            onCancel: handleCloseModal,
            loading,
          })}
        </div>
      </DragModal>
    </>
  );
};
export default AddPatient;
