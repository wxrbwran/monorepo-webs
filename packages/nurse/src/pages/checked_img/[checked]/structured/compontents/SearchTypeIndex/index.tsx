import React, {
  FC, ReactElement, useState, useRef,
} from 'react';
import { Select, message } from 'antd';
import { debounce } from 'lodash';
import { ISearchDocumentItem } from 'typings/imgStructured';
import * as api from '@/services/api';
// 搜索大分类或者指标
const { Option } = Select;
interface IProps {
  sampleFroms: string[]; // 勾选的样本来源、检查部位
  handleSelectTypeIndex: (params: ISearchDocumentItem) => void; // 选择了图片大分类或者 图片大分类+指标
  // imageId: string;
  documentType: string; // HYD JCD
}

const SearchTypeIndex: FC<IProps> = (props) => {
  const {
    sampleFroms, handleSelectTypeIndex, documentType,
  } = props;
  const selectRef:any = useRef<HTMLInputElement>();
  const [typeList, settypeList] = useState<ISearchDocumentItem[]>([]);
  const [selectVal, setselectVal] = useState<string>();
  const handleSearch = (e: React.ChangeEvent<ReactElement>) => {
    console.log(3232, e);
    if (e) {
      const params = {
        documentType,
        sampleFroms, // 子分类名称集合
        keyWord: e,
        sourceSid: window.$storage.getItem('sid'),
        source: 'SYSTEM',
      };
      api.indexLibrary.fetchIndexSearch(params).then((res) => {
        settypeList(res.list);
        if (res.list.length === 0) {
          message.success('查询为空');
        }
      });
    }
  };
  const handleSelect = (e: string) => {
    handleSelectTypeIndex(typeList[e]);
    setselectVal(e);
  };

  return (
    <div className="mt-10 mb-10">
      <Select
        showSearch
        placeholder="输入化验单名称，如血常规，支持首字母缩写"
        defaultActiveFirstOption={false}
        showArrow={false}
        filterOption={false}
        onSearch={debounce((value) => {
          handleSearch(value);
        }, 500)}
        onSelect={handleSelect}
        notFoundContent={null}
        style={{ width: '100%' }}
        value={selectVal}
        ref={selectRef}
      >
        {
          typeList.map((item, index) => (
            <Option key={item.showName + item.indexId} value={index}>
              {`${item?.sampleFrom} - ${item?.documentName}${item?.name ? ` - ${item?.name}` : ''}`}
            </Option>
          ))
        }

      </Select>
    </div>
  );
};

export default SearchTypeIndex;
