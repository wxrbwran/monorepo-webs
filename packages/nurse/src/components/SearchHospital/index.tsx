import React, { useState } from 'react';
import { Select, Spin } from 'antd';
import debounce from 'lodash/debounce';
import * as api from '@/services/api';
import DragModal from 'xzl-web-shared/dist/components/DragModal';
import AddHospital from './AddHospital';

interface IhospitalSubmit {
  hospitalId?: string;
  hospitalName?: string;
}
interface Iprops {
  callback: (key: string, hospital: IhospitalSubmit) => void;
  style?: object;
  placeholder?: string;
  fieldName: string;
  defaultValue?: IhospitalSubmit | undefined;
}
export interface Ihospital {
  id: string;
  name: string;
}

const { Option } = Select;
function SearchHospital({
  style, callback, fieldName, defaultValue, placeholder,
}: Iprops) {
  const initName = defaultValue ? defaultValue.hospitalName : '';
  const [hospitals, setHospitals] = useState <Ihospital[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [fetching, setFetching] = useState(false);
  const [searchEmpty, setSearchEmpty] = useState(false);
  const [hospitalName, setHospitalsName] = useState(initName);
  const [pageAt, setPageAt] = useState(1);
  const [keyWord, setKeyWord] = useState<string>('');
  const fetchHospitals = (value: string, pageAtNum: number) => {
    if (value) {
      setFetching(true);
      const params = {
        name: value,
        pageAt: pageAtNum,
        pageSize: 50,
      };
      api.base.fetchHospitals(params).then((res) => {
        setFetching(false);
        if (res.organizationInfos.length === 0 && pageAtNum === 1) {
          setSearchEmpty(true);
        }
        if (pageAtNum === 1) {
          setHospitals(res.organizationInfos);
        } else {
          setHospitals([...hospitals, ...res.organizationInfos]);
        }
      });
    }
  };
  const handleSelect = (value: string, option: any) => {
    if (value === 'unresult') {
      // 显示弹框
      setShowModal(true);
      setHospitalsName('');
    } else {
      setHospitalsName(option.children);
      callback(
        fieldName,
        {
          hospitalName: option.children,
          hospitalId: value,
        },
      );
    }
  };
  const handleSave = (name: string, id: string) => {
    setShowModal(false);
    setHospitalsName(name);
    callback(
      fieldName,
      {
        hospitalName: name,
        hospitalId: id,
      },
    );
  };
  const handleOptionScroll = (e) => {
    const { target } = e;
    if (target.scrollTop + target.offsetHeight === target.scrollHeight) {
      // 在这里调用接口
      const nextPageAt = pageAt + 1;
      setPageAt(nextPageAt);
      fetchHospitals(keyWord, nextPageAt);
    }
  };
  const handleSearch = (value: string) => {
    if (value) {
      setHospitals([]); // 处理select的option渲染叠加之前数据问题
      setKeyWord(value);
      fetchHospitals(value, 1);
      setPageAt(1);
    }
  };
  return (
    <>
      <Select
        showSearch
        placeholder={placeholder}
        showArrow={false}
        filterOption={false}
        onSearch={debounce((value) => handleSearch(value), 500)}
        onSelect={handleSelect}
        notFoundContent={fetching ? <Spin size="small" /> : null}
        style={style}
        value={hospitalName}
        onPopupScroll={handleOptionScroll}
        virtual={false}
      >
        {hospitals.map((medicine) => (
          <Option key={medicine.id} value={medicine.id}>
            {medicine.name}
          </Option>
        ))}
        <Option
          value="unresult"
          style={{ display: (hospitals.length === 0 && searchEmpty) ? 'block' : 'none' }}
        >
          未找到想要的医院
        </Option>
      </Select>
      {
        showModal && (
          <DragModal
            wrapClassName="ant-modal-wrap-center"
            width="410px"
            visible={showModal}
            title="添加机构"
            onCancel={() => setShowModal(false)}
            footer={null}
            zIndex={1011}
          >
            <AddHospital onCancel={() => setShowModal(false)} handleSave={handleSave} />
          </DragModal>
        )
      }
    </>
  );
}

SearchHospital.defaultProps = {
  style: {
    width: '100%',
  },
  defaultValue: undefined,
  placeholder: '请输入医院',
};

export default SearchHospital;
