import React, { useState, FC, useEffect } from 'react';
import DragModal from 'xzl-web-shared/dist/components/DragModal';
import { Descriptions, Button } from 'antd';
import EditDetail from './EditDetail';
import { sexList } from 'xzl-web-shared/dist/utils/consts';
import dayjs from 'dayjs';

interface IProps {
  refresh: () => void;
  name: string;
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
    nroleTags: {
      name: string;
      id: string;
    }[]
  }[]
}
const ServicePersonnelDetail: FC<IProps> = (props) => {
  const { children, refresh, name, wcId } = props;
  const [userInfo, setUserInfo] = useState<IUserInfo>({});
  const [isEdit, setIsEdit] = useState(false);
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
  const onEditClose = (isRefresh?: boolean) => {
    if (isRefresh) {
      refresh();
      setShow(false);
    }
    setIsEdit(false);
  };
  const uInfo = userInfo?.roles?.[0]?.subject || {};
  const handleClose = () => {
    setIsEdit(false);
    setShow(false);
  };
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
        title={name}
        destroyOnClose
        footer={false}
        onCancel={handleClose}
      >
        {
          isEdit ? (
            <EditDetail
              userInfo={uInfo}
              userAllInfo={userInfo}
              onClose={onEditClose}
            />
          ) : (
            <div>
              <Descriptions title={<div className='text-blue-500'>基本信息</div>}>
                <Descriptions.Item labelStyle={{ color:'#969696' }} label="姓名">{uInfo?.name || '--'}</Descriptions.Item>
                <Descriptions.Item labelStyle={{ color:'#969696' }} label="手机号">{uInfo?.tel || '--'}</Descriptions.Item>
                <Descriptions.Item labelStyle={{ color:'#969696' }} label="角色">
                  {userInfo?.roles?.[0]?.nroleTags && userInfo?.roles?.[0]?.nroleTags.map(item => item.name).join('、')}
                </Descriptions.Item>
              </Descriptions>
              <Descriptions title={<div className='text-blue-500'>档案信息</div>} column={8}>
                <Descriptions.Item labelStyle={{ color:'#969696' }} label="身份证号" span={3}>{uInfo?.idNum || '--'}</Descriptions.Item>
                <Descriptions.Item labelStyle={{ color:'#969696' }} label="年龄" span={1}>{uInfo?.age || '--'}</Descriptions.Item>
                <Descriptions.Item labelStyle={{ color:'#969696' }} label="性别" span={1}>{sexList?.[uInfo?.sex] || '--'}</Descriptions.Item>
                <Descriptions.Item labelStyle={{ color:'#969696' }} label="出生日期" span={3}>
                  {uInfo?.birthday ? dayjs(uInfo?.birthday).format('YYYY-MM-DD') : '--'}
                </Descriptions.Item>
                <Descriptions.Item labelStyle={{ color:'#969696' }} label="现住址" span={8}>
                  {uInfo?.address}
                  {uInfo?.detailAddress || '--'}
                  </Descriptions.Item>
                <Descriptions.Item labelStyle={{ color:'#969696' }} label="开户行及银行卡号：" span={8}>{uInfo?.bankName} {uInfo?.bankCardNum || '--'}</Descriptions.Item>
                <Descriptions.Item labelStyle={{ color:'#969696' }} label="工作经历" span={8}>{uInfo?.biography || '--'}</Descriptions.Item>
              </Descriptions>
              <div className="common__btn">
                <Button onClick={() => setShow(false)}>取消</Button>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="finish"
                  onClick={() => setIsEdit(true)}
                >
                  修改资料
                </Button>
              </div>
            </div>
          )
        }
      </DragModal>
      }
    </>
  );
};

export default ServicePersonnelDetail;
