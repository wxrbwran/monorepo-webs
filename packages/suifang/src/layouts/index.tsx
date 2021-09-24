import React from 'react';
import SecurityLayout from './SecurityLayout';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/es/locale/zh_CN';
// import 'moment/locale/zh-cn';
// import moment from 'moment';
// moment.locale('zh-cn');
interface IProps {
  location: {
    query: { token: string };
    hash: string;
  };
  children: React.ReactElement;
}
export default (props: IProps) => {
  return (
    <ConfigProvider locale={zhCN}>
      <SecurityLayout location={props.location}>{props.children}</SecurityLayout>
    </ConfigProvider>
  );
};
