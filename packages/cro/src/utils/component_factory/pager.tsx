/**
 * Created by wuxiaoran on 2019/2/19.
 */
import React from 'react';

export const itemRender = (current:number, type:string, originalElement:any) => {
  if (type === 'prev') {
    return <a>上一页</a>;
  } if (type === 'next') {
    return <a>下一页</a>;
  }
  return originalElement;
};

export const pageRender = (pagination: any) => {
  // console.log(pagination);
  if (!pagination.total || pagination.total < pagination.pageSize) {
    return false;
  }
  return (Object.assign({}, pagination, {
    showQuickJumper: true,
    position: ['bottomCenter'],
    itemRender,
  }));
};
