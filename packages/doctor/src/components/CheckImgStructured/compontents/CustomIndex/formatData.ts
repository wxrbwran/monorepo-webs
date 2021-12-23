type IIndexItemCustom = {
  formIndex: number; // 自己补充的必要属性，每个指标的固定key值
} & IIndexItem;

interface IInitList {
  commonItems: IIndexItemCustom[];
  noCommonItems: IIndexItemCustom[];
}

export const formatSubmitItems = (data: CommonData, length: number) => {
  const inspections = [];
  for (let i = 0; i < length; i++) {
    const newItem: CommonData = {
      indexId: data[`${i}_indexId`],
      name: data[`${i}_name`],
      abbreviation: data[`${i}_abbreviation`],
      referenceList: [],
      originReferences: data[`${i}_referenceList`].map((r: any) => {
        r.referenceId = r.id;
        return r;
      }),
    };

    // 处理参考值
    const count = data[`${i}_valueCount`];
    for (let j = 0; j < count; j++) {
      let tmp: any = {};
      if (data[`${i}_${j}_indexValue`]) {
        tmp.indexValue = data[`${i}_${j}_indexValue`];
      }
      if (data[`${i}_${j}_reference`] && data[`${i}_referenceList`].length > 0) {
        const curReference: TReference = data[`${i}_referenceList`]
          .filter((r: TReference) => r.id === data[`${i}_${j}_reference`])[0] || [];
        tmp = { ...tmp, ...curReference };
      }
      newItem.referenceList.push({ ...tmp });
      tmp = null;
    }
    // 如果指标来源是DOCTOR，并且指标的sourceSid不是当前医生的sid，需要把当前医生的sid传过去
    if (data[`${i}_source`] === 'DOCTOR' && (data[`${i}_sourceSid`] !== window.$storage.getItem('sid'))) {
      newItem.sourceSid = window.$storage.getItem('sid');
      newItem.source = 'DOCTOR';
    }
    inspections.push(newItem);
  }
  return inspections;
};

// 由于：1.存在常用指标和非常用指标情况，
// 2.有子分类的话，会根据不同分类点击tab展示，但是数据是融合在一个list里，点击哪个tab过滤哪个数据，
// 此时不好定位出索引位置。所以在设置数据源时，就把索引位置加好。后面formitem直接使用即可
export const formatDataAddIndex = (data: IInitList, addIndexNum: number) => {
  const newData = data;
  newData.commonItems = data.commonItems.map((item:any, inx: number) => {
    // 当添加条数大于0时，表示有当前新增指标，需要把新增指标的索引设置为最大的(常用+不常用总条数 - 1)，防止影响之前用户已输入的数据值
    // 例 commonItems条数=3，  noCommonItems = 2， addIndexNum = 2
    // 第一次循环  2>0        3 + 2 - 1 - 0 = 4
    // 第二次循环  2>1        3 + 2 - 1 - 1 = 3
    // 第三次循环  2>2不成立   2 - 2 = 0
    // 第四次循环  2>3不成立   3 - 2 = 1
    // 第五次循环  2>4不成立   4 - 2 = 2
    const baseInx = addIndexNum > inx
      ? data.commonItems.length + data.noCommonItems.length - 1 - inx
      : inx - addIndexNum;
    return {
      ...item,
      formIndex: item.formIndex ?? baseInx, // 如果存在formIndex那就用最初的，此值一经确定就不在改变
    };
  });
  newData.noCommonItems = data.noCommonItems.map((item:IIndexItem, inx: number) => {
    // 从常用指标的基础上开始累加,但不包括新添加的指标，这里减去。因为新添加的指标是在所有指标的基础上开始的索引
    const baseInx = data.commonItems.length - addIndexNum;
    return {
      ...item,
      formIndex: item.formIndex ?? baseInx + inx,
    };
  });
  console.log('newData23222', newData);
  return newData;
};
