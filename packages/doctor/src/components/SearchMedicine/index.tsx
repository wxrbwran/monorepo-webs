import React, { FC, useState } from 'react';
import {
  Select, message, Form, Spin,
} from 'antd';
import { debounce } from 'lodash';
import * as api from '@/services/api';

const { Option } = Select;
interface IProps {
  parent: number;
  refresh: () => void;
  handleSetField: (key: string, val: any, render?: boolean) => void;
}
const SearchMedicine:FC<IProps> = (props) => {
  const { parent, refresh, handleSetField } = props;
  const [fetching, setFetching] = useState(false);
  const [medicines, setMedicines] = useState<IMedicines[]>([]);
  const [pageAt, setPageAt] = useState(1);
  const [keyWord, setKeyWord] = useState<string>('');
  const fetchMedicines = (value: string, pageAtNum: number) => {
    if (value !== '') {
      setFetching(true);
      api.medicine
        .fetchMedicines({
          name: value,
          pageSize: 50,
          pageAt: pageAtNum,
        })
        .then((res) => {
          const { medicineInfos } = res;
          if (medicineInfos.length > 0) {
            /** medicines过滤掉同名药品 */
            const name = new Map();
            const filterMedicines = medicineInfos.filter((item:IMedicines) => (
              !name.has(item.genericName) && name.set(item.genericName, 1)
            ));
            console.log('filterMedicines', filterMedicines);
            setFetching(false);
            if (pageAtNum === 1) {
              setMedicines(filterMedicines);
            } else {
              setMedicines([...medicines, ...filterMedicines]);
            }
          } else if (pageAtNum === 1) {
            setFetching(false);
            message.destroy();
            message.info('没有该药品!');
          }
        })
        .catch((err) => {
          console.log('err', err);
          setFetching(false);
          message.error('获取药品失败');
        });
    }
  };
  const handleChange = (val: string, option: { key: any; }) => {
    // handleSetField
    console.log(val);
    refresh(); // 这里刷新是为了让剂量等字段去掉disable
    handleSetField(`medicineId_${parent}`, option.key);
    console.log(option.key);
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
    <Form.Item
      name={`name_${parent}`}
      noStyle
    >
      <Select
        showSearch
        placeholder="添加药品"
        notFoundContent={fetching ? <Spin size="small" /> : null}
        style={{ width: 150 }}
        onSearch={debounce((value) => {
          handleSearch(value);
        }, 500)}
        onChange={handleChange}
        onPopupScroll={handleOptionScroll}
        virtual={false}
      >
        {medicines.map((item) => (
          <Option
            key={item.id}
            value={item.genericName}
          >
            {item.genericName}
          </Option>
        ))}
      </Select>
    </Form.Item>
  );
};

export default SearchMedicine;
