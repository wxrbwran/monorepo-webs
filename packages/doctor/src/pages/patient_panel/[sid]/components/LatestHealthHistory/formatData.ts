interface IItem {
  high: number;
  low: number;
  value: number;
  type: string;
}
interface IInfoListItem {
  infoList: IItem[];
  measuredAt: string;
}
interface IInfoList {
  list: IInfoListItem[]
}

interface ICustomList {
  headList: string[];
  valueList: number[];
}

interface IImgType {
  dataList: object[]
}
export const formatData = (
  data: IInfoList | ICustomList | IImgType,
  tabType: string, paramsPageAt: number,
) => {
  let dataList:any[] = [];
  if (['BP', 'GLU', 'WEIGHT', 'STEP'].includes(tabType)) {
    (data as IInfoList).list.forEach((info: IInfoListItem) => {
      let newItem: CommonData = {
        measuredAt: info.measuredAt,
      };
      info.infoList.forEach((item: IItem) => {
        const {
          high, low, value, type,
        } = item;
        if (type === 'BP') {
          newItem = {
            ...newItem,
            high,
            low,
          };
        } else {
          newItem[type] = value;
        }
      });
      console.log('dataList3331', dataList);
      dataList.push(newItem);
    });
  } else if (tabType === 'CUSTOM') {
    const { headList, valueList } = data as ICustomList;
    if (headList.length > 0) {
      dataList = [
        [
          '时间',
          ...headList,
        ],
        ...valueList,
      ];
      if (paramsPageAt !== 1) { dataList.shift(); }
    }
  } else {
    dataList = (data as IImgType).dataList;
  }
  return dataList;
};

export const fetchTypeList = (tabType: string) => {
  if (tabType === 'BP') {
    return ['BP', 'HEART_RATE'];
  } else if (tabType === 'GLU') {
    return [
      'GLU_AFTER_BREAKFAST',
      'GLU_AFTER_DINNER',
      'GLU_AFTER_LUNCH',
      'GLU_BEFORE_BREAKFAST',
      'GLU_BEFORE_DINNER',
      'GLU_BEFORE_LUNCH',
      'GLU_BEFORE_SLEEP',
    ];
  } else {
    return [tabType];
  }
};
