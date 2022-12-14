import React, {
  useState, FC, useEffect, Key, ReactText,
} from 'react';
import { Table } from 'antd';
import { handleTableDataSource, handleTableRowKey } from './util';
import { pageSize } from '../../utils/consts';

interface IProps {
  columns: Store[];
  dataKey: string;
  request: (params: any) => Promise<any>;
  handleCallback?: (params: any) => void; // 返回接口返回的数据
  handleCallbackSelectKeys?: (params: Key[]) => void; // 返回用户勾选的key值
  depOptions?: Store;
  tableOptions?: Store;
  category?: string;
  noPagination?: boolean; // true：此值为true，则去除api参数pageAt、和pageSize
  extra?: any; // 针对不同类型可能会额外传参数，比如查询终点事件的total数量事由外面传过来的
}

export interface XzlTableCallBackProps {
  selectedRowKeys?: ReactText[];
  currentPage?: number;
  dataSource?: Store[];
  apiData?: any; // 接口返回的原始数据，例如外部需要total
}

interface IOnSelectChange {
  (selectedRowKeys: React.ReactText[], selectedRows?: Store[]): void;
}


const XzlTable: FC<IProps> = (props) => {
  // console.log('this is table shared~111');
  const {
    columns, request, dataKey, depOptions, tableOptions, handleCallback,
    category, noPagination, extra,
  } = props;
  // console.log(category, handleCallbackSelectKeys);
  const [size, setSize] = useState(pageSize);
  const [total, setTotal] = useState(0);
  const [current, setCurrent] = useState(0);
  const [dataSource, setDataSource] = useState<Store[]>([]);
  const [selectedRowKeys, setRowKeys] = useState<Key[]>([]);
  const [loading, setLoading] = useState(false);
  const [callbackStore, setCBStore] = useState<XzlTableCallBackProps>({});

  const handleCallBackStore = (data: XzlTableCallBackProps) => {
    const newStore = { ...callbackStore, ...data };
    setCBStore(newStore);
    if (handleCallback) {
      handleCallback(newStore);
    }
  };
  const onSelectChange: IOnSelectChange = (keys: Key[]) => {
    setRowKeys(keys);
    handleCallBackStore({ selectedRowKeys: keys });
  };
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  const fetchTableDataSource = (query = {}) => {
    setLoading(true);
    // console.log('query', query);
    const params: Store = {
      pageAt: 1,
      pageSize: size,
      ...depOptions,
      ...query,
    };
    // 处理不分页的api请求
    if (noPagination) {
      delete params.pageAt;
      delete params.pageSize;
    }
    console.log('fetchTableDataSource params', params);
    const timeOut = tableOptions?.timeOut ? 2000 : 0;
    setTimeout(async () => {
      if (request) {
        const res = await request(params);
        console.log('fetchTableDataSource res', res);
        if (res) {
          setCurrent(params.pageAt);
          setSize(params.pageSize);
          if (dataKey == 'events_jsonb') {
            res.tableBody.forEach(element => {
              element.content = JSON.parse(element.content.value);
            });
            setTotal(extra);
          } else {
            setTotal(res.total);
          }
          const handledData = handleTableDataSource(dataKey, res[dataKey] || res.list, res.category || category);
          handleCallBackStore({ dataSource: handledData, currentPage: params.pageAt, apiData: res });
          console.log('handledData*****', handledData);
          setDataSource(handledData);
        } else {
          setDataSource([]);
        }
      } else {
        setDataSource([]);
      }
      setLoading(false);
    }, timeOut);
  };
  useEffect(() => {
    console.log('depOptions', depOptions);
    fetchTableDataSource({});
  }, [depOptions]);

  const handlePagerChange = (page: number, changedSize: number | undefined) => {
    console.log('handlePagerChange', page);
    // console.log('handlePagerChange', changedSize);
    const params: Store = { pageAt: page };
    if (changedSize) {
      params.pageSize = changedSize;
    }
    if (!tableOptions?.handlePagerChange) {
      const data: Store = { pageAt: page };
      fetchTableDataSource(data);
    }
    if (tableOptions?.handleFetchPageAt) {
      tableOptions?.handleFetchPageAt(page);
    }
    // fetchTableDataSource(params);
  };
  /* eslint-disable react/jsx-props-no-spreading */
  return (
    <Table
      loading={loading}
      rowKey={(record) => handleTableRowKey(dataKey, record)}
      rowSelection={rowSelection}
      columns={columns}
      dataSource={dataSource}
      pagination={{
        pageSize: size,
        showQuickJumper: true,
        current,
        total,
        onChange: handlePagerChange,
        showSizeChanger: false,
        hideOnSinglePage: true,
      }}
      {...tableOptions}
    />
  );
};
XzlTable.defaultProps = {
  depOptions: {},
  tableOptions: {},
};
export default XzlTable;
