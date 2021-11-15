import React, { FC, useState } from 'react';
import hand from '@/assets/img/change.svg';
import DragModal from 'xzl-web-shared/src/components/DragModal';
import PackageTeamItem from '../../../../service_manage/components/PackageTeamItem';
// import PackageTeamItem, { IDataList } from '@/pages/doctor/service_manage/components/PackageTeamItem';
import { Radio, message } from 'antd';
import { btnRender } from '@/utils/button';
import { debounce } from 'lodash';
import * as api from '@/services/api';
import { useDispatch } from 'react-redux';
import styles from './index.scss';
import { formatDoctorTeams } from '@/utils/utils';

interface IProps {
  data: ISubject;
  refresh: () => void;
}
const ChangeServicePackage: FC<IProps> = (props) => {
  const [showModal, setShowModal] = useState(false);
  const [selectTeamNSId, setSelectTeamNSId] = useState(null);
  const [packages, setPackages] = useState<CommonData[]>([]);
  const { data, refresh } = props;
  console.log('fdfdfd', data);
  const dispatch = useDispatch();
  const handleChange = (e) => {
    setSelectTeamNSId(e.target.value);
  };
  const fetchPackages = () => {
    const params = {
      pageAt: 1,
      pageSize: 99999,
      teamNSLabels: ['chronic_disease_team'],
      targetNSId: data.organizationNSId,
    };
    // innerTeams表示套餐集合，members表示一个坑位的信息集合
    api.service.fetchDoctorTeams(params).then(({ teams }: { teams: any[] }) => {
      const { alone, creator } = formatDoctorTeams(teams);
      setPackages([...alone, ...creator]);
      setShowModal(true);
    });
  };
  const handleShow = () => {
    fetchPackages();

  };
  // putDoctorTeamMembersPatient
  const handleSave = () => {
    const params = {
      pwcId: data.wcId, // 患者的 wc id
      toNSId: selectTeamNSId, // 指定套餐的空间ID
      toTeamNSLabels: ['chronic_disease_team'],
    };
    api.service.putDoctorTeamMembersPatient(params).then(() => {
      message.success('操作成功');
      if (refresh) {
        refresh();
        setShowModal(false);
        // 获取侧边栏菜单列表
        dispatch({
          type: 'user/getDoctorExistedRoles',
          payload: {},
        });
      }
    }).catch(err => {
      message.error(err?.result || '操作失败');
    });
  };
  const handleCloseModal = () => {
    setShowModal(false);
    setSelectTeamNSId(null);
  };
  console.log('packages32', packages);
  return (
    <div>
      <img
        className="cursor-pointer"
        src={hand}
        alt="更换医生团队"
        onClick={handleShow}
      />
       <DragModal
        wrapClassName="ant-modal-wrap-center"
        width={1100}
        maskClosable
        visible={showModal}
        onCancel={handleCloseModal}
        title='更换服务小组'
        footer={null}
        destroyOnClose
      >
        <div className={styles.teams}>
          <Radio.Group onChange={handleChange}>
            {
              packages.filter(packageItem => packageItem.teamNSId !== data.nsId).map(item => (
                <Radio value={item.teamNSId} key={item.teamNSId}>
                  <PackageTeamItem dataList={item} />
                </Radio>
              ))
            }
          </Radio.Group>
        </div>
        {btnRender({
          okText: '确定',
          cancelText: '取消',
          onOk: debounce(handleSave, 300),
          okDisabled: !selectTeamNSId,
          onCancel: handleCloseModal,
        })}
      </DragModal>
    </div>
  );
};

export default ChangeServicePackage;
