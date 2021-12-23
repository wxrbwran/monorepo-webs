import React, {
  FC, ReactElement, useState, useRef,
} from 'react';
import { Select, Space } from 'antd';
import { debounce, isEmpty } from 'lodash';
import { useDispatch } from 'umi';
import EditIndex from '@/components/EditIndex';
import iconGf from '@/assets/img/icon_official.png';
import * as api from '@/services/api';
// 搜索大分类或者指标
const { Option } = Select;
interface IProps {
  sampleFroms: string[]; // 勾选的样本来源、检查部位
  // 选择了图片大分类或者 图片大分类+指标
  handleSelectTypeIndex: (params: ISearchDocumentItem, type?: string) => void;
  // imageId: string;
  documentType: string; // HYD JCD
}

const SearchHYD: FC<IProps> = (props) => {
  const {
    sampleFroms, handleSelectTypeIndex, documentType,
  } = props;
  const selectRef:any = useRef<HTMLInputElement>();
  const hiddenRef:any = useRef<HTMLInputElement>();
  const [typeList, settypeList] = useState<ISearchDocumentItem[]>([]);
  const [selectVal, setselectVal] = useState<string>();
  const [listEmpty, setlistEmpty] = useState(false);
  const dispatch = useDispatch();
  const sid = window.$storage.getItem('sid');
  const handleSearch = (e: React.ChangeEvent<ReactElement>) => {
    console.log(3232, e);
    if (e) {
      const params = {
        documentType,
        sampleFroms, // 子分类名称集合
        keyWord: e,
        sourceSid: window.$storage.getItem('sid'),
      };
      api.indexLibrary.fetchIndexSearch(params).then((res) => {
        console.log('res32322', res);
        settypeList(res.list);
        setlistEmpty(isEmpty(res.list));
      });
    }
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
      handleSelectTypeIndex(typeList[e]);
      setselectVal(e);
    } else {
      setselectVal('');
      selectRef.current.blur();
      hiddenRef.current.click();
    }
  };
  const addTypeSuccess = (params: any) => {
    console.log('添加大分类、指标成功', params);
    handleSelectTypeIndex(params, 'add');
    handleChangeCurDocument(params);
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
        {typeList.map((item, index) => (
          <Option key={item.type + item?.id} value={index}>
            <Space>
              {item.source === 'SYSTEM' && (
                <img className="w-16 h-16 relative -top-3" src={iconGf} />
              )}
              {item.source === 'SYSTEM' && <span>[官方]</span>}
              {item.source === 'DOCTOR' && item.sourceSid === sid && <span>[自己]</span>}
              {item.source === 'DOCTOR' && item.sourceSid !== sid && <span>[医生]</span>}
              <span>
                {`${item?.sampleFrom} - ${
                  item?.type === 'DOCUMENT' ? item?.name : `${item.documentName}-${item.name}`
                }`}
              </span>
            </Space>
          </Option>
        ))}
        {listEmpty && (
          <Option key="add" value="add">
            <div className="text-center text-blue-500">暂无结果，点击+添加新化验单</div>
          </Option>
        )}
      </Select>
      {/* 放到option里会影响select失去焦点无效，导致编辑弹框内容输入不了 */}
      <EditIndex onSuccess={addTypeSuccess} source="imgAddTypeIndex">
        <input type="hidden" ref={hiddenRef} />
      </EditIndex>
    </div>
  );
};

export default SearchHYD;
