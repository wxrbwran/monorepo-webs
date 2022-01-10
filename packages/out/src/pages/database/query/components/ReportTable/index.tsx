import React, { useEffect, useState } from 'react';
import { Table, message } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';
import ImgViewer from '../ImgViewer';
// import full from '@/assets/img/icon_full.svg';
// import fullExit from '@/assets/img/icon_full_exit.svg';
import add from '@/assets/img/icon_add.svg';
import CreateReport from '../CreateReport';
import AddField from '../AddField';
import * as api from '@/services/api';
import { sexList } from 'xzl-web-shared/dist/utils/consts';
import { queryFields, columnFields } from '../../consts';
import { handleTableDataSource } from '../../util';
import './index.scss';
import type { ColumnsType } from 'antd/lib/table';

interface IProps {
  location: {
    pathname: string;
  };
  tableData: ITableData[];
  reportId?: string;
  refreshTable: () => void;
  handleSearchData?: () => void; // 添加字段，调用查询接口
  handleExport?: (type: string) => void;
}

function ReportTable({
  location,
  tableData,
  reportId,
  refreshTable,
  handleSearchData,
  handleExport,
}: IProps) {
  const [tableColumns, setTableColumns] = useState<ColumnsType<IDataSource>>([]); // 表格字段
  const [tableDataSource, setTableDataSource] = useState<IDataSource[]>([]); // table的数据源
  const [tableFull, _setTableFull] = useState<boolean>(false); // 表格是否放大展示
  const [changeTitle, setChangeTitle] = useState<string[]>([]); // 用户添加或删除后要展示的title
  const { baseCondition, images, other, queryScope } = useSelector((state: IQuery) => state.query);

  // 删除字段
  const handleDelField = (name: string, titles: []) => {
    // 报告页面删除字段需要调用接口
    if (location.pathname === '/database/report') {
      const params = {
        reportId,
        type: name,
        // titles: tableData.title.filter(item => item !== name)
      };
      api.report.patchReportTitle(params).then(() => {
        message.success('删除字段成功');
        refreshTable();
      });
    } else {
      // 查询页面，删除字段，是前端过滤掉不显示
      console.log('changeTitle', changeTitle);
      console.log('titles', titles);
      const newTitles = titles.filter((item) => item !== name);
      if (newTitles.length === 0) {
        message.error('请至少保留一个字段');
      } else {
        /* eslint-disable @typescript-eslint/no-use-before-define */
        initData([...newTitles]);
        setChangeTitle([...newTitles]);
      }
    }
  };

  const renderTitle = (label: string, titles: []) => {
    return (
      <div>
        {queryFields[label]}
        <CloseOutlined onClick={() => handleDelField(label, titles)} />
      </div>
    );
  };

  const renderColomm = (item: string, text: string, record: { sid: string }) => {
    switch (item) {
      case 'sex':
        return <span>{sexList[+text]}</span>;
      case 'hypertension':
      case 'hyperglycemia':
      case 'hyperlipemia':
      case 'hyperuricemia':
        return +text === 1 ? '有' : '无';
      case 'shqx':
      case 'xcg':
      case 'bcg':
      case 'xzcs':
      case 'xdt':
        return (
          <ImgViewer imageType={item} sid={record.sid}>
            {text || '0'}
          </ImgViewer>
        );
      default:
        return text;
    }
  };
  const initData = (titles: string[]) => {
    const columns: ColumnsType<IDataSource> = [];
    titles.forEach((item) => {
      columns.push({
        title: renderTitle(item, titles),
        dataIndex: item,
        key: item,
        render: (text: any, record: any) => <>{renderColomm(item, text, record)}</>,
      });
    });
    setTableColumns(columns);
  };

  useEffect(() => {
    let dataSource = [];
    let titles: string[] = [];
    if (location.pathname === '/database/report') {
      tableData.forEach((item) => {
        Object.keys(item).forEach((el) => {
          if (!item[el]) {
            /* eslint-disable no-param-reassign */
            delete item[el];
          }
        });
      });
      dataSource = tableData;
      // indexOfMax 从字段最多的obj中拼接colunm
      const lenArr = dataSource.map((item) => Object.keys(item).length);
      const max = Math.max(...lenArr);
      const indexOfMax = lenArr.indexOf(max);
      titles = Object.keys(dataSource[indexOfMax]).filter((item) => item !== 'sid');
    } else {
      dataSource = handleTableDataSource(tableData);
      // 扩展查询需要用到这个参数
      window.$storage.setItem(
        'PSidArr',
        dataSource.map((item) => item.sid),
      );
      const baseTitle = tableData[0]?.members.filter((item) => item.baseTitle)[0]?.baseTitle;
      titles = baseTitle?.map((item: string) => columnFields[item]);
    }
    setChangeTitle(titles);
    setTableDataSource(dataSource);
    initData(titles);
  }, [tableData]);

  const handleCreateReport = (name: string) => {
    let newSource: any = [];
    tableDataSource.forEach((item) => {
      let newObj = {};
      changeTitle.forEach((i) => {
        newObj = {
          ...newObj,
          [i]: item[i],
          sid: item.sid,
        };
      });
      newSource = [...newSource, newObj];
    });
    const params = {
      name,
      projectSid: window.$storage.getItem('sid'),
      condition: {
        base: [...baseCondition],
        images,
        other: other && !!other.fourHigh ? other : null,
        queryScope,
      },
      teams: [...newSource],
    };
    api.query.generatorReport(params).then(() => {
      message.success('生成报告成功');
    });
  };

  return (
    <div className={['report_wrap_table', tableFull ? 'full' : ''].join(' ')}>
      {location.pathname === '/database/report' ? (
        <div className="table-export">
          <span onClick={() => handleExport('EXCEL')}>导出Excel</span>
          <span onClick={() => handleExport('WORD')}>导出Word</span>
        </div>
      ) : (
        <div className="table_top">
          <div className="table-top__info">
            根据您的搜索条件，为您智能筛选字段。您可以对结果字段进行增加或删除
          </div>
          <div className="btn-wrap">
            <span className="create-btn mr-10">
              <CreateReport handleCreateReport={handleCreateReport}>生成报告</CreateReport>
            </span>
            {/* <span className="full-screen">
              <img
                data-testid="full-btn"
                src={tableFull ? full : fullExit}
                alt=""
                onClick={() => setTableFull(!tableFull)}
              />
            </span> */}
            {changeTitle && handleSearchData && (
              <AddField
                handleChangeTitle={initData}
                changeTitle={changeTitle}
                handleSearchData={handleSearchData}
              >
                <img src={add} alt="添加字段" />
              </AddField>
            )}
          </div>
        </div>
      )}
      <Table
        dataSource={tableDataSource}
        columns={tableColumns}
        rowKey={(record: { id: string }) => record.id}
        pagination={false}
      />
    </div>
  );
}
export default ReportTable;
