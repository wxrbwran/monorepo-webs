import React, { useState } from 'react';
import DragModal from 'xzl-web-shared/dist/components/DragModal';
import DoctorList, { Irecord } from '../doctor_list';
import { Button, message } from 'antd';
import { useSelector } from 'umi';
import styles from '../add_group/index.scss';

interface Iprops {
  children: React.ReactElement;
  role: string;
  nsId: string;
  refresh: () => void;
}
function AddResearcher({ children, refresh, nsId }: Iprops) {
  const { projectNsId } = useSelector((state: IState) => state.project.projDetail);

  const [isShowModal, setIsShowModal] = useState(false);
  const [selectName, setSelectName] = useState<string[]>([]);
  const [selectPatientId, setPatientId] = useState<string[]>([]);

  const handleHideModal = () => {
    setIsShowModal(false);
    setPatientId([]);
    setSelectName([]);
  };
  const addGroup = (later?: string) => {
    const apiParams: CommonData = {
      projectNsId,
      groupId: nsId,
    };
    if (selectPatientId && !later) {
      apiParams.doctorSIds = selectPatientId;
    }
    window.$api.research.postGroupDoctor(apiParams).then(() => {
      message.success('添加成功');
      handleHideModal();
      refresh();
    });
  };
  const handleChangeSelect = (params: Irecord[]) => {
    const ids: string[] = [];
    const names: string[] = [];
    params.forEach((item: Irecord) => {
      ids.push(item.subjectId);
      names.push(item.name);
    });
    setPatientId(ids);
    setSelectName(names);
  };

  return (
    <div>
      <div onClick={() => setIsShowModal(true)}>{children}</div>
      <DragModal
        wrapClassName="ant-modal-wrap-center"
        className="select-group-modal"
        width="800px"
        visible={isShowModal}
        title={'添加研究者'}
        onCancel={handleHideModal}
        footer={null}
      >
        <div className={styles.add_group}>
          <div className={styles.group_leader}>
            请选择研究者
            { selectName.map(item =>  <span key={item}>{item}</span> )}
          </div>
          <DoctorList
            handleChangeSelect={handleChangeSelect}
            type="checkbox"
          />
          <div className="submit-btn-style1">
            <Button onClick={handleHideModal}> 取消 </Button>
            <Button type="primary" onClick={() => addGroup()}> 完成 </Button>
          </div>
        </div>
      </DragModal>
    </div>
  );
}
export default AddResearcher;
