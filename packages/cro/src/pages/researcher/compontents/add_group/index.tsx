import React, { useState } from 'react';
import DragModal from 'xzl-web-shared/dist/src/components/DragModal';
import DoctorList, { Irecord } from '../doctor_list';
import { Button, Input, message } from 'antd';
import { Role } from 'xzl-web-shared/dist/src/utils/role';
import styles from './index.scss';
import { debounce } from 'lodash';
import { useSelector } from 'umi';

interface Iprops {
  children: React.ReactElement;
  role: string;
  nsId: string;
  refresh: () => void;
}
function AddGroup({ children, refresh, role, nsId }: Iprops) {
  const { projectNsId } = useSelector((state: IState) => state.project.projDetail);
  const isMainPi = role === Role.MAIN_PI.id;

  const [isShowModal, setIsShowModal] = useState(false);
  const [selectName, setSelectName] = useState('');
  const [groupName, setGroupName] = useState<string>();
  const [selectPatientId, setPatientId] = useState<string>();

  const handleHideModal = () => {
    setIsShowModal(false);
    setGroupName('');
    setSelectName('');
    setPatientId('');
  };
  const addGroup = (later?: string) => {
    if (groupName) {
      const apiParams: CommonData = {
        projectNsId,
        groupName,
        upNsId: nsId, // 父级id
        label: isMainPi ? 'research_sub_pi' : 'research_pi', // 添加的角色

      };
      if (selectPatientId && !later) {
        apiParams.doctorSId = selectPatientId;
        apiParams.role = isMainPi ?  Role.SUB_PI.id : Role.PI.id;
      }
      window.$api.research.postPiGroup(apiParams).then(() => {
        message.success('添加成功');
        handleHideModal();
        refresh();
      });
    } else {
      message.error('请输入组名');
    }

  };
  const handleChangeSelect = (params: Irecord[]) => {
    setPatientId(params[0].subjectId);
    setSelectName(params[0].name);
  };
  const handleChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGroupName(e.target.value);
  };

  return (
    <div>
      <div onClick={() => setIsShowModal(true)}>{children}</div>
      <DragModal
        wrapClassName="ant-modal-wrap-center"
        className="select-group-modal"
        width="800px"
        visible={isShowModal}
        title={`添加${isMainPi ? '分' : ''}PI组`}
        onCancel={handleHideModal}
        footer={null}
      >
        <div className={styles.add_group}>
          <div className={styles.group_name}>
            组名 <span>*</span>
            <Input value={groupName} onChange={handleChangeName} />
          </div>
          <div className={styles.group_leader}>
            请选择{`${isMainPi ? '分' : ''}PI`}
            {selectName && <span>{selectName}</span>}
          </div>
          <DoctorList
            handleChangeSelect={handleChangeSelect}
          />
          <div className={styles.later_btn}>
            还没找到相关成员？请点击左侧成员，给他发个邀请吧。
            <span onClick={() => addGroup('later')}>稍后指定</span>
          </div>
          <div className="submit-btn-style1">
            <Button onClick={handleHideModal}> 取消 </Button>
            <Button type="primary" onClick={debounce(() => addGroup(), 300)}> 完成 </Button>
          </div>
        </div>
      </DragModal>
    </div>
  );
}
export default AddGroup;
