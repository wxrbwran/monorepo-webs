import React, { useState } from 'react';
import { Select, InputNumber, message, Spin, Input, Tooltip } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';
import { IConItem } from '@/utils/tools';
import * as api from '@/services/api';
import styles from '../index.scss';

let timer:any = null;
const { Option } = Select;
const { TextArea } = Input;

interface IProps{
  changeStateByValue: Function;
  planIndex: number;
  planItem: IConItem;
  type: string;
}
interface Ikey {
  id: string;
  genericName: string;
  name: string;
}
function ListItem({ changeStateByValue, planIndex, planItem, type }:IProps) {

  const [fetching, setFetchStatus] = useState(false);//搜索是否显示loading
  const [medicineList, setMedicines] = useState([]);//获取药品
  const [diagnosisList, setDiagnosis] = useState([]);//获取诊断
  const [treatments, setTreatments] = useState([]);//获取处理方式

  //获取药品
  const fetchMedicines = (value: string) => {
    if (value !== '') {
      setFetchStatus(true);
      clearTimeout(timer);
      timer = setTimeout(() => {
        api.detail.fetchMedicines({
          name: value,
          pageSize: 9999,
          pageAt: 1,
        }).then((res) => {
          const { medicineInfos } = res;
          if (medicineInfos.length > 0) {
            setMedicines(medicineInfos);
          } else {
            message.info('没有该药品!');
          }
        })
        .catch((err) => {
          message.error(err);
        });
        setFetchStatus(false);
      }, 800);
    } else {
      clearTimeout(timer);
      setFetchStatus(false);
    }
  }

  //获取诊断
  const fetchDiagnosis = (value: string) => {
    if (value !== '') {
      setFetchStatus(true);
      clearTimeout(timer);
      timer = setTimeout(() => {
        api.detail.fetchDiagnosis({name: value}).then((res) => {
          const { diseaseInfos } = res;
          if (diseaseInfos.length > 0) {
            setDiagnosis(diseaseInfos);
          } else {
            message.info('没有该诊断信息!');
          }
        })
        .catch((err) => {
          message.error(err);
        });
        setFetchStatus(false);
      }, 800);
    }
  }

  //获取处理方式
  const fetchTreatment = (value: string) => {
    if (value !== '') {
      setFetchStatus(true);
      clearTimeout(timer);
      timer = setTimeout(() => {
        api.detail.fetchTreatment({name: value}).then((res) => {
          const { treatments } = res;
          if (treatments.length > 0) {
            setTreatments(treatments);
          } else {
            message.info('没有治疗方式信息!');
          }
        })
        .catch((err) => {
          message.error(err);
        });
        setFetchStatus(false);
      }, 800);
    }
  }

  const { send, minAge, maxAge, sex, diagnosis, medicines, treatment, other } = planItem.detail;
  return (
    <>
      {
        send === 'AGE' && (
          <div className={styles.item_value}>
            <span className={styles.label}>范围：</span>
            <InputNumber
              min={1}
              onChange={(value: string|number|undefined) => changeStateByValue('minAge', planIndex, value)}
              value={minAge}
            />
            <span className={styles.split}>-</span>
            <InputNumber
              min={1}
              onChange={(value: string|number|undefined) => changeStateByValue('maxAge', planIndex, value) }
              value={maxAge}
            />
          </div>
        )
      }
      {
        send === 'MEDICINE' && (
          <div className={styles.item_value}>
            <span className={styles.label}>用药：</span>
            <Select
              showSearch
              allowClear
              placeholder="请输入药名"
              style={{ width: 237, height:  40}}
              notFoundContent={fetching ? <Spin size="small" /> : null}
              filterOption={false}
              onSearch={fetchMedicines}
              value={medicines}
              onChange={(value: string) => { changeStateByValue('medicines', planIndex, value) }}
            >
              {medicineList.map((item:Ikey) => (
                <Option
                  key={item.id}
                  value={item.genericName}
                  title={item.genericName}
                >
                  {item.genericName}
                </Option>
              ))
              }
            </Select>
          </div>
        )
      }
      {
        send === 'DIAGNOSIS' && (
          <div className={styles.item_value}>
            <span className={styles.label}>诊断：</span>
            <Select
              showSearch
              allowClear
              placeholder="请输入诊断"
              style={{ width: 237, height:  40}}
              notFoundContent={fetching ? <Spin size="small" /> : null}
              filterOption={false}
              onSearch={fetchDiagnosis}
              value={diagnosis}
              onChange={(value: string) => { changeStateByValue('diagnosis', planIndex, value) }}
            >
              {diagnosisList.map((item:Ikey) => (
                <Option
                  key={item.id}
                  value={item.name}
                  title={item.name}
                >
                  {item.name}
                </Option>
              ))
              }
            </Select>
          </div>
        )
      }
      {
        send === 'TREATMENT' && (
          <div className={styles.item_value}>
            <span className={styles.label}>处理：</span>
            <Select
              showSearch
              allowClear
              placeholder="请输入处理方式"
              style={{ width: 237, height:  40}}
              notFoundContent={fetching ? <Spin size="small" /> : null}
              filterOption={false}
              onSearch={fetchTreatment}
              value={treatment}
              onChange={(value: string) => { changeStateByValue('treatment', planIndex, value) }}
            >
              {treatments.map((item:Ikey) => (
                <Option
                  key={item.id}
                  value={item.name}
                  title={item.name}
                >
                  {item.name}
                </Option>
              ))
              }
            </Select>
          </div>
        )
      }
      {
        send === 'BASE' && (
          <div className={styles.item_value}>
            <span className={styles.label}>性别：</span>
            <Select
              style={{ width: 237, height:  40}}
              onChange={(value: string) => { changeStateByValue('sex', planIndex, value) }}
              placeholder='请选择性别'
              value={sex}
            >
              <Option value={1}>男</Option>
              <Option value={0}>女</Option>
            </Select>
          </div>
        )
      }
      {
        send === 'OTHER' && (
          <div className={styles.item_value}>
            {/* <span className={styles.label}>自定义：</span> */}
            <Input.TextArea
              placeholder="请输入自定义内容"
              autoSize={{ minRows: 2, maxRows: 6 }}
              style={{ width: '100%', fontSize: 14}}
              onChange={(e: { target: { value: string } }) => { changeStateByValue('other', planIndex, e.target.value) }}
              value={other}
            />
            <Tooltip placement="topRight" title={`自定义${type}后将不会为您筛选患者`}>
              <QuestionCircleOutlined />
            </Tooltip>
          </div>
        )
      }
    </>
  )
}

export default ListItem;
