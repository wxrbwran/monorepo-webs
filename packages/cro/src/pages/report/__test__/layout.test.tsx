import * as React from 'react'
import { render, RenderResult, act, waitFor } from '@testing-library/react';
import EmptyReport from '../index';
import Layout from '../_layout';
import * as api from '@/services/api';
import { BrowserRouter as Router } from 'react-router-dom';
jest.mock("@/services/api", () => {
  return {
    report: {
      getProjectList: jest.fn(() => {
        return Promise.resolve({ apiInfos: [], status: 'success' });
      })
    }
  };
});
let wrapper: RenderResult;
describe('报告的layout', () => {
  const emptyProps = {
    location: {
      pathname: 'report',
      query: {
        reportId: '',
      },
    },
  }
  const detailProps = {
    location: {
      pathname: 'report/detail',
      query: {
        reportId: '5Z7g7r',
      },
    },
  }
  it('匹配快照', () => {
    expect(wrapper).toMatchSnapshot();

  })
  it('不存在报告列表时，左侧不显示报告列表', async() => {
    wrapper = render(<Router>
      <Layout {...emptyProps}>
        <EmptyReport />
      </Layout>
    </Router >)
    await waitFor(() => {
      expect(api.report.getReportList).toBeCalled();
    })
    expect(wrapper.container.querySelector('.table-list')).toBeNull();
  })
})
