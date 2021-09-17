import React from 'react';
import countIcon from '@/assets/img/count.png';
import type { ICountItem } from '@/types/clinical';

function CountItem(props: { data: ICountItem, projectData: CommonData}) {
  const { countKey, desc, unit } = props.data;
  return (
    <div className="flex items-center mb-60">
      <img className="mr-10 w-35" src={countIcon} alt="统计"/>
      <div>
        <div className="text-xl">{props.projectData[countKey]}{unit || '个'}</div>
        <div className="black-65">{desc}</div>
      </div>
    </div>
  )
}
export default CountItem;
