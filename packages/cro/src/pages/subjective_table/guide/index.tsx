import React, {useState, useEffect} from 'react';
import { Tooltip } from 'antd';
import { Link } from 'umi';
import { LeftOutlined } from '@ant-design/icons';
import create from '@/assets/img/create.svg';
import * as api from '@/services/api';
import styles from './index.scss'

interface IItem {
  id: string;
  name: string;
}
function Guide() {
  const [infos, setInfos] = useState([]);
  // 获取模板列表
  useEffect(()=> {
    api.subjective.getScaleTemplate().then((res) => {
      setInfos(res.infos);
    })
  },[])
  return (
    <div className={styles.guide}>
      <LeftOutlined className={styles.back}  onClick={() => history.go(-1)}/>
      <div className={styles.main}>
        <Link to="/subjective_table/create">
          <div className={styles.head}><img src={create} alt=""/>创建空白主观量表</div>
        </Link>
        {
          infos.length>0 && (
            <>
              <h3>精神心理、社会功能量表</h3>
              <div className={styles.template_list}>
              {
                infos.map((item: IItem, index)=>(
                  <Link to={`/subjective_table/template?tempId=${item.id}&tempName=${item.name}`} key={index}>
                    <Tooltip placement="topLeft" title={item.name}>
                      {item.name}
                    </Tooltip>
                  </Link>
                ))
              }
              </div>
            </>
          )
        }

      </div>
    </div>
  )
}

export default Guide;
