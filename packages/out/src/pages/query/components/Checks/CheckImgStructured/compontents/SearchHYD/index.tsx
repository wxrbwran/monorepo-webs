import React, {
  FC, ReactElement, useState, useEffect, useRef,
} from 'react';
import { Select, Space } from 'antd';
import { debounce } from 'lodash';
import { useDispatch } from 'umi';
import * as api from '@/services/api';
import { getSource } from '../utils';
// 搜索大分类或者指标
const { Option } = Select;
interface IProps {
  sampleFroms: string[]; // 勾选的样本来源、检查部位
  // 选择了图片大分类或者 图片大分类+指标
  handleSelectTypeIndex: (params: ISearchDocumentItem, type?: string) => void;
  // imageId: string;
  documentType: string; // HYD JCD
  external?: boolean;
  selectResult?: (source: {}) => void;
  isLibrary?: (data: boolean) => void;
}

const SearchHYD: FC<IProps> = (props) => {
  const {
    sampleFroms, handleSelectTypeIndex, documentType, external, selectResult, isLibrary,
  } = props;
  const selectRef: any = useRef<HTMLInputElement>();
  const hiddenRef: any = useRef<HTMLInputElement>();
  const [typeList, settypeList] = useState<ISearchDocumentItem[]>([]);
  const [selectVal, setselectVal] = useState<string>();
  // const [listEmpty, setlistEmpty] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    if (isLibrary) {
      if (typeList.length == 0) {
        setselectVal(null);
        isLibrary(false);
      }
    }
  }, [typeList]);
  const handleSearch = (e: React.ChangeEvent<ReactElement>) => {
    console.log(3232, e);
    if (e) {
      const params = {
        documentType,
        sampleFroms, // 子分类名称集合
        keyWord: e,
        sourceSid: localStorage.getItem('xzl-web-doctor_sid'),
      };
      api.indexLibrary.fetchIndexSearch(params).then((res) => {
        console.log('res32322', res);
        settypeList(res.list);
        // setlistEmpty(isEmpty(res.list));
      });
    }
    console.log('typeList======>', typeList);
  };
  const handleChangeCurDocument = (doc: TIndexItem) => {
    dispatch({
      type: 'document/setCurDocument',
      payload: doc,
    });
  };

  const handleSelect = (e: string) => {
    if (e !== 'add') {
      // 这里只把选中的项返回出去，选中的大分类下的指标数据，由customIndex组件请求接口获取
      console.log('******99', typeList, e);
      handleChangeCurDocument(typeList[e]);
      if (external) {
        if (selectResult) {
          selectResult(typeList[e]);
          if (isLibrary) {
            isLibrary(true);
          }
          console.log('selectResult(typeList[e])=======>', selectResult);
        }
      } else {
        handleSelectTypeIndex(typeList[e]);
      }
      setselectVal(e);
    } else {
      setselectVal('');
      selectRef.current.blur();
      hiddenRef.current.click();
    }
  };

  // const addTypeSuccess = (params: any) => {
  //   console.log('添加大分类、指标成功', params);
  //   handleSelectTypeIndex(params, 'add');
  //   handleChangeCurDocument(params);
  // };
  return (
    <div className="flex items-center mt-10 mb-10 w-full">
      <span className="flex-shrink-0 font-bold mr-15 text-sm">化验单名称</span>
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
        style={{ width: '85%', flexShrink: 0 }}
        value={selectVal}
        ref={selectRef}
      // className="flex-shrink-0 w-11/12"
      >
        {typeList.map((item, index) => (
          <Option key={index} value={index}>
            <Space>
              <span dangerouslySetInnerHTML={{ __html: getSource(item.source, item.sourceSid) }}></span>
              <span>
                {`${item?.sampleFrom} - ${item?.type === 'DOCUMENT' ? item?.name : `${item.documentName}-${item.name}`
                }`}
              </span>
            </Space>
          </Option>
        ))}
        {/* {listEmpty && (
          <Option key="add" value="add">
            <div className="text-center text-blue-500">暂无结果，点击+添加新化验单</div>
          </Option>
        )} */}
      </Select>
      {/* 放到option里会影响select失去焦点无效，导致编辑弹框内容输入不了 */}
      {/* <EditIndex onSuccess={addTypeSuccess} source="imgAddTypeIndex">
        <input type="hidden" ref={hiddenRef} />
      </EditIndex> */}
    </div>
  );
};

export default SearchHYD;
