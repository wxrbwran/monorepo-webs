import React from 'react';
import noTable from '@/assets/img/icon_nodata_xj.png';
import { Button } from 'antd';
import { Link, useParams } from 'umi';

export default () => {
  const { type } = useParams<{ type: string }>();
  return (
    // 无主观量表展示
    <div className="flex items-center justify-center flex-col" style={{ paddingTop: 200 }}>
      <img className="w-100 h-100" src={noTable} alt="暂无宣教" />
      <Button type="primary" >
        <Link to={`/publicize/${type}/create`}>立即创建</Link>
      </Button>
    </div>
  );
};
