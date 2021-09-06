import React, { useEffect } from 'react';
import { Button, Result } from 'antd';
import config from '@/config';
import { history } from 'umi';

const NoFoundPage: React.FC = () => {
  useEffect(() => {
    window.location.href = config.LOGIN;;
  }, []);

  return (
    <Result
      status="404"
      title="404"
      subTitle="Sorry, the page you visited does not exist."
      extra={
        <Button type="primary" onClick={() => history.push('/')}>
          Back Home
        </Button>
      }
    />
  )
};

export default NoFoundPage;
