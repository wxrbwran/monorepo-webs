declare interface IImgTypeItems {
  indexId: string;
  name: string;
  abbreviation: string;
  value?: number;
  unit?: string;
  imageType: string;
  unitList: {
    min: number;
    max: number;
    unit?: string;
  }[]
}
declare interface IImgTypeListItem {
  items: IImgTypeItems[];
  imageType: string;
  imageTypeStatus: string;
  typeName?: string;
  measuredAt: number;
  subCategory: boolean;
  allSubCategoryNameList?: string[];
  selectedSubCategoryNameList?: string[];
  commonItems: ICommonItem[];
  noCommonItems: ICommonItem[];
}

// 图片类型对应的指标信息
declare interface ICommonItem {
  common: boolean;
  indexIdNew: string;
  name: string;
  units?: string[];
  abbreviation?: string;
  value?: string;
  unit?: string;
  subCategoryName?: string;
  formIndex: number; // 自己增加的索引标识
}
