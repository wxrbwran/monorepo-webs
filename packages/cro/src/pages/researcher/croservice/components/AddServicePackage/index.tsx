import React, { FC, useState, useEffect } from 'react';
import DragModal from 'xzl-web-shared/src/components/DragModal';
import { Input, Button } from 'antd';
import iconClose from '@/assets/img/icon_close.png';
import iconAdd from '@/assets/img/icon_add_large.png';
import ChoiceDoctor from '../ChoiceDoctor';
import { defaultAvatar } from 'xzl-web-shared/src/utils/consts';
import styles from './index.scss';
import * as api from '@/services/api';
import { handleRelatedDoctorsDataSource } from 'xzl-web-shared/src/components/XzlTable/util';
// import { Role } from 'xzl-web-shared/src/utils/role';

interface IMemberProps {

  title: string;
  members: any[];
  editable: boolean;
  friends: any[];
}
const Member: FC<IMemberProps> = ({ title, members, editable, friends }) => {

  const handleChoice = (type: string, doctor: any) => {
    console.log('勾选医生', type, doctor);
  };

  const onRemove = (item: any, index: number) => {
    console.log('移除', item, index);
  };

  console.log('======fetchDoctorFriends==', JSON.stringify(members));


  return (
    <div className="mt-20">
      <div className="text-base font-bold mb-10">{title}</div>

      <div className="flex flex-wrap">
        {
          members.map((item, index) => (
            <div className="box-shadow relative w-160 h-188 text-center rounded-md mr-20">
              {
                editable &&
                <img className="absolute right-10 top-10 w-14" src={iconClose} alt="" onClick={() => { onRemove(item, index); }} />
              }
              <img className="w-80 h-80 rounded mt-30" src={item.avatarUrl ?? defaultAvatar} alt="" />
              <div className="text-lg font-bold mt-5">{item.name ?? ''}</div>
              <div className={`text-gray-600 ${styles.org_name}`} title="xxx">{item.orgs ? item.orgs.map((it) => it.name).join(' ') : ''}</div>
            </div>
          ))
        }
        {
          editable && members.length !== friends.length && <ChoiceDoctor members={members} friends={friends} role="助手" handleChoice={handleChoice}>
            <div className="flex items-center justify-center box-shadow w-160 h-188 rounded-md">
              <img src={iconAdd} alt="" />
            </div>
          </ChoiceDoctor>
        }
      </div>
    </div>
  );
};


interface IProps {

}
const AddServicePackage: FC<IProps> = (props) => {
  const { children } = props;
  const [showModal, setshowModal] = useState(true);
  const handleShowModal = () => {
    setshowModal(true);
  };

  const [friends, setfriends] = useState([]);
  const doctorSid = localStorage.getItem('xzl-web-doctor_sid');
  const handleFetchFriends = () => {

    // Role.CRO_PM.id

    // CRO_PM:  
    // CRO_CRA:  
    // CRO_CRC: 

    api.service.fetchDoctorFriends().then(res => {
      setfriends(handleRelatedDoctorsDataSource(res.teams));
    });
  };
  useEffect(() => {
    handleFetchFriends();
  }, []);
  // const handleChoice = (type: string, doctor: any) => {
  //   console.log('勾选医生', type, doctor);
  // };
  return (
    <div>
      <div onClick={handleShowModal}>{children}</div>
      <DragModal
        wrapClassName="ant-modal-wrap-center cancel_text_blue"
        width={1000}
        maskClosable
        visible={showModal}
        onCancel={() => setshowModal(false)}
        title="添加新团队"
        footer={null}
        destroyOnClose
      >
        <div className={styles.add_service}>
          <Input className={styles.package_name} placeholder="请输入服务包名称" />
          <Member title='研究者' members={friends.filter(item => item?.sid === doctorSid)} editable={false} friends={friends}></Member>
          <Member title='CRC' members={[]} editable={true} friends={friends}></Member>
          <Member title='CRA' members={[]} editable={true} friends={friends}></Member>
          <Member title='PM' members={[]} editable={true} friends={friends}></Member>
          <Button className="w-98 mt-20 mb-0 mx-auto block" type="primary">完成</Button>
        </div>
      </DragModal>
    </div>
  );
};

export default AddServicePackage;



