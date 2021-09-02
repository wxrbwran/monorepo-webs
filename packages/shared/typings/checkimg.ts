declare interface IImgTypeItems {
  indexId: string;
  name: string;
  abbreviation: string;
  value?: number;
  unit?: string;
  imageType: string;
  imageTypeNew: string;
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

// 结构化回显时返回的数据item 和搜索指标或单据名字时返回的数据item。
export interface IDocmentItem {
  // 回显时
  indexList?: IImgTypeItems[]; // 指标列表
  sampleFroms?: string[], // 来源  *是数组

  // 回显和搜索单据+指标时共有的
  documentId: string; // 单据id
  documentName: string; // 单据名称
  documentType?: 'HYD', // 单据类型 回显时有此字段
  source: string; // 添加来源DOCTOR   SYSTEM
  common?: boolean;

  // 搜索单据+指标时
  firstIndex?: string; // 渲染时使用
  name?: string; // 指标name
  id?: string; // 指标id
  sampleFrom?: string; // 来源   * string
  sourceSid?: string; // 指标添加人的sid
}
export interface IIndexItemApi {
  advice?: string[];
  common: boolean;
  indexId: string;
  name: string;
  source: string;
  sourceSid: string;
  units?: string[];
  value: string;
  advices: string[];
}

export interface IDocmentItemApi {
  documentId: string; // 单据id
  documentName: string; // 单据名称
  documentType?: 'HYD'; // 单据类型 回显时有此字段
  sampleFroms: string[];
  indexList: IIndexItemApi[]
}

export interface ITypeItem {
  firstIndex?: string;
  sampleFrom: string; // 来源
  documentName: string; // 单据（大分类）name
  name: string; // 指标name
  id: string; // 指标id
  documentId: string; // 单据id
  sourceSid: string;
}
