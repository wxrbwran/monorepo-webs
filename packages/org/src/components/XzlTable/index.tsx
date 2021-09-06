import React, { useState, FC, useEffect, ReactText } from 'react';
import { pageSize } from '@/utils/consts';
import { Table } from 'antd';
import { handleTableDataSource, handleTableRowKey } from './util';

export interface XzlTableCallBackProps {
  selectedRowKeys?: ReactText[];
  currentPage?: number;
  dataSource?: Store[];
}

interface IProps {
  columns: Store[];
  dataKey: string;
  request: (params: any) => Promise<any>;
  handleCallback?: (params: XzlTableCallBackProps) => void;
  depOptions?: Store;
  tableOptions?: Store;
}

interface IOnSelectChange {
  (selectedRowKeys: React.ReactText[], selectedRows?: Store[]): void;
}
const XzlTable: FC<IProps> = (props) => {
  const { columns, request, dataKey, depOptions, tableOptions, handleCallback } = props;
  const [total, setTotal] = useState(0);
  const [current, setCurrent] = useState(1);
  const [size, setSize] = useState(pageSize);
  const [dataSource, setDataSource] = useState<Store[]>([]);
  const [selectedRowKeys, setRowKeys] = useState<ReactText[]>([]);
  const [callbackStore, setCBStore] = useState<XzlTableCallBackProps>({});

  const handleCallBackStore = (data: XzlTableCallBackProps) => {
    const newStore = { ...callbackStore, ...data };
    setCBStore(newStore);
    if (handleCallback) {
      handleCallback(newStore);
    }
  };

  const onSelectChange: IOnSelectChange = (keys: ReactText[]) => {
    setRowKeys(keys);
    handleCallBackStore({ selectedRowKeys: keys });
  };

  const fetchTableDataSource = async (query = {}) => {
    const params: Store = { pageAt: 1, pageSize: size, ...query, ...depOptions };
    console.log('fetchTableDataSource params', params);
    const res = await request(params);
    console.log('fetchTableDataSource res', res);
    setCurrent(params.pageAt);
    setSize(params.pageSize);
    setTotal(res.total);
    const handledData = handleTableDataSource(dataKey, res[dataKey], res.category);
    // console.log('handleTableDataSource handledData', handledData);
    setDataSource(handledData);
    handleCallBackStore({ dataSource: handledData, currentPage: params.pageAt });
  };
  useEffect(() => {
    fetchTableDataSource({});
  }, [depOptions]);

  const handlePagerChange = (page: number, changedSize: number | undefined) => {
    console.log('handlePagerChange', page);
    console.log('handlePagerChange', changedSize);
    const params: Store = { pageAt: page };
    if (changedSize) {
      params.pageSize = changedSize;
    }
    fetchTableDataSource(params);
  };
  /* eslint-disable react/jsx-props-no-spreading */
  return (
    <Table
      rowKey={(record) => handleTableRowKey(dataKey, record)}
      rowSelection={{
        selectedRowKeys,
        onChange: onSelectChange,
      }}
      columns={columns}
      dataSource={dataSource}
      pagination={{
        pageSize: size,
        showQuickJumper: true,
        current,
        total,
        onChange: handlePagerChange,
        // hideOnSinglePage: true,
      }}
      {...tableOptions}
    />
  );
};
XzlTable.defaultProps = {
  depOptions: {},
};
export default XzlTable;
