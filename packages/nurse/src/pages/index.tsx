import React, { useEffect } from 'react';
import { history } from 'umi';

export default function () {
  useEffect(() => {
    history.push('/patients');
  });
  return (
    <div>
      跳转到首页~~~
    </div>
  );
}
