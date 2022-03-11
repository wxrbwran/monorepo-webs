import React, { useEffect, useState, useMemo } from 'react';
import QueryDetail from '@/pages/query/components/query_detail';
import XLSX from 'xlsx';
import { Table } from 'antd';
import EndEvent from '@/pages/query/components/end_event';
import './index.scss';
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
}
interface IColumns {
  title: string;
  dataIndex: string;
  children: []
}

function QueryTable({ location, tableData, head }: IProps) {

  const [data, setData] = useState<any>([]);
  const [columns, setColumn] = useState<IColumns[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [row, setRow] = useState({});

  const { reportName } = location.query;

  const handleShowModal = (text: any, record: any, tree: any, value: number) => {
    setShowModal(true);

    setRow({ text: text, record: record, tree: tree, resultKey: location.query.resultKey, value });
  };

  const getComponent = (text: any, record: any, tree: any) => {

    const { kp } = tree;
    let value = '';
    for (let key in text) {

      if (key.includes('.value')) {
        value = text[key];
      }
    }
    if (kp.includes('end-event')) {
      // return <EndEvent row={text}><span>{text.value}</span></EndEvent>
      const endEventRow = { text: text, record: record, tree: tree, resultKey: location.query.resultKey, value: Number(value) };
      return <EndEvent row={endEventRow}><span>{value}</span></EndEvent>;
    } else if (kp.includes('basic')) {
      return value;
    } else {
      // return <QueryDetail row={text}><span>{text.value}</span></QueryDetail>
      return <>
        <span onClick={() => handleShowModal(text, record, tree, Number(value))}>{value}</span>
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
        return (
          {
            ...tree,
            children: !!tree?.children?.length ? renderTree(tree.children) : [],
            render: !!tree?.children?.length ? () => { } : (text: any, record: IColumns) => {
              // return <span>{"hhhhh"}</span>
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
