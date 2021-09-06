import React, { FC, useState, useEffect } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import {
  Form, Button, Popconfirm, message,
} from 'antd';
import { useLocation, Location } from 'umi';
import { Common, Source, Search } from '@/components/Selects';
import XzlTable from '@/components/XzlTable';
import {
  indexName, indexUnits, indexAbbr, indexCommon, indexSource, columnCreator,
} from '@/utils/columns';
import EditIndex from '@/components/EditIndex';
import * as api from '@/services/api';
import Initials from '../Initials';

type ILocation = {
  query: {
    documentId: string;
    documentType: string;
  }
};
interface IParams {
  documentId: string; // 单据id
  name?: string;
  common?: boolean;
  source?: string;
  character?: string; // 首字母
  pageSize: number;
}
const IndexList: FC = () => {
  const [form] = Form.useForm();
  const { getFieldValue } = form;
  // @ts-ignore
  const { query: { documentId, documentType } } = useLocation<Location & ILocation>();
  const [total, setTotal] = useState(0);
  const initDepOptions = {
    documentId,
    pageSize: 9999999,
    sourceSid: window.$storage.getItem('sid'),
  };
  const [depOptions, setOptions] = useState<IParams>(initDepOptions);
  // 刷新列表
  const onSuccess = () => {
    setOptions({ ...depOptions });
  };
  console.log('documentId', documentId);
  useEffect(() => {
    form.resetFields();
    setOptions({ ...initDepOptions });
  }, [documentId]);
  const handleSelectChange = (changedValues: string[], allValues: CommonData) => {
    console.log('allValues', allValues, changedValues);
    const params: IParams = { ...depOptions };
    Object.keys(allValues).forEach((key: string) => {
      if (allValues[key]) {
        if (key === 'common') {
          params.common = !!(allValues.common === 'true');
        } else {
          // @ts-ignore
          params[key] = allValues[key];
        }
      } else {
        // @ts-ignore
        delete params[key];
      }
    });
    setOptions({ ...params });
  };
  const initialCallback = (key: string) => {
    const params: IParams = { ...depOptions };
    if (key === '全部') {
      delete params.character;
    } else {
      params.character = key;
    }
    setOptions({ ...params });
  };

  const handleDel = (id: string) => {
    api.indexLibrary.deleteIndexDocumentIndex(id).then(() => {
      message.success('删除成功');
      onSuccess();
    }).catch((err) => {
      message.error(err?.result ?? '删除失败');
    });
  };
  const operation = {
    title: '操作',
    dataIndex: 'id',
    render: (text: string, record: any) => (
      <div className="operation-btn">
        {record.source === 'DOCTOR' && (
          <>
            <Popconfirm
              title="确定删除此指标吗?"
              onConfirm={() => handleDel(text)}
              okText="是"
              cancelText="否"
            >
              <span>删除</span>
            </Popconfirm>
            {!record.used && (
              <EditIndex
                onSuccess={onSuccess}
                initFormVal={record}
                documentId={documentId}
                level1Type={documentType}
                source="libraryEdit"
              >
                <span>编辑</span>
              </EditIndex>
            )}
          </>
        )}
      </div>
    ),
  };
  const handleCallback = (data: object[]) => {
    setTotal(data.length);
  };
  const columns = [
    indexName,
    indexUnits,
    columnCreator(`${documentType === 'HYD' ? '样本来源' : '检查部位'}`, 'sampleFrom'),
    indexAbbr,
    indexCommon(onSuccess),
    indexSource,
    operation,
  ];
  return (
    <div className="ui-index-library__index-list">
      <Initials initialCallback={initialCallback} indexId={documentId} />
      <div className="operation-warp">
        <div>
          <span>指标数量：</span>
          <span className="num">{total}</span>
          <span>个</span>
        </div>
        <div className="flex">
          <div>
            <Form form={form} onValuesChange={handleSelectChange} id="height34">
              <Common />
              <Source />
              <Search
                form={form}
                searchKey="name"
                value={getFieldValue('name')}
              />
            </Form>
          </div>
          <EditIndex onSuccess={onSuccess} documentId={documentId} level1Type={documentType} source="libraryAdd">
            <Button type="primary" className="create-btn">
              <PlusOutlined />
              新建
            </Button>
          </EditIndex>
        </div>
      </div>
      {
        documentId && (
          <XzlTable
            columns={columns}
            dataKey="list"
            category="list"
            request={api.indexLibrary.fetchIndexDocumentIndex}
            depOptions={depOptions}
            handleCallback={handleCallback}
            tableOptions={{
              rowSelection: false,
            }}
          />
        )
      }
    </div>
  );
};

export default IndexList;
