import React, {
  useState, FC, useEffect, Key,
} from 'react';
import { Table } from 'antd';
import config from '@/config';
import { handleTableDataSource, handleTableRowKey } from './util';

interface IProps {
  columns: Store[];
  dataKey: string;
  request: (params: any) => Promise<any>;
  handleCallback?: (params: any) => void; // 返回接口返回的数据
  handleCallbackSelectKeys?: (params: Key[]) => void; // 返回用户勾选的key值
  depOptions?: Store;
  tableOptions?: Store;
  category?: string;
}

const XzlTable: FC<IProps> = (props) => {
  const {
    columns, request, dataKey, depOptions, tableOptions, handleCallback,
    handleCallbackSelectKeys, category,
  } = props;
  const [total, setTotal] = useState(0);
  const [current, setCurrent] = useState(0);
  const [dataSource, setDataSource] = useState<Store[]>([]);
  const [selectedRowKeys, setRowKeys] = useState<Key[]>([]);
  const [loading, setLoading] = useState(false);
  const onSelectChange = (keys: Key[]) => {
    setRowKeys(keys);
    if (handleCallbackSelectKeys) {
      handleCallbackSelectKeys(keys);
    }
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
      pageSize: config.TABLE_PAGESIZE,
      ...depOptions,
      ...query,
    };
    console.log('fetchTableDataSource params', params);
    const res = await request(params);
    console.log('fetchTableDataSource res', res);
    setCurrent(params.pageAt);
    setTotal(res.total);
    const handledData = handleTableDataSource(dataKey, res[dataKey], category);
    if (handleCallback) {
      handleCallback(handledData);
    }
    setDataSource(handledData);
    setLoading(false);
  };
  useEffect(() => {
    console.log('depOptions', depOptions);
    fetchTableDataSource({});
  }, [depOptions]);

  const handlePagerChange = (page: number) => {
    if (!tableOptions?.handlePagerChange) {
      const params: Store = { pageAt: page };
      fetchTableDataSource(params);
    }
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
        pageSize: depOptions?.pageSize || config.TABLE_PAGESIZE,
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
