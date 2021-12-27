import type { FC } from 'react';
import React, { useEffect, useState, useRef } from 'react';
import Tree from '@/utils/tree';
import { FullscreenExitOutlined, FullscreenOutlined } from '@ant-design/icons';
// import rootData from './mock';
import * as api from '@/services/api';
import styles from './index.scss';

interface IOrg {
  orgName: string;
}
const OrgTree: FC = () => {
  const [isFull, setFull] = useState(false);
  const tree = useRef();

  const drawTree = () => {
    api.org.getOrgUnionStatsGraph().then(res => {
      const rootData = {
        rootName: window.$storage.getItem('orgName') || '医院',
        downward: {
          direction: 'downward',
          name: 'origin',
          children: res.lower.map((item: IOrg) => ({ name: item.orgName })),
        },
        upward: {
          direction: 'upward',
          name: 'origin',
          children: res.upper.map((item: IOrg) => ({ name: item.orgName })),
        },
      };
      // @ts-ignore
      const chart = new Tree({
        data: rootData,
        directions: ['downward', 'upward'],
        borderColor: {
          upward: '#81D3F8',
          downward: '#F59A23',
        },
      });
      chart.drawChart();
    });
  };
  const escFunction = () => {
    setFull((prevFill) => !prevFill);
  };
  useEffect(() => {
    drawTree();
    // 监听退出全屏事件 --- chrome 用 esc 退出全屏并不会触发 keyup 事件
    document.addEventListener('webkitfullscreenchange', escFunction); /* Chrome, Safari and Opera */
    document.addEventListener('mozfullscreenchange', escFunction); /* Firefox */
    document.addEventListener('fullscreenchange', escFunction); /* Standard syntax */
    document.addEventListener('msfullscreenchange', escFunction); /* IE / Edge */
    return () => {
      document.removeEventListener('webkitfullscreenchange', escFunction);
      document.removeEventListener('mozfullscreenchange', escFunction);
      document.removeEventListener('fullscreenchange', escFunction);
      document.removeEventListener('MSFullscreenChange', escFunction);
    };
  }, []);
  const handleFullScreen = () => {
    if (isFull) {
      document.exitFullscreen();
    } else {
      tree.current.requestFullscreen();
    }
  };
  return (
    <div style={{ height: '100%' }} className="bg-white" ref={tree}>
      <div
        className="bg-blue-100 py-15 text-right text-blue-500 pr-10 text-base cursor-pointer"
        onClick={handleFullScreen}
      >
        {
          isFull ? (
            <span><FullscreenExitOutlined />退出全屏</span>
          ) : (
            <span><FullscreenOutlined /> 全屏查看</span>

          )
        }
      </div>
      <div className="absolute right-50">
        <div className="flex justify-end mb-20 mt-20 ">
          <div className="border border-solid w-60 h-25 " style={{ borderColor: '#81D3F8' }}></div>
          <div className="text-sm">：上级医院</div>
        </div>
        <div className="flex justify-end">
          <div className="border border-solid w-60 h-25 " style={{ borderColor: '#F59A23' }}></div>
          <div className="text-sm">：下级医院</div>
        </div>
      </div>
      <div id="product_tree" className={`mt-60 ${styles.product_tree}`} style={{ height: '100%' }}></div>
    </div>
  );
};

export default OrgTree;
