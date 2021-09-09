import React, { useState } from 'react';
import DragModal from '@/components/DragModal';
import { PlusSquareOutlined, DeleteOutlined } from '@ant-design/icons';
import { message } from 'antd';
import * as api from '@/services/api';
import styles from './index.scss'
import CommonIssue from '../CommonIssue';
// import { InputNumberProps } from 'antd/lib/input-number';

interface IProps {
  children: React.ReactElement;
  infos: [];
  updateInfo: Function
}

function ManageIssue({children, infos, updateInfo}: IProps) {
  const [isShowModal, setIsShowModal] = useState(false);
  const handleShowGroup = () => {
    setIsShowModal(true);
  }

  const handleDel = (questionId: number) => {
    api.subjective.delCommonQuestion(questionId).then((res) => {
      message.success('删除成功')
      //更新常用问题列表
       updateInfo()
    })

  }

  return (
    <>
      <div onClick={handleShowGroup}>
        {children}
      </div>
      <DragModal
        wrapClassName="ant-modal-wrap-center"
        className={styles.list}
        width="800px"
        visible={isShowModal}
        title='管理常用问题'
        onCancel={() => setIsShowModal(false)}
        footer={null}
      >
        <ul>
          <li>
            <CommonIssue updateInfo={updateInfo}><div><PlusSquareOutlined />添加新的常用题</div></CommonIssue>
          </li>
          {
            infos.map((item:{title: string, id:number})=>(
              <li key={item.id}>
                <p>{item.title}</p>
                <p className={styles.del} onClick={()=>handleDel(item.id)}><DeleteOutlined />删除</p>
              </li>
            ))
          }
        </ul>
      </DragModal>
    </>
  )
}

export default ManageIssue;
