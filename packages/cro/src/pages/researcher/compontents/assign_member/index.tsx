import React, { useState } from 'react';
import DragModal from 'xzl-web-shared/src/components/DragModal';
import DoctorList, { Irecord } from '../doctor_list';
import styles from './index.scss';
import { Button, message } from 'antd';
import * as api from '@/services/api';
import { useSelector } from 'umi';
import { IState } from 'typings/global';
import { debounce } from 'lodash';

interface Iprops {
  children: string;
  data: any;
  refresh: () => void;
}

function AssignMember({ children, data, refresh }: Iprops) {
  const [isShowModal, setIsShowModal] = useState(false);
  const [doctorId, setDoctorId] = useState<string>();
  const { projectNsId } = useSelector((state: IState) => state.project.projDetail);
  const handleToggleShow = () => {
    setIsShowModal(!isShowModal);
  };
  const handleChangeSelect = (params: Irecord[]) => {
    setDoctorId(params[0].subjectId);
  };
  const handleSubmit = () => {
    const { nsId, roleId } = data;
    if (doctorId) {
      const params = {
        doctorSId: doctorId,
        groupId: nsId,
        projectNsId,
        role: roleId,
      };
      api.research.postGroupLeader(params).then(() => {
        message.success('指定成功');
        refresh();
      });
    } else {
      message.error('您未勾选任何成员');
    }
  };
  const handleShowModal = (e) => {
    e.stopPropagation();
    setIsShowModal(true);
  };
  return (
    <div className={styles.assign}>
      <span
        className={styles.blue}
        onClick={handleShowModal}
      >
        {children}
      </span>
      <DragModal
        wrapClassName="ant-modal-wrap-center"
        className="select-group-modal"
        width="800px"
        visible={isShowModal}
        title='指定成员'
        onCancel={handleToggleShow}
        footer={null}
      >
        <DoctorList
          handleChangeSelect={handleChangeSelect}
        />
        <div className="submit-btn-style1">
          <Button onClick={() => setIsShowModal(false)}> 稍后指定 </Button>
          <Button type="primary" onClick={debounce(handleSubmit, 300)}> 完成 </Button>
        </div>
      </DragModal>
    </div>
  );
}

export default AssignMember;
