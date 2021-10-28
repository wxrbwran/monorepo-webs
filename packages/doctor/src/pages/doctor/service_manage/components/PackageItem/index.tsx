import React, { FC } from 'react';
import iconDismiss from '@/assets/img/icon_dismiss.png';
import iconEdit from '@/assets/img/icon_edit.png';
import { defaultAvatar } from 'xzl-web-shared/src/utils/consts';
import { Popconfirm } from 'antd';
import styles from './index.scss';

interface IProps {
  showEdit?: boolean;
  handleRefresh?: () => void;
}
const PackageItem: FC<IProps> = (props) => {
  const { showEdit, handleRefresh } = props;
  const handleDel = () => {
    console.log(11);
    if (handleRefresh) {
      handleRefresh();
    }
  };
  return (
    <div className={styles.item_wrap}>
      <div className="flex justify-between mb-40">
        <div className="font-bold text-base">套餐名称</div>
        {
          showEdit && (
            <div className="flex items-center text-blue-500 pointer">
              <span className="flex items-center text-sm">
                <img className='w-16 h-16' src={iconEdit} />
                <span>编辑</span>
            </span>
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
      <div className="pl-36 flex flex-wrap mb-30">
          <div className="text-center mr-40 ml-40 mb-15">
            <img className="w-100 h-100 rounded" src={defaultAvatar} />
            <div className="mt-10 text-base font-bold">郭丽丽</div>
            <div className="text-gray-600">主管医生</div>
            <div className="text-gray-600">心之力医院</div>
          </div>
        </div>
    </div>
  );
};

export default PackageItem;
