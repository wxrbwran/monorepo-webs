import React, { useEffect, useState, useMemo } from 'react';
import QueryDetail from '@/pages/query/components/query_detail';
import XLSX from 'xlsx';
import { Table, Button, message } from 'antd';
import * as api from '@/services/api';
import './index.scss';
import { cloneDeep } from 'lodash';
interface IProps {
  location: {
    pathname: string;
    query: {
      reportName: string;
      resultKey: string;
    }
  };
  tableData: [{
    column_data: object,
    row_key: number,
    result_id: string,

  }],
  head: [],
  queryStop: boolean;
}
interface IColumns {
  title: any;
  dataIndex: string;
  children: []
}

function QueryTable({ location, tableData, head, queryStop }: IProps) {

  const [data, setData] = useState<any>([]);
  const [columns, setColumn] = useState<IColumns[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [row, setRow] = useState({});
  const [exportLoading, setExportLoading] = useState(false);
  const { reportName, resultKey } = location.query;

  const handleShowModal = (text: any, record: any, tree: any, value: number, kp: string) => {
    setShowModal(true);
    setRow({ text: text, record: record, tree: tree, resultKey: location.query.resultKey, value, kp });
  };


  const getComponent = (text: any, record: any, tree: any) => {

    const { kp } = tree;
    let value = '';
    for (let key in text) {

      if (key.includes('.value')) {

        if (key.includes('bmi.value')) {
          value = text[key] / 10000;
        } else {
          value = text[key];
        }
      }
    }
    if (kp.includes('basic')) {
      return value ?? '';
    } else {
      return <>
        <span onClick={() => handleShowModal(text, record, tree, Number(value), kp)}>{value ?? ''}</span>
      </>;
    }
  };

  useEffect(() => {

    if (head?.length > 0) {

      const renderTree = (subTree: IColumns[]) => {
        let treeList: any[] = [];
        subTree.forEach((tree: IColumns) => {
          // eslint-disable-next-line @typescript-eslint/no-use-before-define
          treeList.push(renderItem(tree));
        });
        return treeList;
      };

      const renderItem = (tree: IColumns) => {

        const treeCopy = cloneDeep(tree);
        if ((tree?.originalKeyPath?.includes('objective') || tree?.originalKeyPath?.includes('visit_objective'))) { // 客观检查计划外客观检查

          const tempTitle = tree?.title.replace(/<[^>]+>/g, '');
          if (tempTitle.length > 25) {
            treeCopy.title = (<div title={tempTitle}>
              {tempTitle.slice(0, 25) + '...'}
            </div>);
          } else {
            treeCopy.title = tempTitle;
          }
        }
        return (
          {
            ...treeCopy,
            children: !!tree?.children?.length ? renderTree(tree.children) : [],
            render: !!tree?.children?.length ? () => { } : (text: any, record: IColumns) => {
              return getComponent(text, record, tree);
            },
          }
        );
      };
      const resut = renderTree(head);
      setColumn([...resut]);
    } else {
      setColumn([]);
    }
  }, [head]);

  useEffect(() => {

    if (tableData?.length > 0) {

      const validData = tableData.map(item => { return { ...item.column_data, item }; });
      setData([...validData]);
    }
    return () => {
      setData([]);
    };
  }, [tableData]);

  // const handleCreateReport = (name: string) => {
  //   message.success('生成报告成功');
  // }

  const exportFile = () => {
    var workbook = XLSX.utils.book_new();

    /* convert table 'table1' to worksheet named "Sheet1" */
    var ws1 = XLSX.utils.table_to_sheet(document.querySelector('.ant-table-content > table'));
    XLSX.utils.book_append_sheet(workbook, ws1, 'Sheet1');

    XLSX.writeFile(workbook, `${reportName}.xlsx`);
  };

  console.log('data111', data, columns);
  const modal = useMemo(() => {
    return (
      <QueryDetail
        row={row}
        showModal={showModal}
        onCancel={() => { setShowModal(false); }}
      ></QueryDetail>
    );
  }, [showModal]);

  const handleExport = () => {
    setExportLoading(true);
    api.query.patchResearchExport({ actionLogId: resultKey }).then(res => {
      const doma = document.createElement('a');
      doma.href = res.url;
      document.body.appendChild(doma);
      doma.click();
      document.body.removeChild(doma);
      message.success('导出成功');
      setExportLoading(false);
    }).catch(err => {
      setExportLoading(false);
      message.error(err?.result || '导出失败');
    });
  };
  return (
    <div className='report-wrap-table'>
      {
        location.pathname === '/report/detail' ? (
          <div className="table-export">
            <span onClick={exportFile}>导出Excel</span>
            <span>导出Word</span>
          </div>
        ) : (
          <div className="table-top">
            <div className="table-top__info">查询结果：</div>
            {/* <div className="btn-wrap">
                <span className="create-btn">
                  <CreateReport handleCreateReport={handleCreateReport}>生成报告</CreateReport>
                </span>
              </div> */}
            <Button
              disabled={!queryStop}
              type='primary'
              loading={exportLoading}
              onClick={handleExport}
            >
              导出
            </Button>
          </div>
        )
      }
      {/* <Table
        dataSource={tableDataSource}
        columns={tableColumns}
        rowKey={(record: {id: string}) => record.id}
        pagination={false}
      /> */}
      <Table
        columns={columns}
        dataSource={data}
        bordered
        rowKey={() => Math.random()}
      // rowSelection={{ columnWidth: 100 }}
      />
      {modal}
    </div>
  );
}

export default QueryTable;
