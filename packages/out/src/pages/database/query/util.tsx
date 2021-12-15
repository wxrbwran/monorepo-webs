/* eslint-disable prefer-destructuring */
/* eslint-disable no-case-declarations */
import { Role } from 'xzl-web-shared/dist/src/utils/role';
import type { Store } from 'antd/lib/form/interface';

export const handleTableDataSource = (dataSource: Store[]) => {
  const res: Store[] = [];
  dataSource.forEach((tItem) => {
    let tmp = {};
    // 单独过滤出机构，与基本信息放一起，是为了保证表头顺序
    const orgName = tItem.members.filter((item: { role: string; }) => [Role.ORG.id].includes(item.role))[0].name;
    tItem.members.forEach((member: Store) => {
      // tmp = { ...tmp, teamNSId:  tItem.teamNSId }
      if ([Role.PATIENT.id, Role.PATIENT_VIP.id].includes(member.role)) {
        const { name, sex, age, address, sid } = member;
        tmp = { ...tmp, name, orgName, sex, age, province: address, sid };
      }
      // if ([Role.ORG.id].includes(member.role)) {
      //   tmp = { ...tmp, orgName: member.name}
      // }
      if (member.shqx) {
        tmp = { ...tmp, shqx: member.shqx };
      }
      if (member.xcg) {
        tmp = { ...tmp, xcg: member.xcg };
      }
      if (member.bcg) {
        tmp = { ...tmp, bcg: member.bcg };
      }
      if (member.xzcs) {
        tmp = { ...tmp, xzcs: member.xzcs };
      }
      if (member.xdt) {
        tmp = { ...tmp, xdt: member.xdt };
      }
      if (member.hypertension) {
        tmp = { ...tmp, hypertension: member.hypertension };
      }
      if (member.hyperglycemin) {
        tmp = { ...tmp, hyperglycemin: member.hyperglycemin };
      }
      if (member.hyperlipemia) {
        tmp = { ...tmp, hyperlipemia: member.hyperlipemia };
      }
      if (member.hyperuricemia) {
        tmp = { ...tmp, hyperuricemia: member.hyperuricemia };
      }
    });
    res.push(tmp);
  });
  return res;
};
export const handleBaseObj = (base: Store[]) => {
  const initObj: CommonData = {};
  base.forEach((item) => {
    switch (item.var) {
      case "(sj.details->>'age')::INTEGER":
        const ageArr = item.value.match(/\(([^)]*)\)/)[1].split(',');
        initObj.minAge = ageArr[0];
        initObj.maxAge = ageArr[1];
        break;
      case "(sj.details->>'height')::INTEGER":
        const heightArr = item.value.match(/\(([^)]*)\)/)[1].split(',');
        initObj.minHeight = heightArr[0];
        initObj.maxHeight = heightArr[1];
        break;
      case "(sj.details->>'weight')::INTEGER":
        const weightArr = item.value.match(/\(([^)]*)\)/)[1].split(',');
        initObj.minWeight = weightArr[0];
        initObj.maxWeight = weightArr[1];
        break;
      case "(sj.details->>'sex')::INTEGER":
        initObj.gender = item.value;
        break;
      default:
        break;
    }
  });
  return initObj;
};
