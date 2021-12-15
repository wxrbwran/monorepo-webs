import type { FC, ReactText } from 'react';
import React, { useState, useEffect } from 'react';
// import Mock from 'mockjs';
import { pageSize } from 'xzl-web-shared/dist/src/utils/consts';
import { Table } from 'antd';
import { handleTableDataSource, handleTableRowKey } from './util';

export interface XzlTableCallBackProps {
  selectedRowKeys?: string[];
  currentPage?: number;
  dataSource?: Store[];
  apiData?: {
    total?: number;
  }; // 接口返回的原始数据
}

interface IProps {
  columns: Store[];
  dataKey: string;
  request: (params: any) => Promise<any>;
  handleCallback?: (params: XzlTableCallBackProps) => void;
  depOptions?: Store;
  tableOptions?: Store;
  noPagination?: boolean; // true：此值为true，则去除api参数pageAt、和pageSize
}

interface IOnSelectChange {
  (selectedRowKeys: React.ReactText[], selectedRows?: Store[]): void;
}
const XzlTable: FC<IProps> = (props) => {
  const {
    columns,
    request,
    dataKey,
    depOptions,
    tableOptions,
    handleCallback,
    noPagination,
  } = props;
  const [total, setTotal] = useState(0);
  const [size, setSize] = useState(pageSize);
  const [current, setCurrent] = useState(1);
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

  const onSelectChange: IOnSelectChange = (keys: ReactText[], selectedRows: any) => {
    setRowKeys(keys);
    handleCallBackStore({ selectedRowKeys: keys, selectedRows });
  };

  const fetchTableDataSource = async (query = {}) => {
    const params: Store = { pageAt: 1, pageSize: size, ...query, ...depOptions };
    // console.log('fetchTableDataSource params', params);
    // 处理不分页的api请求
    if (noPagination) {
      delete params.pageAt;
      delete params.pageSize;
    }
    const res = await request(params);
    console.log('22222, res', res);
    if (res) {
      setCurrent(params.pageAt);
      setSize(params.pageSize);
      setTotal(res.total);
      const handledData = handleTableDataSource(dataKey, res[dataKey], res.category);
      // console.log('handleTableDataSource handledData', handledData);
      setDataSource(handledData);
      handleCallBackStore({
        dataSource: handledData,
        currentPage: params.pageAt,
        apiData: res,
      });
    }
  };
  useEffect(() => {
    fetchTableDataSource({});
    console.log('fhfhhhhhhh');
  }, [depOptions]);

  const handlePagerChange = (page: number, changedSize: number | undefined) => {
    console.log('handlePagerChange page', page);
    console.log('handlePagerChange changedSize', changedSize);
    if (!tableOptions?.onChange) {
      const params: Store = { pageAt: page };
      if (changedSize) {
        params.pageSize = changedSize;
      }
      fetchTableDataSource(params);
    }
  };
  // console.log('dataSource', dataSource);
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
