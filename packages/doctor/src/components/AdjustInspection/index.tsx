import React, { useState } from 'react';
import { Button, message } from 'antd';
import { useDispatch, useParams } from 'umi';
import { isEmpty, debounce } from 'lodash';
import { getIssueParams } from '@/utils/utils';
import DragModal from 'xzl-web-shared/src/components/DragModal';
import AdjustAdvice from '@/components/AdjustAdvice';
import AdjustPanel from './AdjustPanel';
import InspectionDiff from './InspectionDiff';
import styles from './index.scss';

interface Iprops {
  children: React.ReactElement;
  issueData?: IIssueList;
  refresh?: () => void;
}

function AdjustInspection(props: Iprops) {
  const { children, issueData, refresh } = props;
  const [showModal, setShowModal] = useState(false);
  const [medicalList, setMedicalList] = useState<IMedicalList[]>([]);
  const [note, setNote] = useState<string>();
  const { sid } = useParams<{ sid: string }>();
  const roleId = window.$storage.getItem('roleId') || '';
  const role = window.$storage.getItem('role') || '';
  const dispatch = useDispatch();
  const [step, setStep] = useState(0);

  const btnText: CommonData = {
    UPPER_DOCTOR: '发送',
    LOWER_DOCTOR: '发给主管医生',
    ALONE_DOCTOR: '发送',
  };

  const saveMedicalList = (medicalListParams: IMedicalList[]) => {
    setMedicalList(medicalListParams);
  };
  const toggleShowModal = () => {
    setShowModal(!showModal);
  };
  const handleShowModal = () => {
    setStep(1);
    setShowModal(true);
  };
  const handleSubmit = () => {
    const content = {
      medicalList: [
        {
          role: roleId,
          note,
          medicalIndexList: medicalList,
        },
      ],
    };
    const params = getIssueParams(JSON.stringify(content), 162);
    if (issueData && refresh) {
      window.$api.issue.postIssueStandard({ ...params, id: issueData.id }).then(() => {
        message.success('发送成功');
        // 更新待审核列表和操作历史 ps:这里只用于下级医生在待审核问题里收到大病历类型的调整达标值，不是真的直接更改达标值，所以不用更新用药达标
        refresh();
        dispatch({
          type: 'issue/fetchIssueHistory',
          payload: {
            objectId: sid,
          },
        });
        toggleShowModal();
        setStep(0);
      });
    } else {
      window.$api.issue.sendMedication(params).then(() => {
        message.success('修改成功');
        // 更新用药达标
        dispatch({
          type: 'currentPatient/fetchMedicalLast',
          payload: { sid },
        });
        // 更新操作历史
        dispatch({
          type: 'issue/fetchIssueHistory',
          payload: {
            objectId: sid,
          },
        });
        toggleShowModal();
        setStep(0);
      });
    }
  };
  const handleCancel = () => (
    step === 2 ? setStep(1) : setShowModal(!showModal)
  );
  const handleOk = () => {
    console.log('medicalList', medicalList);
    if (step === 1) {
      const editList = medicalList.filter((item) => item.action === 'EDIT');
      if (isEmpty(editList)) {
        message.warning('指标未做出任何调整');
      } else {
        let abbreviation = null;
        let isPass = true;
        medicalList.forEach((item) => {
          if (item.customizedReferenceMax <= item.customizedReferenceMin) {
            isPass = false;
            abbreviation = item.abbreviation;
            console.log('abbreviation', abbreviation);
          }
        });
        if (isPass) {
          setStep(2);
        } else {
          const msg = abbreviation === 'BP' ? '舒张压需小于收缩压' : '后面的数值需大于前面的数值';
          message.warning(msg);
        }
      }
    } else {
      handleSubmit();
    }
  };
  const handleChangeNote = (val: string) => {
    setNote(val);
  };
  return (
    <>
      <span onClick={handleShowModal}>{children}</span>
      {
        showModal && (
          <DragModal
            wrapClassName="ant-modal-wrap-center"
            width="770px"
            visible={showModal}
            title="指标调整"
            onCancel={toggleShowModal}
            footer={null}
          >
            <div>
              <div style={{ display: step === 1 ? 'block' : 'none' }}>
                <AdjustPanel
                  saveMedicalList={saveMedicalList}
                />
              </div>
              {
                step === 2 && (
                  <InspectionDiff
                    medicalList={medicalList}
                  />
                )
              }
              {
                ['LOWER_DOCTOR', 'UPPER_DOCTOR'].includes(role) && (
                  // 如果是上级医生并且是来源是用药达标，则不展示评价与指导。如果是待审核问题的用药达标则展示
                  !(role === 'UPPER_DOCTOR' && !issueData) && (
                    <AdjustAdvice isInput={step === 1} handleChangeNote={handleChangeNote} />
                  )
                )
              }
              <div className="common__btn">
                <Button className={styles.submit} onClick={handleCancel}>
                  { step === 1 ? '取消' : '重新调整' }
                </Button>
                <Button className={styles.submit} onClick={debounce(handleOk, 300)} htmlType="submit" type="primary">
                  { step === 1 ? '确认' : btnText[role] }
                </Button>
              </div>
            </div>
          </DragModal>
        )
      }
    </>
  );
}

export default AdjustInspection;
