import React, { useEffect, useState, useMemo } from 'react';
import { message, Table } from 'antd';
import CreateReport from '../create_report';
import QueryDetail from '../query_detail';
import XLSX from 'xlsx';
import EndEvent from '../end_event';
import './index.scss';
interface IProps {
  location: {
    pathname: string;
    query : {
      reportName: string;
    }
  };
  tableData: [{
    cells: object,
    columns: []
  }]
}
interface IColumns {
  title: string;
  dataIndex: string;
  children: []
}

function ReportTable({ location, tableData }: IProps) {
  const [data, setData] = useState<any>([]);
  const [columns, setColumn] = useState<IColumns[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [row, setRow] = useState({});

  const { reportName } = location.query;

  const handleShowModal = (text: { kp: string, source: string[] }) => {
    setShowModal(true);
    setRow({...text});
  }

  const getComponent = (text: { kp: string, value: string, source: string[] }) => {
    const { kp } = text
    if(kp.includes('end-event')){
      return <EndEvent row={text}><span>{text.value}</span></EndEvent>
    }else if (kp.includes('basic')) {
      return text.value
    }else{
      // return <QueryDetail row={text}><span>{text.value}</span></QueryDetail>
      return <>
        <span onClick={() => handleShowModal(text)}>{text.value}</span>

      </>
    }
  };

  useEffect(() => {
    if(tableData?.length>0){
      const validColumns = tableData[0]?.columns;
      // setColumn([...validColumns]);
      const validData = tableData.map(item => item.cells);
      setData([...validData]);
      const renderItem = (tree: IColumns) => {
        return (
          {
            ...tree,
            children: !!tree?.children?.length ? renderTree(tree.children) : [],
            render: !!tree?.children?.length ? () => {} : (text: any, record: IColumns) => {
              // return <span>{text.value}</span>
              return getComponent(text);
            }
          }
        )
      }
      const renderTree = (subTree: IColumns[]) => {
        let treeList: any[] = [];
        subTree.forEach((tree: IColumns, index: number)=> {
          treeList.push(renderItem(tree));
        })
        return treeList;
      }
      const resut = renderTree(validColumns);
      setColumn([...resut]);
    }
    return () => {
      setData([]);
      setColumn([]);
    }
  }, [tableData])

  const handleCreateReport = (name: string) => {
    message.success('生成报告成功');
  }

  const exportFile = () => {
    var workbook = XLSX.utils.book_new();

    /* convert table 'table1' to worksheet named "Sheet1" */
    var ws1 = XLSX.utils.table_to_sheet(document.querySelector('.ant-table-content > table'));
    XLSX.utils.book_append_sheet(workbook, ws1, "Sheet1");

    XLSX.writeFile(workbook, `${reportName}.xlsx`)
  }

  console.log('data111', data, columns);
  const modal = useMemo(() => {
    return (
      <QueryDetail
        row={row}
        showModal={showModal}
        onCancel={()=> { setShowModal(false) }}
      ></QueryDetail>
    )
  }, [showModal])
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
        rowKey={(record) => Math.random()}
      />
      {modal}
    </div>
  )
}
export default ReportTable;
