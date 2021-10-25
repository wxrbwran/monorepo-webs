import React, { FC } from 'react';
import female from '@/assets/img/icon_female.svg';
import male from '@/assets/img/icon_male.svg';
import styles from './index.scss';

const MemberItem: FC = () => {
  const sex = [male, female];
  return (
    <div className={`mt-10 p-15 rounded-md ${styles.item}`}>
      <div className="flex items-start mb-14">
        <img className="w-60 h-60 mr-15 rounded-md" src="https://xzl-user-avatar.oss-cn-hangzhou.aliyuncs.com/dev/0/edd33d00-5b5e-4a10-b28d-607b4778a8dc" alt="医生头像" />
        <div>
          <div className="flex items-center  mt-10">
            <span className="text-lg font-bold">李医生</span>
            <img src={sex[1]} alt="男" />
          </div>
          <div className="text-gray-500">
            心内科 | 主任医师
          </div>
        </div>
      </div>
      <div className="flex">
        <div className={`text-gray-500 mr-10 ${styles.title}`}>角色标签:</div>
        <div>
          <span className={styles.role_tag}>主管医生</span>
          <span className={styles.role_tag}>CRC</span>
        </div>
      </div>
      <div className="flex my-12">
        <div className={`text-gray-500 mr-10 ${styles.title}`}>执业医院:</div>
        <div>
          <span className="mr-20">梅州市人民医院</span>
          <span className="mr-20">梅州市人民医院</span>
          <span className="mr-20">梅州市人民医院</span>
        </div>
      </div>
      <div className="flex">
        <div className={`text-gray-500 mr-10 ${styles.title}`}>互联网医院:</div>
        <div>
          <span className="mr-20">梅州市人民医院</span>
        </div>
      </div>
    </div>
  );
};

export default MemberItem;
