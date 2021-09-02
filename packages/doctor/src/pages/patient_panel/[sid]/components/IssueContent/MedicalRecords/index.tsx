import React, { useState } from 'react';
import { Button, message } from 'antd';
import { useParams, useDispatch } from 'umi';
import DragModal from '@/components/DragModal';
import { getIssueParams } from '@/utils/utils';
import NotAdjustBtn from '../NotAdjustBtn';
import MrAdjustMedicine from './MrAdjustMedicine';
import MrAdjustInspection from './MrAdjustInspection';
import { validateMedical, validateMedicine } from './validateEmpty';
import MrAdjustAdvice from './MrAdjustAdvice';
import styles from './index.scss';

interface Iprops {
  refresh: () => void;
  data:IIssueList;
}

function MedicalRecords(props: Iprops) {
  const { refresh, data } = props;
  const [showModal, setShowModal] = useState(false);
  const [medicineList, setMedicineList] = useState<IAdjustMedicinePlan[]>();
  const [medicalList, setmedicalList] = useState<IMedicalList[]>();
  const role = window.$storage.getItem('role') || '';
  const roleId = window.$storage.getItem('currRoleId');
  const { sid } = useParams<{sid: string}>();
  const [note, setNote] = useState<string>(); // 调整建议
  const [remind, setRemind] = useState<string>(data?.body?.content?.remind); // 医生提醒（发送给患者）
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const handleShowModal = () => {
    setShowModal(true);
  };
  const refreshIssue = () => {
    refresh(); // 更新待审核问题列表
    dispatch({ // 更新操作历史
      type: 'issue/fetchIssueHistory',
      payload: {
        objectId: sid,
      },
    });
  };
  const handleSend = () => {
    setLoading(true);
    // 是否调整过指标或者服药，只要有一个编辑过即过验证通过
    const isEdit = validateMedical(medicalList) || validateMedicine(medicineList);
    // 如果角色是上级医生，可跳过验证（因为下级医生一定调整过了）
    if (role === 'UPPER_DOCTOR' || isEdit) {
      const content = { ...data.body.content };
      // 如果下级医生调整过，此时content字段有值。调药和调指标-未调整的则没有此字段，调过的则有。这里做判断，有则用，无则添加为空数组
      if (remind) {
        content.remind = remind;
      }
      if (medicalList) {
        const newItem = {
          role: roleId,
          note: null,
          medicalIndexList: medicalList,
        };
        if (content?.medicalList) {
          content.medicalList.push(newItem);
        } else {
          content.medicalList = [newItem];
        }
      }
      if (medicineList) {
        const newItem = {
          role: roleId,
          note,
          allPlans: medicineList,
        };
        if (content?.medicineList) {
          content.medicineList.push(newItem);
        } else {
          content.medicineList = [newItem];
        }
      }
      const params = getIssueParams(JSON.stringify(content), 163);
      window.$api.issue.postIssueStandard({ ...params, id: data.id }).then(() => {
        message.success('发送成功');
        refreshIssue();
        // 如果是上级或者独立医生且有调指标信息，更新最新的用药达标
        if (medicalList && ['UPPER_DOCTOR', 'ALONE_DOCTOR'].includes(role)) {
          dispatch({
            type: 'currentPatient/fetchMedicalLast',
            payload: { sid },
          });
        }
        setShowModal(false);
        setLoading(false);
      });
    } else {
      setLoading(false);
      message.error('您未调整指标与服药');
    }
  };
  const handleSaveMedicine = (dataList: IAdjustMedicinePlan[]) => {
    setMedicineList(dataList);
  };
  const handleSaveMedical = (dataList: IMedicalList[]) => {
    setmedicalList(dataList);
  };
  // 取消发送忽略此消息
  const handlIgnoreMsg = () => {
    const params = {
      roleType: window.$storage.getItem('roleId'),
      state: role === 'LOWER_DOCTOR' ? 4 : 2, // 2独立管理和上级医生，4是下级医生
      id: data.id,
      objectId: window.$storage.getItem('patientSid'),
      objectWcId: window.$storage.getItem('patientWcId'),
      patientRoleType: window.$storage.getItem('patientRoleId'),
    };
    window.$api.issue.cancelAdjust(params).then(() => {
      refreshIssue();
      setShowModal(false);
    }).catch((err: any) => {
      console.log(err);
    });
  };
  const handleChangeNote = (val: string, sendRole: string) => {
    if (sendRole === 'patient') {
      setRemind(val);
    } else {
      setNote(val);
    }
  };
  return (
    <>
      {
        role === 'UPPER_DOCTOR'
          ? <span className={styles.blue} onClick={handleShowModal}>请您审核</span> : (
            <div className={styles.btn_wrap}>
              <Button onClick={handleShowModal}>调整</Button>
              <NotAdjustBtn data={data} refresh={refresh} />
            </div>
          )
      }
      <DragModal
        title="调整治疗方案"
        width="1400px"
        visible={showModal}
        onCancel={() => setShowModal(false)}
        wrapClassName="ant-modal-wrap-center"
        footer={null}
      >
        <div className={styles.medical_records}>
          <div className={styles.records_content}>
            <MrAdjustMedicine
              saveData={handleSaveMedicine}
              issueData={data}
            />
            <MrAdjustInspection
              saveData={handleSaveMedical}
              issueData={data}
            />
          </div>
          <MrAdjustAdvice changeNote={handleChangeNote} remind={remind} />
          {
            role === 'LOWER_DOCTOR' && <Button className={styles.submit_btn} type="primary" onClick={handleSend}>请上级医生审核</Button>
          }
          {
            ['UPPER_DOCTOR', 'ALONE_DOCTOR'].includes(role)
            && (
              <div className="common__btn" style={{ marginTop: 20 }}>
                <Button onClick={handlIgnoreMsg}>取消发送</Button>
                <Button type="primary" onClick={handleSend} loading={loading}>
                  发送患者
                  {role === 'UPPER_DOCTOR' && '及下级医生'}
                </Button>
              </div>
            )

          }

        </div>
      </DragModal>
    </>
  );
}

export default MedicalRecords;
