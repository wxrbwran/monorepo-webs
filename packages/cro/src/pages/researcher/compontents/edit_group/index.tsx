import React, { useState } from 'react';
import DragModal from 'xzl-web-shared/src/components/DragModal';
import DoctorList, { Irecord } from '../doctor_list';
import { Input, Button, message } from 'antd';
import { fetchRolePropValue } from 'xzl-web-shared/src/utils/role';
import styles from '../add_group/index.scss';
import { CommonData, IState } from 'typings/global';
import { debounce } from 'lodash';
import { useSelector } from 'umi';

interface Iprops {
  children: React.ReactElement;
  refresh: () => void;
  data: {
    groupName: string;
    role: string;
    nsId: string;
  }
}
function EditGroup({ children, data, refresh }: Iprops) {
  const { role, nsId } = data;
  const [isShowModal, setIsShowModal] = useState(false);
  const [isUpdatePi, setIsUpdatePi] = useState(false);
  const [groupName, setGroupName] = useState<string>(data.groupName);
  const [selectName, setSelectName] = useState('');
  const [selectPatientId, setPatientId] = useState<string>();
  const { projectNsId } = useSelector((state: IState) => state.project.projDetail);
  const handleHideModal = () => {
    setIsShowModal(false);
    setPatientId('');
    setSelectName('');
    setIsUpdatePi(false);
  }
  const handleSubmit = () => {
    if (groupName) {
      const apiParams: CommonData = {
        groupName,
        groupId: nsId,
      }
      if (selectPatientId) {
        apiParams.doctorSId = selectPatientId;
        apiParams.role = role;
        apiParams.projectNsId = projectNsId;
      }
      window.$api.research.patchPiGroup(apiParams).then(() => {
        message.success(`修改成功`);
        handleHideModal();
        refresh();
      })
    } else {
      message.error('请输入组名');
    }
  }
  const handleChangeSelect = (data: Irecord[]) => {
    setSelectName(data[0].name);
    setPatientId(data[0].subjectId);
  }
  const handleChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGroupName(e.target.value);
  }
  return (
    <div>
      <div onClick={() => setIsShowModal(true)}>{children}</div>
      <DragModal
        wrapClassName="ant-modal-wrap-center"
        className="select-group-modal"
        width="800px"
        visible={isShowModal}
        title="修改基本信息"
        onCancel={handleHideModal}
        footer={null}
      >
        <div className={styles.add_group}>
          <div className={styles.group_name}>组名 <span>*</span>
           <Input value={groupName} onChange={handleChangeName} /></div>
          {
            !isUpdatePi ?
              <div
                className={styles.update_btn}
              >
                <div onClick={() => setIsUpdatePi(true)}>重新任命{fetchRolePropValue(role, 'desc')}</div>
                <div className="submit-btn-style1" style={{ marginTop: 370 }}>
                  <Button onClick={handleHideModal}> 取消 </Button>
                  <Button type="primary" onClick={debounce(handleSubmit, 300)}> 完成 </Button>
                </div>
              </div> : (
              <div>
                <div className={styles.group_leader}>
                  新任{fetchRolePropValue(role, 'desc')}为{selectName && <span>{selectName}</span>}
                </div>
                <DoctorList
                  handleChangeSelect={handleChangeSelect}
                />
                <div className="submit-btn-style1">
                  <Button onClick={handleHideModal}> 取消 </Button>
                  <Button type="primary" onClick={debounce(handleSubmit, 300)}> 完成 </Button>
                </div>
              </div>
            )
          }
        </div>
      </DragModal>
    </div>
  )
}

export default EditGroup;
