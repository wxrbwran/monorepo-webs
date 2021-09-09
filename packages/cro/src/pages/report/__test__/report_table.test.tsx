import 'jest';
import React from 'react';
import ReportTable from '../components/report_table';
import { render, fireEvent, RenderResult } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';

const mockStore = configureMockStore();
const store = mockStore({
  query: {
    images: [],
    other: [],
    base: {}
  },
  user: {
    user: {
      id: 'feqw'
    }
  }
});
const tableData = {
  name: '报告名字',
  response: {
    extData: [],
    patientBase: [
      {
        id: '232',
        age: 20,
        name: '小明'
      },
      {
        id: '222',
        age: 30,
        name: '小卷'
      },
    ],
  },
  title: ['姓名', '年龄', '身高', '体重'],
  wordUrl: '',
  excelUrl: '',
  request: {
    base: {
      maxAge: 20,
      minAge: 10,
      maxHeight: 190,
      minHeight: 100,
      maxWeight: 180,
      minWeight: 60,
      gender: 'MALE'
    },
    images: [],
    other: {
      fourHigh: []
    },
  },
}
const reportProps = {
  location: {
    pathname: '/report/detail'
  },
  tableData: tableData,
  refreshTable: jest.fn(),
  reportId: '100',
}
const queryProps = {
  location: {
    pathname: '/query/query_result'
  },
  tableData: tableData,
  refreshTable: jest.fn(),
  handleSearchData: jest.fn(),// 添加字段，调用查询接口
  sourceTitle: ['体重']
}
describe('查询————表格组件', () => {
  let wrapper: RenderResult;
  beforeEach(() => {
    wrapper = render(<Provider store={store}><ReportTable {...queryProps} /></Provider>)
  })
  it('匹配快照', () => {
    expect(wrapper).toMatchSnapshot();
  });
  it('查询页面:按钮显示是否正确', () => {
    expect(wrapper.getByText('生成报告')).toBeInTheDocument();
  });
  it('表格删除字段功能', () => {
    const tableTitle = wrapper.container.getElementsByTagName('th');
    expect(tableTitle.length).toBe(2);
    const firstClose = wrapper.container.querySelector('.ant-table-thead > tr > th > div > .anticon-close');
    firstClose && fireEvent.click(firstClose);
    expect(tableTitle.length).toBe(1);
  })
  it('全屏交互测试', () => {
    expect(wrapper.container.querySelector('.full')).toBeFalsy();
    const fullBtn = wrapper.getByTestId('full-btn');
    fireEvent.click(fullBtn);
    expect(wrapper.container.querySelector('.full')).toBeTruthy();
  });
});
describe('报告—————表格组件', () => {
  let wrapper: RenderResult;
  beforeEach(() => {
    wrapper = render(<Provider store={store}><ReportTable {...reportProps} /></Provider>)
  })
  it('报告页面,表格上方功能按钮显示是否正确', async () => {
    expect(wrapper.getByText('导出Excel')).toBeInTheDocument();
  });
  it('表格渲染正常,2条数据', async () => {
    const rowTr = wrapper.container.getElementsByClassName('ant-table-tbody')[0].children;
    expect(rowTr.length).toBe(2);
  });
})