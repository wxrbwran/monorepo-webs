import React, { useEffect } from 'react';
import { history } from 'umi';

export default function () {
  useEffect(() => {
    history.push('/doctor/patients/alone');
  });
  return (
    <div>
      跳转到首页~~~
    </div>
  );
}
