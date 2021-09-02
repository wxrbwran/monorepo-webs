import React, { useState, useEffect } from 'react';
import {
  Button, Input, Select, message,
} from 'antd';
// import { provinces } from '@/utils/tools';
import * as api from '@/services/api';
import styles from './index.scss';
// addHospital
interface Iregion {
  regionName: string;
  id: string;
}
interface Iprops {
  onCancel: () => void;
  handleSave: (name: string, id: string) => void;
}
const { Option } = Select;
export default function AddHospital({ onCancel, handleSave }: Iprops) {
  const [newHospital, setNewHospital] = useState('');
  const [disabled, setDisabled] = useState(true);
  const [province, setProvince] = useState<string | null>(null);
  const [city, setCity] = useState<string | null>(null);
  const [county, setCounty] = useState<string | null>(null);
  const [provinces, setProvinces] = useState<Iregion[]>([]);
  const [citys, setCitys] = useState<Iregion[]>([]);
  const [countys, setCountys] = useState<Iregion[]>([]);
  useEffect(() => {
    if (!!province && !!city && !!newHospital) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [province, city, newHospital]);
  const fetchAddress = (id: number, type: string) => {
    api.base.fetchAddress({ id }).then((res) => {
      switch (type) {
        case 'province':
          setProvinces(res.regions);
          break;
        case 'city':
          setCitys(res.regions);
          break;
        case 'county':
          setCountys(res.regions);
          break;
        default:
          break;
      }
    });
  };
  useEffect(() => {
    if (provinces.length === 0) {
      fetchAddress(0, 'province');
    }
  }, []);

  const handleChangeOrg = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewHospital(e.target.value);
  };
  const changeRegion = (name: string, value: any) => {
    switch (name) {
      case 'province':
        setProvince(value);
        setCity(null);
        setCounty(null);
        fetchAddress(value, 'city');
        break;
      case 'city':
        setCity(value);
        setCounty(null);
        if (value) {
          fetchAddress(value, 'county');
        }
        break;
      case 'county':
        setCounty(value);
        break;
      default:
        break;
    }
  };
  const handleSubmit = () => {
    const params = {
      name: newHospital,
      province,
      city,
      county,
    };
    api.base.addHospital(params).then((res) => {
      message.success('添加成功');
      handleSave(newHospital, res.id);
    });
  };
  const selectStyle = { width: 100, fontSize: 14 };
  return (
    <div className={styles.add_hospital}>
      <Input
        placeholder="请输入医院/医疗机构名"
        value={newHospital}
        onChange={handleChangeOrg}
      />
      <div className={styles.area}>
        <Select
          placeholder="省"
          style={selectStyle}
          onSelect={(value) => changeRegion('province', value)}
        >
          {provinces.map((val) => (
            <Option
              key={val.id}
              value={val.id}
              title={val.regionName}
            >
              {val.regionName}
            </Option>
          ))}
        </Select>
        <Select
          placeholder="市"
          style={selectStyle}
          disabled={!province}
          onSelect={(value) => changeRegion('city', value)}
        >
          <Option
            key="emptyCity"
            value=""
            title="暂不选择"
          >
            暂不选择
          </Option>
          {citys.map((val) => (
            <Option
              key={val.id}
              value={val.id}
              title={val.regionName}
            >
              {val.regionName}
            </Option>
          ))}
        </Select>
        <Select
          placeholder="县"
          style={selectStyle}
          disabled={!city}
          onSelect={(value) => changeRegion('county', value)}
        >
          <Option
            key="emptyTown"
            value=""
            title="暂不选择"
          >
            暂不选择
          </Option>
          {countys.map((val) => (
            <Option
              key={val.id}
              value={val.id}
              title={val.regionName}
            >
              {val.regionName}
            </Option>
          ))}
        </Select>
      </div>
      <div className="common__btn">
        <Button onClick={onCancel}>取消</Button>
        <Button
          type="primary"
          htmlType="submit"
          disabled={disabled}
          onClick={handleSubmit}
        >
          确定
          {!province && !city && !newHospital}
        </Button>
      </div>
    </div>
  );
}
