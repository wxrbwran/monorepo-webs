import React from 'react';
import {projectDefaultImg} from '@/utils/consts';
import { Link } from 'umi';
import styles from '../tab-bar/index.scss';

interface IProps {
  data: any
}
function ProjectItem({ data }: IProps) {
  console.log(8888, data);
  return (
    <>
      <h3>{data.title}</h3>
        <div className={styles.proj_item}>
          {
            data.data.map((item)=>(
              <Link to={`proj_detail?projectSid=${item.projectSid}&projectName=${item.name}`}>
                <p key={item.id}>
                  <span className={styles.proj_name}>{item.name}</span>
                  <img src={item.detail.avatarUrl ? item.detail.avatarUrl : projectDefaultImg[0]} />
                </p>
              </Link>
            ))
          }
        </div>
    </>
  )
}
export default ProjectItem;
