import React, { useState } from 'react';
import { Select, InputNumber, message, Spin } from 'antd';
import * as api from '@/services/api';
import styles from '../index.scss';


let timer: any = null;
const { Option } = Select;

interface IProps {
  item: {
    choseItem: {
      name: string,
      description: string,
    },
    choseValue: {
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
  const [treatments, setTreatments] = useState([]);//获取处理方式

  //获取诊断
  const fetchDiagnosis = (value: string) => {
    if (value !== '') {
      setFetchStatus(true);
      clearTimeout(timer);
      timer = setTimeout(() => {
        api.detail.fetchDiagnosis({ name: value }).then((res) => {
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
  };

  //获取处理方式
  const fetchTreatment = (value: string) => {
    if (value !== '') {
      setFetchStatus(true);
      clearTimeout(timer);
      timer = setTimeout(() => {
        api.detail.fetchTreatment({ name: value }).then((res) => {
          const { resTreatments } = res;
          if (resTreatments.length > 0) {
            setTreatments(resTreatments);
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
  };

  return (
    <>
      {
        item.choseItem.description === '年龄' && (
          <div className={styles.item_value}>
            <span className={styles.label}>范围：</span>
            <InputNumber
              min={1}
              onChange={(value: number) => {

                console.log('========= onChange min', value);
                item.choseValue.min = value;
                changeStateByValue(item);
              }}
              value={item.choseValue.min}
            />
            <span className={styles.split}>-</span>
            <InputNumber
              min={1}
              onChange={(value: number) => {

                console.log('========= onChange max', value);
                item.choseValue.max = value;
                changeStateByValue(item);
              }} value={item.choseValue.max}
            />
          </div>
        )
      }
      {
        item.choseItem.description === '诊断' && (
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
              value={item.choseValue.value}
              onChange={(value: string | number | undefined) => {

                console.log('========= onChange min', value);
                const vals = String(value).split('_zsh_');
                item.choseValue.value = vals[1];
                item.choseValue.id = vals[0];
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
        item.choseItem.description === '处理' && (
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
              value={item.choseValue.value}
              onChange={(value: string | number | undefined) => {

                console.log('========= onChange min', value);
                const vals = String(value).split('_zsh_');
                item.choseValue.value = vals[1];
                item.choseValue.id = vals[0];
                changeStateByValue(item);
              }}
            >
              {treatments.map((treItem: Ikey) => (
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
        item.choseItem.description === '性别' && (
          <div className={styles.item_value}>
            <span className={styles.label}>性别：</span>
            <Select
              style={{ width: 237, height: 40 }}
              onChange={(value: string | number) => {

                console.log('========= onChange min', value);
                item.choseValue.value = value;
                changeStateByValue(item);
              }}
              placeholder='请选择性别'
              value={item.choseValue.value}
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



// let timer: any = null;
// const { Option } = Select;
// const { TextArea } = Input;

// interface IProps {

//   label: string;
//   placeholder: string;

//   value: string,
//   onSearch: (value: string) => void;
//   options: [],
//   onChange: (value: ValueType, option: OptionsType[number] | OptionsType) => void,

//   getKey: (item: any) => string;
//   getValue: (item: any) => string;
//   getTitle: (item: any) => string;
//   getDescription: (item: any) => string;

//   changeStateByValue: Function;
// }

// function ListItem({ label, placeholder, value, onSearch, options, onChange, getKey, getValue, getTitle, getDescription }: IProps) {

//   const [fetching, setFetchStatus] = useState(false);//搜索是否显示loading

//   //获取药品
//   const fetchValue = (value: string) => {
//     if (value !== '') {
//       setFetchStatus(true);
//       clearTimeout(timer);
//       timer = setTimeout(() => {
//         onSearch(value);
//         setFetchStatus(false);
//       }, 800);
//     } else {
//       clearTimeout(timer);
//       setFetchStatus(false);
//     }
//   };


//   return (
//     <div className={styles.item_value}>
//       <span className={styles.label}>{label}</span>
//       <Select
//         showSearch
//         allowClear
//         placeholder={placeholder}
//         style={{ width: 237, height: 40 }}
//         notFoundContent={fetching ? <Spin size="small" /> : null}
//         filterOption={false}
//         onSearch={fetchValue}
//         value={value}
//         onChange={onChange}
//       >
//         {options.map((item) => (
//           <Option
//             key={getKey(item)}
//             value={getValue(item)}
//             title={getTitle(item)}
//           >
//             {getDescription(item)}
//           </Option>
//         ))
//         }
//       </Select>
//     </div>
//   );
// }

