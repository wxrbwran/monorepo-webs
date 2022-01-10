import React, { useState } from 'react';
import { Input } from 'antd';
import DragModal from 'xzl-web-shared/dist/components/DragModal';
import styles from './index.scss';

interface IProps {
  children: string;
  record: {
    name: string;
    tel: string;
    subjectDetail: { practiceAreas: any[] };
    sex: string;
    joinTime: number;
    provinceName: string;
    status: string;
    title: string;
    patientCount: number;
    person: string;
    groupName: string;
    role: string;
  };
}

function MemberDetail({ children, record }: IProps) {

  console.log('============================ MemberDetail MemberDetail record', JSON.stringify(record));
  const { name, tel, subjectDetail, sex, joinTime, provinceName, status, title, patientCount, groupName, role } = record;
  const [isShowModal, setIsShowModal] = useState(false);
  const handleShowGroup = () => {
    setIsShowModal(true);
  };

  const baseInfo = [
    {
      key: name,
      value: '姓名',
    }, {
      key: tel,
      value: '手机号',
    }, {
      key: subjectDetail?.practiceAreas ? subjectDetail.practiceAreas.map((item) => {
        return (item?.name ?? '');
      }).join(';') : '--'
      ,
      value: '中心',
    }, {
      key: sex,
      value: '性别',
    }, {
      key: joinTime,
      value: '加入时间',
    }, {
      key: provinceName,
      value: '城市',
    }, {
      key: status,
      value: '状态',
    }, {
      key: title,
      value: '职称',
    }, {
      key: patientCount,
      value: '受试者人数',
    },
  ];
  const otherInfo = [
    {
      key: groupName,
      value: '所在分组',
    }, {
      key: role,
      value: '角色',
    },
  ];
  return (
    <>
      <span
        onClick={handleShowGroup}
        className={styles.text}
      >{children}</span>
      <DragModal
        wrapClassName="ant-modal-wrap-center"
        width="800px"
        visible={isShowModal}
        title={`${name}详细信息`}
        onCancel={() => setIsShowModal(false)}
        footer={null}
      >
        <div className={styles.info}>
          <ul>
            {
              baseInfo.map((item, index) => (
                <li key={index}>
                  <label htmlFor="name">{item.value}</label>
                  <Input
                    value={item.key || '--'}
                    disabled
                  />
                </li>
              ))
            }
          </ul>
          <div className={styles.split}>工作信息</div>
          <ul>
            {
              otherInfo.map((item, index) => (
                <li key={index} style={{ flex: '100%' }}>
                  <label htmlFor="name">{item.value}</label>
                  <Input
                    value={item.key}
                    disabled
                  />
                </li>
              ))
            }
          </ul>
        </div>
      </DragModal>
    </>
  );
}

export default MemberDetail;
