import React, { FC, useState } from 'react';
import { Button, Input, message, Popconfirm } from 'antd';
import { serviceName } from '@/utils/columns';
import XzlTable from 'xzl-web-shared/dist/components/XzlTable';
import AddEditService from './component/AddEditService';
const { Search } = Input;
const ServiceType: FC = () => {
  const [tableOptions, setOptions] = useState(
    { orgNsId: window.$storage.getItem('nsId'),
      doctorRole:[window.$storage.getItem('role')],
    },
  );

  const [keyword, setKeyWord] = useState('');
  const handleDelete = (record: any) => {
    console.log('record', record);
    window.$api.service.deleteGood(record.id).then(() => {
      message.success('删除成功');
      setOptions({ ...tableOptions });
    });
  };
  const columns = [
    serviceName,
    {
      title: '操作',
      dataIndex: 'id',
      // width: 200,
      render: (text, record) => {
        return (
        <div className='flex justify-center items-center'>
          <AddEditService mode="edit" initData={record} refresh={() => {setOptions({ ...tableOptions });}}>
            <Button type="link">编辑</Button>
          </AddEditService>
          <span className='mx-20 text-gray-300'>|</span>
          <Popconfirm
            title="确认要删除吗?"
            onConfirm={() => handleDelete(record)}
            onCancel={() => {}}
            okText="确定"
            cancelText="取消"
          >
            <Button type="link">删除</Button>
          </Popconfirm>
        </div>
        );
      },
    },
  ];
  const onSearch = () => {
    const newOptions = {
      ...tableOptions,
      keyword,
    };
    if (!keyword) {
      delete newOptions?.keyword;
    }
    setOptions({ ...newOptions });

  };
  return (
    <div className='px-30 pt-10'>
      <div className='flex justify-between my-20'>
        <Search
          value={keyword}
          placeholder="搜索服务名称"
          onChange={(e) => setKeyWord(e.target.value)}
          onSearch={onSearch}
          style={{ width: 200 }}
        />
        <AddEditService refresh={() => {setOptions({ ...tableOptions });}}>
          <Button type="primary">+新增</Button>
        </AddEditService>
      </div>
      <XzlTable
        request={window.$api.service.getGoods}
        columns={columns}
        dataKey="goodsDetailList"
        depOptions={tableOptions}
        noPagination={true}
        tableOptions={{
          onChange: () => {},
          rowSelection: false,
          pagination: false,
        }}
      ></XzlTable>
    </div>
  );
};

export default ServiceType;
