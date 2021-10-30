import React, { FC, useEffect } from 'react';
import iconDismiss from '@/assets/img/icon_dismiss.png';
import iconEdit from '@/assets/img/icon_edit.png';
import PackageDoctorItem from '../PackageDoctorItem';
import AddServicePackage from '../AddServicePackage';
import { Popconfirm, message } from 'antd';
import * as api from '@/services/api';
import styles from './index.scss';

export interface IDataList {
  innerTeams: {
    members: ISubject[]
  }[],
  name: string; // 套餐名
  teamNSId: string; // 套餐nsid
}
interface IProps {
  showEdit?: boolean;
  handleRefresh?: () => void;
  dataList: IDataList,
}
let timer: any = null;
const PackageTeamItem: FC<IProps> = (props) => {
  const { showEdit, handleRefresh, dataList } = props;
  const { name, teamNSId, innerTeams } = dataList;
  const handleDel = () => {
    const params = {
      name,
      teamNSId,
      teamNSLabels: ['chronic_disease_team'],
    };
    api.service.deleteDoctorTeam(params).then(() => {
      message.success('解散成功');
      if (handleRefresh) {
        timer = setTimeout(() => {
          handleRefresh();
        }, 1000);
      }
    }).catch((err: { result: string }) => {
      message.error(err?.result || '解散失败');
    });
  };
  useEffect(() => {
    return () => {
      clearTimeout(timer);
    };
  }, []);
  // deleteDoctorTeam
  return (
    <div className={styles.item_wrap}>
      <div className="flex justify-between mb-40">
        <div className="font-bold text-base">{name}</div>
        {
          showEdit && (
            <div className="flex items-center text-blue-500 pointer">
              <AddServicePackage initData={dataList} onSuccess={handleRefresh!}>
                <span className="flex items-center text-sm">
                  <img className='w-16 h-16' src={iconEdit} />
                  <span>编辑</span>
                </span>
              </AddServicePackage>
              <span className="mx-10">|</span>
              <Popconfirm
                placement="leftTop"
                title={
                  <div style={{ width: 305, fontSize: 14 }}>
                    <div>解散后服务包内的患者将自动转为由你独立管理?</div>
                    <div className="text-gray-600"> 这是一个不可逆的操作，请谨慎对待</div>
                  </div>
                }
                onConfirm={handleDel}
                okText="确定"
                cancelText="取消"
              >
                <span className="flex items-center text-sm">
                  <img className='w-16 h-16' src={iconDismiss} />
                  <span>解散</span>
                </span>
              </Popconfirm>
            </div>
          )
        }
      </div>
      <div className="pl-36 flex flex-wrap mb-20">
        {
          innerTeams.map(item => <PackageDoctorItem members={item.members} />)
        }
      </div>
    </div>
  );
};

export default PackageTeamItem;
