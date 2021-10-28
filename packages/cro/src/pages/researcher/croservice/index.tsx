import React from 'react';
import { Divider } from 'antd';
import edit from '@/assets/img/edit.svg';
import remove from '@/assets/img/remove.svg';
import avatar from '@/assets/img/default_project.png';
import styles from './index.scss';
import { Button } from 'antd';
import AddServicePackage from './components/AddServicePackage';

function croservice() {

  return (
    <div className={styles.croservice}>
      <AddServicePackage>
        <Button type="primary" className="mb-20">+ 添加新团队</Button>
      </AddServicePackage>

      <div className={`${styles.member} py-15 px-20 mb-15`}>
        <div className='flex justify-between text-base mb-50'>
          <div className='font-bold'>套餐名称1</div>
          <div className={`${styles.operator} flex items-center`}>
            <p><img src={edit} className='mr-5' />编辑</p>
            <Divider type="vertical" />
            <p><img src={remove} className='mr-5' />解散</p>
          </div>
        </div>
        <div className='flex'>
          <div className='text-center text-base mx-40'>
            <p className={styles.avatar}><img src={avatar} /></p>
            <p className='font-bold mb-5 mt-20'>郭雅丽</p>
            <p className='text-sm'>主管医生</p>
          </div>
          <div className='text-center text-base mx-40'>
            <p className={styles.avatar}><img src={avatar} /></p>
            <p className='font-bold mb-5 mt-20'>郭雅丽</p>
            <p className='text-sm'>主管医生</p>
          </div>
        </div>
      </div>
      <div className={`${styles.member} py-15 px-20`}>
        <div className='flex justify-between text-base mb-50'>
          <div className='font-bold'>套餐名称1</div>
          <div className={`${styles.operator} flex items-center`}>
            <p><img src={edit} className='mr-5' />编辑</p>
            <Divider type="vertical" />
            <p><img src={remove} className='mr-5' />解散</p>
          </div>
        </div>
        <div className='flex'>
          <div className='text-center text-base mx-40'>
            <p className={styles.avatar}><img src={avatar} /></p>
            <p className='font-bold mb-5 mt-20'>郭雅丽</p>
            <p className='text-sm'>主管医生</p>
          </div>
          <div className='text-center text-base mx-40'>
            <p className={styles.avatar}><img src={avatar} /></p>
            <p className='font-bold mb-5 mt-20'>郭雅丽</p>
            <p className='text-sm'>主管医生</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default croservice;
