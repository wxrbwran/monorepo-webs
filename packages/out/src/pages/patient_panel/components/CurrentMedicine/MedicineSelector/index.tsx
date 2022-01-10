import React, { useState, useEffect } from 'react';
import { Select, message, Spin } from 'antd';
import debounce from 'lodash/debounce';
import * as api from '@/services/api';
// import { medicineList } from '@/utils/tools';
import styles from './index.scss';

const { Option } = Select;

interface IProps {
  setMedicineInfo: Function;
  lItem: {
    medicine: {
      name: string;
      medicineId: string;
    }
  };
  updateStrengthInfo: Function;
  strengthInfo: {
    initNN: [],
    keyIndex: number,
    initRendersComps: [],
  }
}

function MedicineSelector(props: IProps) {
  const { lItem, strengthInfo } = props;
  const [fetching, setFetchStatus] = useState(false); // 搜索loading
  const [medicines, setMedicines] = useState<IMedicines[]>([]);
  const [rendersComps, setRendersComps] = useState<IIndexObject[]>([]);
  const [currMedicineName, setCurrMedicineName] = useState('');
  const [pageAt, setPageAt] = useState(1);
  const [keyWord, setKeyWord] = useState<string>('');
  // let NN: IMedicines[][] = [];
  const [NN, setNN] = useState<IMedicines[][]>([]);
  const [options, setOptions] = useState<any>([]);

  // 优先级序列定义列表
  const seqs: IIndexObject[] = [
    { key: 'unitStrength', placeText: '请输入单位规格', result: '' },
    { key: 'strength', placeText: '请输入规格', result: '' },
    { key: 'pkgStrength', placeText: '请输入包装规格', result: '' },
  ];
  // 最新使用的key索引计数器
  let latestKeyIndex = 0;

  /** 动态创建单位值选择框，进行渲染   */
  const createComps = (indexObj: IIndexObject | null) => {
    if (indexObj) {
      console.log('rendersCompsbefore', rendersComps);
      setRendersComps([...rendersComps, indexObj]);
      props.updateStrengthInfo({
        initNN: NN,
        keyIndex: latestKeyIndex,
        initRendersComps: [...rendersComps, indexObj],
      });
      props.setMedicineInfo({
        ...NN[NN.length - 1][0],
        id: '',
      });
      console.log('rendersComps', [...rendersComps, indexObj]);
    } else {
      props.updateStrengthInfo({
        initNN: NN,
        keyIndex: latestKeyIndex,
        initRendersComps: [...rendersComps],
      });
      props.setMedicineInfo(NN[NN.length - 1][0]);
    }
  };

  /** 数据去重 */
  const unique = (arr: IMedicines[], el: string) => {
    const res = new Map();
    return arr.filter((item) => !res.has(item[el]) && res.set(item[el], 1));
  };

  /** 按照选择条件的优先级顺序，对一个列表进行过滤和识别，识别出最优先级最高的key返回  * */
  const stepKeyObj = (l: IMedicines[]): IIndexObject | null => {
    let latestSeq: IIndexObject | null = null;
    for (let i = latestKeyIndex; i < seqs.length; i++) {
      const keyArray = Array.from(new Set(l.map((item) => item[seqs[i].key]))).filter(
        (item) => !!item,
      );
      if (keyArray.length > 1 && latestSeq === null) {
        latestSeq = seqs[i];
        latestKeyIndex = i + 1;
        break;
      }
    }
    console.log('当前索引 =》 ', latestKeyIndex, latestSeq);
    return latestSeq;
  };
  useEffect(() => {
    if (strengthInfo) {
      const { initNN, keyIndex, initRendersComps } = strengthInfo;
      latestKeyIndex = keyIndex;
      setRendersComps(JSON.parse(JSON.stringify(initRendersComps)));
      setNN(JSON.parse(JSON.stringify(initNN)));
    }
  }, []);
  // 重置当前步骤
  const reset = (k: string, index: number) => {
    let curIndex = 0;
    seqs.forEach((item, idx) => {
      if (item.key === k) {
        curIndex = idx;
      }
    });
    latestKeyIndex = curIndex;
    console.log('重置第 ', k, curIndex, ' 个框', rendersComps.length);
    // 删除当前索引之后的所有数组元素
    NN.splice(index + 1, NN.length);
    setNN([...NN]);
    rendersComps.splice(index + 1, rendersComps.length);
    setRendersComps([...rendersComps]);
  };

  /** 对递进漏斗数据源，按照指定的key过滤，栈顶数据源根据指定的key提供一个对应的value列表，以显示下拉框 * */
  const kFilter = (l: IMedicines[], k: string): string[] => {
    const tmp: string[] = l
      .filter((n) => Object.keys(n).some((e) => e === k))
      .map((item) => item[k]);
    // console.log(" 过滤当前选择框显示的值列表 " , k ,l ,tmp)
    return Array.from(new Set(tmp));
  };

  /** 对递进漏斗数据源，按照value过滤，生成下一个过滤条件要使用的数据源，压到栈顶 * */
  const vFilter = (nn: IMedicines[][], k: string, v: string) => {
    nn.push(
      nn[nn.length - 1]
        .filter((n) => Object.keys(n).some((e) => e === k))
        .filter((n) => Object.values(n).some((e) => e === v)),
    );
    console.log('nn', nn);
    setNN([...nn]);
  };

  const selectValue = (k: string, v: string, index: number) => {
    console.log('selectValue', k, v, index);
    // 重置
    reset(k, index);
    // 1.确定当前步对应的选择框 选值
    // seqs.filter(item => item.key == k)[0].result = v
    vFilter(NN, k, v);
    rendersComps[index].result = v;
    setRendersComps([...rendersComps]);
    createComps(stepKeyObj(NN[NN.length - 1]));
  };

  // 获取药品
  const fetchMedicines = (value: string, pageAtNum: number) => {
    if (value !== '') {
      // setMedicines(medicineList);
      setFetchStatus(true);
      api.medicine
        .fetchMedicines({
          name: value,
          pageSize: 50,
          pageAt: pageAtNum,
        })
        .then((res) => {
          const { medicineInfos } = res;
          if (medicineInfos.length > 0) {
            if (pageAtNum === 1) {
              setMedicines(medicineInfos);
            } else {
              setMedicines([...medicines, ...medicineInfos]);
            }
          } else if (pageAtNum === 1) {
            message.destroy();
            message.info('没有该药品!');
          }
          setFetchStatus(false);
        })
        .catch((err) => {
          setFetchStatus(false);
          console.log('err', err);
        });
    }
  };

  // 改变药品
  const changeMedicine = (value: string) => {
    setCurrMedicineName(value);
    setNN([]);
    setRendersComps([]);
  };

  useEffect(() => {
    if (currMedicineName && NN.length === 0 && rendersComps.length === 0) {
      NN.push(medicines.filter((m) => m.genericName === currMedicineName));
      setNN([...NN]);
      createComps(stepKeyObj(NN[NN.length - 1]));
    }
  }, [NN, rendersComps]);

  // 获取焦点删除当前索引之后所有元素；生成下拉框值
  const selectItem = (index: number, key: string) => {
    NN.splice(index + 1, NN.length);
    setNN([...NN]);
    setOptions(kFilter(NN[NN.length - 1], key));
  };
  const handleSearch = (val: string) => {
    if (val) {
      setMedicines([]);
      setKeyWord(val);
      setPageAt(1);
      fetchMedicines(val, 1);
    }
  };
  const handleOptionScroll = (e) => {
    const { target } = e;
    if (target.scrollTop + target.offsetHeight === target.scrollHeight) {
      // 在这里调用接口
      const nextPageAt = pageAt + 1;
      setPageAt(nextPageAt);
      fetchMedicines(keyWord, nextPageAt);
    }
  };
  return (
    <div className={styles.name}>
      <Select
        showSearch
        placeholder="添加药品"
        notFoundContent={fetching ? <Spin size="small" /> : null}
        style={{ width: 200, marginBottom: 10 }}
        onSearch={debounce((value) => handleSearch(value), 300)}
        defaultValue={lItem.medicine.name}
        onChange={(value: string) => changeMedicine(value)}
        dropdownClassName={styles.medicines}
        onPopupScroll={handleOptionScroll}
        virtual={false}
      >
        {unique(medicines, 'genericName').map((item) => (
          <Option key={item.id} value={item.genericName}>
            {item.genericName}
            <br />
            {item.company}
          </Option>
        ))}
      </Select>
      {rendersComps.map((comp, index) => (
        <Select
          key={comp.key}
          className="plan_select"
          placeholder={comp.placeText}
          style={{ width: 145, marginBottom: 10 }}
          onSelect={(value: string) => selectValue(comp.key, value, index)}
          onFocus={() => selectItem(index, comp.key)}
          value={comp.result || undefined}
        >
          {options.map((item: string) => (
            <Option key={item} value={item}>
              {item}
            </Option>
          ))}
        </Select>
      ))}
    </div>
  );
}

export default MedicineSelector;
