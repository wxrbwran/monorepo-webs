import React, { useEffect, useState } from 'react';
import { Tree, Spin } from 'antd';
import ArchitectureTreeItem from '../ArchitectureTreeItem';
import { CaretDownOutlined } from '@ant-design/icons';
import PeopleGroup from '@/assets/img/icon_people_group.svg';
import { fetchRolePropValue } from 'xzl-web-shared/src/utils/role';import styles from './index.scss';
import { IState } from 'typings/global';
import { useSelector } from 'umi';
import { ITree } from 'typings/researcher';

function architecture() {
  const [treeData, setTreeData] = useState<ITree[]>([]);
  const [memberCount, setMemberCount] = useState(0);
  const { projectNsId, roleType } = useSelector((state: IState) => state.project.projDetail);
  const fetchData = () => {
    console.log(888899)
    window.$api.research.fetchMemberFrame(projectNsId).then((res: ITree) => {
      setTreeData(renderTree([res], '0'));
    })
  }
  useEffect(() => {
    fetchData();
     // 查询成员医生统计信息
     window.$api.research.fetchMemberStatistics({
      projectNsId,
    }).then((res: { count: number }) => {
      setMemberCount(res.count)
    })
  }, [])

  const renderTree = (subTree: ITree[], parentKey: string) => {
    let treeList: any[] = [];
    subTree.forEach((tree: ITree, index: number)=> {
      console.log('tree2121', tree)
      const key = `${parentKey}-${index}`;
      treeList.push({
        // roleId是为了兼容指定成员时使用
        title:<ArchitectureTreeItem data={{...tree, roleId: tree.role}} refresh={fetchData} />,
        key: tree.nsId,
        children: tree.subWC ? renderTree(tree.subWC, key) : []
      })
    })
    return treeList;
  }

  return (
    <div className={styles.architecture}>
      <header>
        <div className={styles.left}>
          <h2>架构</h2>
          <img src={PeopleGroup} alt="成员数" />
          <span>{memberCount}</span>
        </div>
        {
          roleType.split('.')[1] !== 'aeJk0w' && (
            <div className={styles.right}>
            您是{fetchRolePropValue(roleType as string, 'desc')}
          </div>
          )
        }
      </header>
      <div className={styles.line}></div>
      <div className={styles.tree}>
        {
          treeData.length === 0 ? <Spin /> : (
            <Tree
              showLine
              switcherIcon={<CaretDownOutlined />}
              // defaultExpandedKeys={['0-0-0']}
              defaultExpandAll={true}
              treeData={treeData}
              blockNode={true}
              defaultCheckedKeys={['0-0-0']}
            />
          )
        }
      </div>
    </div>
  )
}

export default architecture;
