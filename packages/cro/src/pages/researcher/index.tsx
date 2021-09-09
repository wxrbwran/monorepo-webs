import React, { useEffect } from 'react';
import { history } from 'umi';

export default () => {
  useEffect(() => {
    history.replace(`/researcher/member`);
  }, [])
  return (
    <div> </div>
  );
}
