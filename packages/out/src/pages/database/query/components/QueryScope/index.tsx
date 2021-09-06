import React, { useMemo, useState, useEffect } from 'react';
import { Select } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import styles from '../../index.scss';
import { isEmpty } from 'lodash';
import * as api from '@/services/api';

const { Option } = Select;

export default () => {
  const dispatch = useDispatch()
  const { queryScope } = useSelector((state: IQuery) => state.query);
  const [projectList, setProjectList] = useState([]);
  // const [scopeType, setScopeType] = useState('allPatients');

  const fetchProjectList = () => {
     // 获取参加的临床科研实验项目
     api.overview.getProjectList(window.$storage.getItem('nsId')!).then(res => {
      setProjectList(res.projectInfos);
    });
  }

  useEffect(() => {
    // 展示按项目查询，如果此时项目列表为空，调用刷新一下项目列表
    if (projectList.length === 0) {
      fetchProjectList();
    }
  }, [])
  const handleChangeQuery = (val: string) => {
    let params: CommonData = { ...queryScope };
    // setScopeType(val);
    if (val === 'allPatients') {
      params = {}
    } else if (val === 'PROJECT_ALL') {
      params.nsLabelType = "RESEARCH_PROJECT_PATIENT";
    } else {
      params = {
        ...params,
        projectNsId: val,
      }
      if (!val) delete params.projectNsId
    }
    dispatch({
      type: 'query/setQueryScope',
      payload: params
    });
  }

  const getDefaultVal = useMemo(() => {
    return () => {
      let defaultVal = '';
      if (isEmpty(queryScope) || !queryScope.nsLabelType) {
        defaultVal = 'allPatients';
      } else {
        defaultVal = 'PROJECT_ALL'
      }
      return defaultVal;
    }
  }, [queryScope]);

  console.log('queryScope', queryScope);
  const isShowProj = queryScope.nsLabelType === 'RESEARCH_PROJECT_PATIENT';
  return (
    <div className={styles.main}>
      <div className={styles.lable}>查询范围</div>
      <div className={styles.group_value}>
        <Select defaultValue={getDefaultVal()} style={{ width: 120, marginRight: 10 }} onChange={handleChangeQuery}>
          <Option value="allPatients">全部患者</Option>
          <Option value="PROJECT_ALL">全部受试者</Option>
        </Select>
        {
          isShowProj && (
            <Select
              defaultValue=''
              style={{ width: 120 }}
              // class="m-10"
              onChange={handleChangeQuery}>
              <Option value="">全部项目</Option>
              {
                projectList.map(item => (
                  <Option value={item.projectNsId} key={item.projectSid}>{item.name}</Option>
                ))
              }
            </Select>
          )
        }
      </div>
    </div>
  )
}
