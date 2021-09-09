import React, { useState, useEffect } from 'react';
import SideBar from '../components/side-bar';
import ChartProject from '../components/chart-project';
import Title from '../components/title';
import ChartPatient from '../components/chart-patient';
import { useSelector, useDispatch } from 'react-redux';
import * as api from '@/services/api';
import styles from '../index.scss';

interface IProps {
  location: {
    pathname: string;
  };
}

interface IState {
  project: {
    projectList: {
      name: string;
      id: string;
    }[]
  }
}

function Home(props: IProps) {
  const dispatch = useDispatch()
  const [isShowProject, setIsShowProject] = useState(false);
  const [patientChartData, setPatientChartData] = useState([]);
  const [projectChartData, setProjectChart] = useState([]);
  const projectList = useSelector((state:IState)=>state.project.projectList);

  useEffect(() => {
    api.project.getPatientStatistic().then(res => {
      let chartData = res.infos;
      if(chartData.length > 0) {
        chartData.push({
          count: Number(res.total),
          projectName: '受试者总人次'
        })
      }
      console.log('___patient', chartData)
      setPatientChartData(chartData);
    })
    api.project.getPStatistic().then(res => {
      setProjectChart(res.infos);
    })
  }, [])

  return (
    <div className={styles.home}>
      <SideBar projectList={projectList} location={props.location}/>
      <div className={styles.home_main}>
        <div className={styles.charts}>
          <div className={styles.charts_item}>
            <Title name="患者统计" time="2020-06-02  12:09:01" />
            <div className="charts_cont">
              <ChartPatient data={patientChartData} />
            </div>
          </div>
          <div className={styles.charts_item}>
            <Title name="项目统计" time="2020-06-02  12:09:01" />
            <div className="charts_cont">
              <ChartProject data={projectChartData} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
