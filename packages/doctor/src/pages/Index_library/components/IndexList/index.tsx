import React, { FC, useState, useEffect } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Form, Button, Popconfirm, message, Space } from 'antd';
import { useLocation, Location, useSelector } from 'umi';
import { Common, Search } from 'xzl-web-shared/src/components/Selects';
import XzlTable from 'xzl-web-shared/src/components/XzlTable';
import {
  indexName,
  indexAbbr,
  indexCommon,
  columnCreator,
  note,
  reference,
  unit,
} from 'xzl-web-shared/src/utils/columns';
import { documentMap } from 'xzl-web-shared/src/utils/consts';
import EditIndex from '@/components/EditIndex';
import * as api from '@/services/api';
import ViewIndex from '../ViewIndex';

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
  const sid = window.$storage.getItem('sid');
  const { getFieldValue } = form;
  // @ts-ignore
  const {
    query: { documentId, documentType },
  } = useLocation<Location & ILocation>();
  const [total, setTotal] = useState(0);
  const initDepOptions = {
    documentId,
    pageSize: 9999999,
    source: 'DOCTOR',
    sourceSid: sid,
    sid: sid,
  };
  const [depOptions, setOptions] = useState<IParams>(initDepOptions);
  const curDocument = useSelector((state: IState) => state.document.curDocument);
  // 刷新列表
  const onSuccess = () => {
    setOptions({ ...depOptions });
  };

  useEffect(() => {
    form.resetFields();
    setOptions({ ...initDepOptions });
  }, [documentId]);

  const handleSelectChange = (changedValues: string[], allValues: Record<string, string>) => {
    console.log('allValues', allValues, changedValues);
    const params: IParams = { ...depOptions };
    if (allValues.common?.length === 1) {
      params.common = !!(allValues.common[0] === 'true');
    } else if ([0, 2].includes(allValues.common?.length)) {
      // @ts-ignore
      delete params.common;
    }
    if (allValues.name) {
      params.name = allValues.name;
    } else {
      delete params.name;
    }
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
    api.indexLibrary
      .deleteIndexDocumentIndex({
        documentId: curDocument.id,
        indexId: id,
      })
      .then(() => {
        message.success('删除成功');
        onSuccess();
      })
      .catch((err) => {
        message.error(err?.result ?? '删除失败');
      });
  };
  const operation = {
    title: '操作',
    dataIndex: 'id',
    render: (text: string, record: any) => (
      <div>
        {record.source === 'DOCTOR' && record.sourceSid === sid && (
          <Space>
            <ViewIndex record={record} curDocument={curDocument}>
              <Button type="link">查看</Button>
            </ViewIndex>
            <Popconfirm
              title="确定删除此指标吗?"
              onConfirm={() => handleDel(text)}
              okText="是"
              cancelText="否"
            >
              <Button type="link">删除</Button>
            </Popconfirm>
            {!record.used && (
              <EditIndex
                onSuccess={onSuccess}
                initFormVal={record}
                documentId={documentId}
                level1Type={documentType}
                source="libraryEdit"
              >
                <Button type="link">编辑</Button>
              </EditIndex>
            )}
          </Space>
        )}
      </div>
    ),
  };
  const handleCallback = ({ dataSource }: { dataSource: TIndexItem[] }) => {
    setTotal(dataSource.length);
  };


  const columns = [
    indexName,
    indexAbbr,
    columnCreator('样本来源', 'sampleFrom', () => <span>{curDocument.sampleFrom}</span>),
    note,
    reference,
    unit,
    indexCommon,
    operation,
  ];
  return (
    <div className="ui-index-library__index-list">
      <Initials initialCallback={initialCallback} indexId={documentId} />
      <div className="operation-warp">
        <div className="flex">
          <h2 className="font-bold text-base mr-20">
            {`${documentMap[curDocument.type]}-系统添加-${curDocument.name}`}
          </h2>
          <span>指标数量：</span>
          <span className="num">{total}</span>
          <span>个</span>
        </div>
        <div className="flex">
          <div>
            <Form form={form} onValuesChange={handleSelectChange}>
              <Space>
                <Common />
                <Search form={form} searchKey="name" value={getFieldValue('name')} />
              </Space>
            </Form>
          </div>
          <EditIndex
            onSuccess={onSuccess}
            documentId={documentId}
            level1Type={documentType}
            source="libraryAdd"
          >
            <Button type="primary" className="create-btn">
              <PlusOutlined />
              新建
            </Button>
          </EditIndex>
        </div>
      </div>
      {documentId && (
        <XzlTable
          columns={columns}
          dataKey="indexTable"
          request={api.indexLibrary.fetchIndexDocumentIndex}
          depOptions={depOptions}
          handleCallback={handleCallback}
          tableOptions={{
            rowSelection: false,
          }}
        />
      )}
    </div>
  );
};

export default IndexList;
