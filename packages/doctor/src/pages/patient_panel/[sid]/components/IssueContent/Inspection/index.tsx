import React, { useState } from 'react';
import { Button, message } from 'antd';
import { useDispatch, useParams } from 'umi';
import { isEmpty } from 'lodash';
import DragModal from 'xzl-web-shared/src/components/DragModal';
import InspectionDiff from '@/components/AdjustInspection/InspectionDiff';
import AdjustPanel from '@/components/AdjustInspection/AdjustPanel';
import { getIssueParams } from '@/utils/utils';
import AdjustAdvice from '@/components/AdjustAdvice';
import { validateMedical } from '../MedicalRecords/validateEmpty';
import styles from '../index.scss';

interface Iprops {
  refresh: () => void;
  data:IIssueList;
  children: string;
}

// 此组件用于 下级医生调达标值-上级收到下级医生的请求-上级审核调整达标值
/* status
    0:弹框不展示
    1:展示下级医生调指标diff页面
    2:在1基础上，上级医生点击重新调整达标值
    3:在2基础上，调完达标值点击确定展示上级医生调整的数据
  */
function Inspection({
  data, children, refresh,
}: Iprops) {
  const dispatch = useDispatch();
  const { sid } = useParams<{sid: string}>();
  const roleId = window.$storage.getItem('currRoleId');
  const [status, setStatus] = useState(0);
  const [editMedicalList, setEditMedicalList] = useState<IMedicalList[]>([]);
  const medicalIndexList = data.body?.content?.medicalList[0]?.medicalIndexList;
  const note = data.body?.content?.medicalList[0]?.note;
  const [advice, setAdvice] = useState<string>();
  const lowerInspection = medicalIndexList;

  const handleShowModal = () => {
    if (!isEmpty(lowerInspection)) {
      setStatus(1);
    } else {
      setStatus(2);
    }
  };

  const saveEditMedical = (editMedicalListParams: IMedicalList[]) => {
    setEditMedicalList(editMedicalListParams);
  };
  const handleSubmit = () => {
    const content = { ...data.body.content };
    if (validateMedical(editMedicalList)) {
      const newmedicalList = {
        role: roleId,
        note: advice,
        medicalIndexList: editMedicalList,
      };
      if (content?.medicalList && status === 3) {
        content.medicalList.push(newmedicalList);
      } else {
        content.medicalList = [newmedicalList];
      }
    }
    const params = getIssueParams(JSON.stringify(content), 162);
    window.$api.issue.sendMedication({ ...params, id: data.id }).then(() => {
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
      setStatus(0);
      refresh();
    });
  };
  const handleCancel = () => {
    switch (status) {
      case 1:
      case 3:
        setStatus(2);
        break;
      case 2:
        setStatus(1);
        break;
      default:
        break;
    }
  };
  const handleUpperDoctorIsEdit = () => {
    const editList = editMedicalList.filter((item) => item.action === 'EDIT');
    if (isEmpty(editList)) {
      message.error('您未对指标做出任何调整');
    } else {
      setStatus(3);
    }
  };
  const handleOk = () => {
    switch (status) {
      case 1:
      case 3:
        handleSubmit();
        break;
      case 2:
        handleUpperDoctorIsEdit();
        break;
      default:
        break;
    }
  };
  const handleChangeNote = (val: string) => {
    setAdvice(val);
  };
  return (
    <>
      <span className={styles.blue} onClick={handleShowModal}>{children}</span>
      <DragModal
        title="调整用药"
        width={1200}
        visible={!!status}
        onCancel={() => setStatus(0)}
        wrapClassName="ant-modal-wrap-center"
        footer={null}
      >
        <div className={styles.medicine_diff_title}>
          {
            !isEmpty(lowerInspection) ? (
              <div>
                <InspectionDiff
                  medicalList={lowerInspection}
                />
                <div style={{ width: 530, margin: '0 auto' }}>
                  <h3>下级医生调整建议</h3>
                  <div>{note || '无'}</div>
                </div>
              </div>
            ) : <span style={{ color: 'red' }}>下级医生未调整指标</span>
          }

          <div style={{ display: status === 2 ? 'block' : 'none' }}>
            <AdjustPanel
              saveMedicalList={saveEditMedical}
            />
          </div>
          {
            status === 3 && (
              <InspectionDiff
                medicalList={editMedicalList}
              />
            )
          }
          {
            [2, 3].includes(status)
            && <AdjustAdvice isInput={status === 2} handleChangeNote={handleChangeNote} />
          }
          <div className="common__btn" style={{ marginTop: 30 }}>
            <Button type="primary" onClick={handleCancel}>
              { (status === 1 || status === 3) && '重新调整' }
              { status === 2 && '取消' }
            </Button>
            <Button type="primary" onClick={handleOk}>
              { (status === 1 || status === 3) && '发送' }
              { status === 2 && '确认' }
            </Button>
          </div>
        </div>
      </DragModal>
    </>
  );
}

export default Inspection;
