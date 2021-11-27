import React, { useState } from 'react';
import { Select, InputNumber, message, Spin } from 'antd';
import styles from '../index.scss';
import * as api from '@/services/api';


let timer: any = null;
const { Option } = Select;

interface IProps {
  item: {
    chooseItem: {
      name: string,
      description: string,
    },
    chooseValue: {
      min: number, // 针对年龄
      max: number, // 针对年龄
      value: number | string,
      id: string,
    },
  };
  changeStateByValue: Function;
}
interface Ikey {
  id: string;
  genericName: string;
  name: string;
}
function ScaleListItem({ changeStateByValue, item }: IProps) {

  const [fetching, setFetchStatus] = useState(false);//搜索是否显示loading
  const [diagnosisList, setDiagnosis] = useState([]);//获取诊断
  const [treatmentsList, setTreatments] = useState([]);//获取处理方式

  const fetchDatas = (value: string, kp: string) => {
    if (value !== '') {
      setFetchStatus(true);
      clearTimeout(timer);
      timer = setTimeout(() => {
        api.education.fetchKvScope({ target: value, kp }).then((res) => {
          console.log('res', res);
          const { values } = res;
          if (values.length > 0) {

            if (kp == 'diagnose.disease') {
              setDiagnosis(values);
            } else {
              setTreatments(values);
            }
          } else {
            message.info('没有该诊断信息!');
          }
        })
          .catch((err: { result: string }) => {
            console.log('err', err);
          });
        setFetchStatus(false);
      }, 800);
    }
  };

  //获取诊断
  const fetchDiagnosis = (value: string) => {

    fetchDatas(value, 'diagnose.disease');
    // if (value !== '') {

    //   setFetchStatus(true);
    //   clearTimeout(timer);
    //   timer = setTimeout(() => {
    //     api.detail.fetchDiagnosis({ name: value }).then((res) => {
    //       const { diseaseInfos } = res;
    //       if (diseaseInfos.length > 0) {
    //         setDiagnosis(diseaseInfos);
    //       } else {
    //         message.info('没有该诊断信息!');
    //       }
    //     })
    //       .catch((err) => {
    //         message.error(err);
    //       });
    //     setFetchStatus(false);
    //   }, 800);
    // }
  };



  //获取处理方式
  const fetchTreatment = (value: string) => {

    fetchDatas(value, 'diagnose.treatment');

    // if (value !== '') {
    //   setFetchStatus(true);
    //   clearTimeout(timer);
    //   timer = setTimeout(() => {
    //     api.detail.fetchTreatment({ name: value }).then((res) => {
    //       const { treatments } = res;
    //       if (treatments.length > 0) {
    //         setTreatments(treatments);
    //       } else {
    //         message.info('没有治疗方式信息!');
    //       }
    //     })
    //       .catch((err) => {
    //         message.error(err);
    //       });
    //     setFetchStatus(false);
    //   }, 800);
    // }
  };

  return (
    <>
      {
        item.chooseItem.name === 'basic.age' && (
          <div className={styles.item_value}>
            <span className={styles.label}>范围：</span>
            <InputNumber
              min={1}
              onChange={(value: number) => {

                item.chooseValue.min = value;
                changeStateByValue(item);
              }}
              value={item.chooseValue.min}
            />
            <span className={styles.split}>-</span>
            <InputNumber
              min={1}
              onChange={(value: number) => {

                item.chooseValue.max = value;
                changeStateByValue(item);
              }} value={item.chooseValue.max}
            />
          </div>
        )
      }
      {
        item.chooseItem.name.includes('disease') && (
          <div className={styles.item_value}>
            <span className={styles.label}>诊断：</span>
            <Select
              showSearch
              allowClear
              placeholder="请输入诊断"
              style={{ width: 237, height: 40 }}
              notFoundContent={fetching ? <Spin size="small" /> : null}
              filterOption={false}
              onSearch={fetchDiagnosis}
              value={item.chooseValue.value}
              onChange={(value: string | number | undefined) => {

                const vals = String(value).split('_zsh_');
                item.chooseValue.value = vals[1];
                item.chooseValue.id = vals[0];
                changeStateByValue(item);
              }}
            >
              {diagnosisList.map((diaItem: Ikey) => (
                <Option
                  key={diaItem.id}
                  value={diaItem.id + '_zsh_' + diaItem.name}
                  title={diaItem.name}
                >
                  {diaItem.name}
                </Option>
              ))
              }
            </Select>
          </div>
        )
      }
      {
        item.chooseItem.name.includes('treatment') && (
          <div className={styles.item_value}>
            <span className={styles.label}>处理：</span>
            <Select
              showSearch
              allowClear
              placeholder="请输入处理方式"
              style={{ width: 237, height: 40 }}
              notFoundContent={fetching ? <Spin size="small" /> : null}
              filterOption={false}
              onSearch={fetchTreatment}
              value={item.chooseValue.value}
              onChange={(value: string | number | undefined) => {

                const vals = String(value).split('_zsh_');
                item.chooseValue.value = vals[1];
                item.chooseValue.id = vals[0];
                changeStateByValue(item);
              }}
            >
              {treatmentsList.map((treItem: Ikey) => (
                <Option
                  key={treItem.id}
                  value={treItem.id + '_zsh_' + treItem.name}
                  title={treItem.name}
                >
                  {treItem.name}
                </Option>
              ))
              }
            </Select>
          </div>
        )
      }
      {
        item.chooseItem.description === '性别' && (
          <div className={styles.item_value}>
            <span className={styles.label}>性别：</span>
            <Select
              style={{ width: 237, height: 40 }}
              onChange={(value: string | number) => {

                item.chooseValue.value = value;
                changeStateByValue(item);
              }}
              placeholder='请选择性别'
              value={item.chooseValue.value}
            >
              <Option value={'男'}>男</Option>
              <Option value={'女'}>女</Option>
            </Select>
          </div>
        )
      }
    </>
  );
}

export default ScaleListItem;



