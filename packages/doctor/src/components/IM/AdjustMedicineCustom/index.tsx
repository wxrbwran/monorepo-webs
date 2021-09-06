/* eslint-disable no-param-reassign */
import React, { FC, useEffect } from 'react';
import dayjs from 'dayjs';
import { defaultAvatar } from 'xzl-web-shared/src/utils/consts';
import { getRole } from '@/utils/utils';
// import moment from 'moment';
import './index.scss';

interface IMsg {
  msg: {
    content: IContent;
    from: string;
    avatar: string;
    fromNick: string;
    custom: {
      fromUser: {
        role: string;
      }
    };
  };
}
interface IItem {
  id: number;
  name: string;
  plans: {
    originalCount: number;
    originalDate: string;
    adjustCount: number;
    adjustDate: string;
    dosageFormUnit: string;
    id: string;
    dosage: number
  }[]
}
interface IPlans {
  medicine: {
    name: string;
    medicineId: string;
    dosage: number;
    dosageFormUnit: string;
  };
  plans: IList[]
}
interface IContent {
  adjustMedicineList: IItem[],
  addMedicineList: IItem[],
  delMedicineList: IItem[],
  plans: IPlans[],
}

interface IList {
  name: string;
  id: string;
  dosageFormUnit: string;
  range: {
    start: number;
  };
  count: number;
  dosage: number;
}

const AdjustMedicineCustom: FC<IMsg> = (props) => {
  const { msg } = props;
  const content: IContent = msg.content?.msg
    ? JSON.parse(msg.content?.msg) : msg.content;
  const {
    adjustMedicineList, addMedicineList, delMedicineList, plans,
  } = content;

  // 新增序号标识
  const addIndex = adjustMedicineList ? adjustMedicineList.length + 1 : 1;
  // 停用序号标识
  let delIndex = 1;

  // 调整后服药计划
  const plansList: IList[] = [];
  plans?.forEach((item) => {
    item.plans.forEach((v) => {
      v.name = item.medicine.name;
      v.id = item.medicine.medicineId;
      v.dosage = item.medicine.dosage;
      v.dosageFormUnit = item.medicine.dosageFormUnit;
      plansList.push(v);
    });
  });
  useEffect(() => {
    if (adjustMedicineList && addMedicineList) {
      delIndex = adjustMedicineList.length + addMedicineList.length + 1;
    } else if (adjustMedicineList && !addMedicineList) {
      delIndex = adjustMedicineList.length + 1;
    } else if (addMedicineList && !adjustMedicineList) {
      delIndex = addMedicineList.length + 1;
    }
  }, []);
  const adjustMedicineInfo = (item: IItem) =>
    // 00:30 → 21:00 1.25片 → 1片 (修改了时间和剂量)
    // 07:00 0.5片 → 1.5片（只修改剂量）
    // 12:30 → 10:00 0.25片 (只修改时间)
    // 9:30 1片 (新增)
    // 07:00 1.5片(带删除线) (删除)
    // eslint-disable-next-line implicit-arrow-linebreak
    (
      <div>
        {
          !!item.plans && item.plans.map((v, index) => {
            const idx = index;
            return (
              <p key={`${item.id}${idx}`} className={!v.adjustDate && !v.adjustCount ? 'delete' : ''}>
                {!!v.originalDate && dayjs(v.originalDate).format('H:mm')}
                {!!v.originalDate && !!v.adjustDate ? ' → ' : ''}
                <span className={!(!v.adjustDate && !v.adjustCount) ? 'time' : ''}>
                  {!v.adjustDate && !v.adjustCount && <span>&nbsp;&nbsp;</span>}
                  {!!v.adjustDate && dayjs(v.adjustDate).format('H:mm')}
                </span>
                {!!v.originalCount && (v.originalCount + v.dosageFormUnit)}
                {!!v.originalCount && !!v.adjustCount ? ' → ' : ''}
                {!!v.adjustCount && (v.adjustCount + v.dosageFormUnit)}
              </p>
            );
          })
        }
      </div>
    );
  return (
    <div className="chat__item chat__doctor">
      <div className="chat__item-avatar">
        <img className="icon u-circle" alt="" src={msg.avatar || defaultAvatar} />
      </div>
      <div className="chat__item-content">
        <p className="msg-user">
          {`${msg.fromNick} (${getRole(msg.custom.fromUser?.role)})`}
        </p>
        <p className="msg-doctor patient-group-msg medicine">帮患者修改服药计划</p>
        <div className="msg-text adjust-medicine-msg">
          {!!adjustMedicineList
            && adjustMedicineList.map((item, index) => {
              const adjIdx = index;
              return (
                <div key={`${item.id}${adjIdx}`}>
                  <p>
                    {index + 1}
                    .【调整】
                    {item.name}
                  </p>
                  {adjustMedicineInfo(item)}
                </div>
              );
            })}
          {!!addMedicineList
            && addMedicineList.map((item, index) => {
              const addIdx = index;
              return (
                <div key={`${item.id}${addIdx}`}>
                  <p>
                    {addIndex + index}
                    .【新增用药】
                    {item.name}
                  </p>
                  <div>
                    {item.plans.map((list, pdx) => {
                      const spdx = pdx;
                      return (
                        <p key={`${list.id}${addIdx}${spdx}`}>
                          <span className="time">{dayjs(list.adjustDate).format('H:mm')}</span>
                          <span>{list.adjustCount}</span>
                          <span>{list.dosageFormUnit}</span>
                        </p>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          {!!delMedicineList
            && delMedicineList.map((item, index) => {
              const dIdx = index;
              return (
                <div key={`${item.id}${dIdx}`}>
                  <p>
                    {delIndex + index}
                    .【停用】
                  </p>
                  <p>
                    {item.name}
                  </p>
                </div>
              );
            })}
          <h3>调整后服药计划</h3>
          <ul>
            {
              plansList.length > 0
              && plansList.map((item, index) => {
                const pdx = index;
                return (
                  <li key={`${item.id}${pdx}`}>
                    <div className={index === 0 || item.name !== plansList[index - 1].name ? 'showname' : 'name'}>
                      {item.name}
                    </div>
                    <div>
                      <p className="time">{dayjs(item.range.start).format('H:mm')}</p>
                      <p>
                        <span>{item.count / 1000}</span>
                        <span>{item.dosageFormUnit}</span>
                      </p>
                    </div>
                  </li>
                );
              })
            }
          </ul>
        </div>
      </div>
    </div>
  );
};
export default AdjustMedicineCustom;
