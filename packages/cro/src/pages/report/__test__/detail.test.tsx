import 'jest';
import React from 'react';
import ReportDetail from '../detail';
import { render } from '@testing-library/react';

let wrapper;

beforeAll(() => {
  // wrapper = render(<ReportDetail />);
});

jest.mock('@/services/api', () => {
  return {
    report: {
      getReportDetail: jest.fn(() => {
        return Promise.resolve({ data: { id: {} }, status: 'success' });
      }),
    },
  };
});

const tableData = {
  request: {
    base: {
      gender: 'FEMALE',
    },
    other: {
      fourHigh: ['HYPERTENSION'],
    },
  },
};
afterAll(() => {
  wrapper = null;
});

describe('报告详情页面', () => {
  it('匹配快照', () => {
    // expect(wrapper).toMatchSnapshot();
  });
  it('测试条件渲染------useMemo不知道咋测呢~~', () => {
    // expect(api.report.getReportDetail).toHaveBeenCalledTimes(0);
    // wrapper.fetchTableData();
  });
});
