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
}

export interface XzlTableCallBackProps {
  selectedRowKeys?: ReactText[];
  currentPage?: number;
  dataSource?: Store[];
}

interface IOnSelectChange {
  (selectedRowKeys: React.ReactText[], selectedRows?: Store[]): void;
}


const XzlTable: FC<IProps> = (props) => {
  console.log('this is table shared~111');
  const {
    columns, request, dataKey, depOptions, tableOptions, handleCallback,
    handleCallbackSelectKeys, category, noPagination,
  } = props;
  console.log(category, handleCallbackSelectKeys);
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
  const fetchTableDataSource = async (query = {}) => {
    setLoading(true);
    console.log('query', query);
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
    const res = await request(params);
    console.log('fetchTableDataSource res', res);
    if (res) {
      setCurrent(params.pageAt);
      setSize(params.pageSize);
      setTotal(res.total);
      const handledData = handleTableDataSource(dataKey, res[dataKey] || res.list, res.category || category);
      handleCallBackStore({ dataSource: handledData, currentPage: params.pageAt });
      console.log('handledData*****', handledData);
      setDataSource(handledData);
    }
    setLoading(false);
  };
  useEffect(() => {
    console.log('depOptions', depOptions);
    fetchTableDataSource({});
  }, [depOptions]);

  const handlePagerChange = (page: number, changedSize: number | undefined) => {
    console.log('handlePagerChange', page);
    console.log('handlePagerChange', changedSize);
    const params: Store = { pageAt: page };
    if (changedSize) {
      params.pageSize = changedSize;
    }
    if (!tableOptions?.handlePagerChange) {
      const data: Store = { pageAt: page };
      fetchTableDataSource(data);
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
