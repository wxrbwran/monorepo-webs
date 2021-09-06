import type { FC} from 'react';
import React, { useEffect, useState, useRef } from 'react';
import Tree from '@/utils/tree';
// import rootData from '@/utils/tree/mock';
import * as api from '@/services/api';
import { Role } from '@/utils/role';
import { isOpenSub as getIsOpenSub, upperOrgNsId } from "@/utils/tools";
import styles from './index.scss';

interface IStaff {
  ioRoleType: string;
  staffName: string;
}
interface IDepartment {
  departmentName: string;
  staffMembers: IStaff[];
}
interface ITreeItem {
  name: string;
}
const OrgTree: FC = () => {
  const [isFull, setFull] = useState(false);
  const tree = useRef();
  const isOpenSub = getIsOpenSub();

  const getTeams = (teams: IStaff[]) => {
    // 过滤出护士团队与医生团队
    const doctors: ITreeItem[] = [];
    const nurses: ITreeItem[] = [];
    teams.forEach((item: IStaff) => {
      const newD = { name: item.staffName };
      if (item.ioRoleType === Role.DOCTOR.id) {
        doctors.push(newD);
      } else if (item.ioRoleType === Role.NURSE.id) {
        nurses.push(newD);
      }
    })
    return [doctors, nurses];
  }
  const renderTree = () => {
    let nsId = window.$storage.getItem('nsId')!;
    if (isOpenSub) { nsId = upperOrgNsId()!};
    api.org.getDepartmentTree(nsId).then(res => {
      const formatData: any[] = [];
      res.departmentTrees.forEach((item: IDepartment) => {
        const [doctorList, nurseList] = getTeams(item.staffMembers)
        const formatItem = {
          name: item.departmentName,
          children: [
            {
              name: '医生团队',
              children: doctorList.length > 0 ? [...doctorList] : null
            },{
              name: '护士团队',
              children: nurseList.length > 0 ? [...nurseList] : null
            },
          ]
        }
        formatData.push(formatItem)
      })
      const orgName = isOpenSub ? sessionStorage.getItem('upperOrgName') : window.$storage.getItem('orgName');
      const treeData = {
        rootName: orgName || '医院',
        downward: {
          direction: 'downward',
          name: 'origin',
          children: formatData
        },
        upward: {
          direction: 'upward',
          name: 'origin',
          children: []
        }
      }
      // @ts-ignore
      const chart = new Tree({  data: treeData, directions: ['downward'] });
      chart.drawChart();
    })
  }
  const escFunction = () => {
    setFull((prevFill) => !prevFill);
  }
  useEffect(() => {
    renderTree();
    // 监听退出全屏事件 --- chrome 用 esc 退出全屏并不会触发 keyup 事件
    document.addEventListener("webkitfullscreenchange", escFunction); /* Chrome, Safari and Opera */
    document.addEventListener("mozfullscreenchange", escFunction); /* Firefox */
    document.addEventListener("fullscreenchange", escFunction); /* Standard syntax */
    document.addEventListener("msfullscreenchange", escFunction); /* IE / Edge */
    return () => {
      document.removeEventListener("webkitfullscreenchange", escFunction);
      document.removeEventListener("mozfullscreenchange", escFunction);
      document.removeEventListener("fullscreenchange", escFunction);
      document.removeEventListener("MSFullscreenChange", escFunction);
    }
  }, []);
  const handleFullScreen = () => {
    if (isFull) {
      document.exitFullscreen();
      // setFull(false);
    } else {
      // setFull(true);
      tree.current.requestFullscreen();
    }
  };
  return (
    <div style={{ height: '100%' }} className="bg-white" ref={tree}>
      <div
        className="bg-blue-100 py-15 text-right text-blue-500 pr-10 text-base cursor-pointer"
        onClick={handleFullScreen}
      >
        <span>{isFull ? '退出全屏' : '全屏查看'}</span>
      </div>
      <div id="product_tree" className={styles.product_tree} style={{ height: '100%' }}></div>
    </div>
  );
};

export default OrgTree;
