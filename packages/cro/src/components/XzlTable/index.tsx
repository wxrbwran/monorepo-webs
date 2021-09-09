import React, { useState, FC, useEffect, ReactText } from 'react';
import Mock from 'mockjs';
import { pageSize } from '@/utils/consts';
import { Table } from 'antd';
import { handleTableDataSource, handleTableRowKey } from './util';
import { Store } from 'antd/lib/form/interface';

export interface XzlTableCallBackProps {
  selectedRowKeys?: ReactText[];
  currentPage?: number;
  dataSource?: Store[];
}

interface IProps {
  columns: Store[];
  dataKey: string;
  request?: (params: any) => Promise<any>;
  handleCallback?: (params: any) => void;
  depOptions?: Store;
  tableOptions?: Store;
  callBackSelect?: (selected:boolean, ids: string[]) => void;
  category?: string;
  noPagination?: boolean; // true：此值为true，则去除api参数pageAt、和pageSize
  mockData?: Store[];
}

const XzlTable: FC<IProps> = (props) => {
  const { columns, request, dataKey, depOptions, tableOptions, handleCallback, category, noPagination, mockData } = props;
  const [total, setTotal] = useState(0);
  const [current, setCurrent] = useState(1);
  const [dataSource, setDataSource] = useState<Store[]>([]);
  const [loading, setLoading] = useState(false);
  const fetchTableDataSource = async (query = {}) => {
    setLoading(true);
    const params: Store = { pageAt: 1, pageSize, ...query, ...depOptions };

    // 处理不分页的api请求
    if (noPagination) {
      delete params.pageAt;
      delete params.pageSize;
    }
    if(request){
      const res = await request(params);
      setCurrent(params.pageAt);
      setTotal(res.total);
      const handledData = handleTableDataSource(dataKey, res[dataKey], res.category || category);
      if (category === 'patientManage' && handleCallback) {
        handleCallback(handledData); // 父组件需要拿到源数据，得到默认勾选项
      }
      setDataSource(handledData);
      setLoading(false);
    }else{
      setCurrent(params.pageAt);
      setTotal(3);
      setDataSource(mockData);
      setLoading(false);
      // const mockObj = {};
      // columns.forEach((c) => {
      //   mockObj.id = '@integer(1,1000000)';
      //   mockObj[c.dataIndex] = c.mock;
      // });
      // console.log(mockObj);
      // const res = Mock.mock({
      //   'lists|3': [mockObj],
      // });
      // res.total = res.lists.length;
      // console.log('fetchTableDataSource res', res);
      // if (res) {
      //   setCurrent(params.pageAt);
      //   setTotal(res.total);
      //   const handledData = handleTableDataSource(dataKey, res[/* dataKey */ 'lists'], res.category);
      //   setDataSource(handledData);
      //   setLoading(false);
      // }
    }
  };
  useEffect(() => {
    fetchTableDataSource({});
  }, [depOptions]);

  const handlePagerChange = (page: number) => {
    const params: Store = { pageAt: page };
    fetchTableDataSource(params);
  };
  /* eslint-disable react/jsx-props-no-spreading */
  return (
    <Table
      loading={loading}
      rowKey={(record) => handleTableRowKey(dataKey, record)}
      columns={columns}
      dataSource={dataSource}
      pagination={{
        pageSize: depOptions?.pageSize || pageSize,
        showQuickJumper: true,
        showSizeChanger: false,

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
