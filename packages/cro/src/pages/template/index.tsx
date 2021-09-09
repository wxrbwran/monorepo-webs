import React, {useState, useEffect} from 'react';
import { Link } from 'umi';
import * as api from '@/services/api';
import more from '@/assets/img/more.svg'
import dayjs from 'dayjs';
import styles from './index.scss'
import { message } from 'antd';

interface IItem {
  id: string;
  name: string;
  createAt: string;
}

function Template() {
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [infos, setInfos] = useState([]);
  const hideOperate = () => {
    setCurrentIndex(-1);
  }
  useEffect(()=>{
    document.addEventListener('click', hideOperate);
    return () => {
      document.removeEventListener('click', hideOperate);
    }
  },[])

  const getScaleTemplate = () => {
    api.subjective.getScaleTemplate().then((res) => {
      setInfos(res.infos);
    })
  }

  //获取模板列表
  useEffect(()=> {
    getScaleTemplate();
  },[])

  const setIndex = (e:React.MouseEvent<HTMLDivElement, MouseEvent>, index: number) => {
    e.nativeEvent.stopImmediatePropagation();
    setCurrentIndex(index)
  }

  //删除模板
  const onDelete = (templateId: string) => {
    api.subjective.delScaleTemplate(templateId).then((res) => {
      message.success('删除成功');
      getScaleTemplate();
    })
  }

  return (
    <div className={styles.template}>
      <Link to={`/subjective_table/create?isTemp=${true}`}>
        <div className={styles.create}>
          创建新模板
        </div>
      </Link>
      {
        infos.length>0 && (
          <>
            <h3>全部项目</h3>
            <ul>
            {
              infos.map((item: IItem, index)=>(
                <li key={index}>
                  <p className={styles.name}>{item.name}</p>
                  <div onClick={(e) => setIndex(e, index)}>
                    <p>{dayjs(item.createAt).format('YYYY-MM-DD HH:mm')}</p>
                    {/* <p className={styles.text}>创建</p> */}
                    <p><img src={more}/></p>
                  </div>
                  <div className={currentIndex === index ? `${styles.operate} ${styles.active}` : styles.operate}>
                    <Link to={`/subjective_table/create?isTemp=${true}&tempId=${item.id}&modifyTemp=${true}`}>
                      <p>修改</p>
                    </Link>
                    <p onClick={() => onDelete(item.id)}>删除</p>
                  </div>
                </li>
              ))
            }
            </ul>
          </>
        )
      }

    </div>
  )
}

export default Template;
