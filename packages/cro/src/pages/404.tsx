import { Button, Result, Divider } from 'antd';
import React from 'react';
import { history } from 'umi';
import errorIcon from '@/assets/img/404.png';


const NoFoundPage: React.FC<{}> = () => (
  <Result
    subTitle={
      <div style={{fontSize: 20}} className="error-subtitle">迷失在科研的海洋</div>
    }
    icon={
      <img style={{width: 260,height: 260}} src={errorIcon} alt="" />
    }
    extra={
      <Button type="primary" onClick={() => history.push('/home')}>
        重新加载
      </Button>}
  />
  
);

export default NoFoundPage;

// import React from 'react';
// export default () => {
//   rerutn (
//     <div>404</div>
//   )
// }