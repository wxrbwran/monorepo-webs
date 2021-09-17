/**
 * Created by wuxiaoran on 2019/3/6.
 */
import React from 'react';

interface IPros {
  error: {
    message: string;
  };
  info: {
    componentStack: string;
  };
}

const Fallback = (props: IPros) => (
  <div>
    <h1>页面出错，请检查！</h1>
    <details>
      ====================Error Message:
      <p>{props.error.message}</p>
      ====================componentStack:
      <p>{props.info.componentStack}</p>
      ====================Info:
      <p>{ JSON.stringify(props) }</p>
    </details>
  </div>
);



export default Fallback;
