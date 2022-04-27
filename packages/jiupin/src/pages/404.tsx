import React from 'react';
import { Button, Result } from 'antd';
import { history } from 'umi';

const NoFoundPage: React.FC = () => {
  return (
    <Result
      status="404"
      title="404"
      subTitle="抱歉，您访问的页面不存在。"
      extra={
        <Button type="primary" onClick={() => history.push('/personnel/org-structure')}>
          去首页
        </Button>
      }
    />
  );
};

export default NoFoundPage;
