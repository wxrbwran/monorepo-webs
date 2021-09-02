import React from 'react';

export const itemRender = (current: number, type: string, originalElement: any) => {
  console.log(current);
  if (type === 'prev') {
    return <span>上一页</span>;
  } if (type === 'next') {
    return <span>下一页</span>;
  }
  return originalElement;
};

export const pageRender = (pagination: any) => {
  console.log('333pagination', pagination);
  if (!pagination.total || pagination.total <= pagination.pageSize) {
    return false;
  }
  return ({
    ...pagination,
    current: pagination.pageAt,
    showQuickJumper: true,
    itemRender,
  });
};
