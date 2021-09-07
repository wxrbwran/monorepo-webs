import React, {
  useState, FC, useEffect, Key,
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
}

const XzlTable: FC<IProps> = (props) => {
  console.log("this is table shared~");
  const {
    columns, request, dataKey, depOptions, tableOptions, handleCallback,
    handleCallbackSelectKeys, category,
  } = props;
  const [size, setSize] = useState(pageSize);
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
      pageSize: size,
      ...depOptions,
      ...query,
    };
    console.log('fetchTableDataSource params', params);
    const res = await request(params);
    console.log('fetchTableDataSource res', res);
    setCurrent(params.pageAt);
    setSize(params.pageSize);
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

  // const handlePagerChange = (page: number) => {
  //   if (!tableOptions?.handlePagerChange) {
  //     const params: Store = { pageAt: page };
  //     fetchTableDataSource(params);
  //   }
  // };
   const handlePagerChange = (page: number, changedSize: number | undefined) => {
    console.log('handlePagerChange', page);
    console.log('handlePagerChange', changedSize);
    const params: Store = { pageAt: page };
    if (changedSize) {
      params.pageSize = changedSize;
    }
    if (!tableOptions?.handlePagerChange) {
      const params: Store = { pageAt: page };
      fetchTableDataSource(params);
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
