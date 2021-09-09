import React, { useEffect, useRef, useState } from 'react';
import TreeChart from './TreeChart';
import fullScreenn from '@/assets/img/full_screen.svg';
import * as api from '@/services/api';
import { useSelector } from 'umi';
import styles from './index.scss';
import { IState } from 'typings/global';
import { ITree } from 'typings/researcher';
import { fetchRolePropValue } from 'xzl-web-shared/src/utils/role';
function Tree() {
  const tree = useRef();
  const [isFull, setFull] = useState(false);
  const { projectNsId } = useSelector((state: IState) => state.project.projDetail);

  const renderItem = (tree: ITree) => {
    return (
      {
        level: fetchRolePropValue(tree.role, 'desc'),
        name: tree.name || '暂未分配',
        firstProfessionCompany: tree?.subjectDetail?.firstProfessionCompany || '',
        group: tree.groupName,
        hasChildren: !!tree?.subWC?.length,
        subjectId: tree?.subjectId || '',
        children: !!tree?.subWC?.length ? renderTree(tree.subWC) : []
      }
    )
  }
  const renderTree = (subTree: ITree[]) => {
    let treeList: any[] = [];
    subTree.forEach((tree: ITree, index: number)=> {
      treeList.push(renderItem(tree));
    })
    return treeList;
  }

  const fetchFrameChart = () => {
    api.research.fetchFrameChart(projectNsId).then(res => {
      const treeD = {
        rootName: res.name,
        downward: renderItem(res)
      }
      // mock的数据在./mock.ts文件中，可直观看到数据结构
      const chart = new TreeChart(treeD);
      chart.drawChart();
    })
  }

  useEffect(() => {
    fetchFrameChart();
  }, []);

  const handleFullScreen = () => {
    if (isFull) {
      document.exitFullscreen();
      setFull(false);
    } else {
      setFull(true);
      tree.current.requestFullscreen();
    }
  };
  return (
    <div className={styles.tree} ref={tree}>
      <div className={styles.title}>
        <div className={styles.full} onClick={handleFullScreen}>
          <img src={fullScreenn} alt="全屏查看" />
          <span>{isFull ? '退出全屏' : '全屏查看'}</span>
        </div>
      </div>
      <div className={styles.position}>
        <span>我的位置:</span>
        <span className={styles.label}></span>
      </div>
      <div className={styles.content}>
        <div className="container" id="treecontainer">
          <div id="product_tree" className={styles.SVG} />
        </div>
      </div>
    </div>
  );
}

export default Tree;
