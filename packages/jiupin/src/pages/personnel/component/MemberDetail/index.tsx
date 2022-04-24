import React, { useState, FC, useEffect } from 'react';
import DragModal from 'xzl-web-shared/dist/components/DragModal';
import { Descriptions } from 'antd';
import { sexList } from 'xzl-web-shared/dist/utils/consts';
import config from '@/config';
import { MobileOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';

interface IProps {
  wcId: string;
}
interface IUserInfo {
  ns: {
    id: string;
    name: string;
  },
  roles: {
    id: string;
    name: string;
    subject: ISubject;
    roleTags: {
      name: string;
      id: string;
    }[]
  }[]
}
const MemberDetail: FC<IProps> = (props) => {
  const { children, wcId } = props;
  const [userInfo, setUserInfo] = useState<IUserInfo>({});
  const [show, setShow] = useState<boolean>(false);
  const fetchUserInfo = () => {
    window.$api.user.getUserInfo({ wcIds: [wcId] }).then((res: { wcl :Iwcl[] }) => {
      if (res.wcl[0]?.roles?.[0]?.subject) {
        // setUserInfo(res.wcl[0].roles[0].subject);
        setUserInfo(res.wcl[0]);
      }
    });
  };
  useEffect(() => {
    if (show) {
      fetchUserInfo();
    }
  }, [show]);

  const uInfo = userInfo?.roles?.[0]?.subject || {};
  console.log('userInfo', userInfo);
  console.log('uInfo', uInfo);
  return (
    <>
      <div style={{ display: 'inline' }} onClick={() => setShow(!show)}>
        {children}
      </div>
      {
        <DragModal
        width={800}
        visible={show}
        maskClosable
        centered
        title="查看详情"
        destroyOnClose
        footer={false}
        onCancel={() => setShow(false)}
      >
        <div className='flex mb-25'>
          <img className='w-64 h-64 mr-20' src={uInfo?.avatarUrl || config.memberAvatar} />
          <div>
            <div className='font-bold text-base my-5'>{uInfo.name}</div>
            <div><MobileOutlined />手机号: {uInfo.tel}</div>
          </div>
        </div>
        <Descriptions column={8}>
          <Descriptions.Item labelStyle={{ color:'#969696' }} label="身份证号" span={3}>{uInfo?.idNum || '--'}</Descriptions.Item>
          <Descriptions.Item labelStyle={{ color:'#969696' }} label="性别" span={2}>{sexList?.[uInfo?.sex] || '--'}</Descriptions.Item>
          <Descriptions.Item labelStyle={{ color:'#969696' }} label="出生日期" span={3}>
            {uInfo?.birthday ? dayjs(uInfo?.birthday).format('YYYY-MM-DD') : '--'}
          </Descriptions.Item>

          <Descriptions.Item labelStyle={{ color:'#969696' }} label="紧急联系人" span={3}>{uInfo?.emergencyName || '--'}</Descriptions.Item>
          <Descriptions.Item labelStyle={{ color:'#969696' }} label="紧急联系方式" span={5}>{uInfo?.emergencyTel || '--'}</Descriptions.Item>

          <Descriptions.Item labelStyle={{ color:'#969696' }} label="家庭住址" span={8}>
            {uInfo?.address}
            {uInfo?.detailAddress || '--'}
            </Descriptions.Item>
        </Descriptions>
      </DragModal>
      }
    </>
  );
};

export default MemberDetail;
