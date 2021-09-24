
interface queryBase {
  gender?: string;
  maxAge?: number;
  minAge?: number;
  maxHeight?: number;
  minHeight?: number;
  maxWeight?: number;
  minWeight?: number;
}
interface queryImage {
  imageType: string;
  startAt: number | null;
  endAt: number | null;
}
interface queryOther {
  fourHigh?: string[]
}
interface QueryModelState {
  base: queryBase;
  images: queryImage[];
  other: queryOther;
  queryScope: CommonData;
  baseCondition: any;
}
interface IQuery {
  query: QueryModelState;
}
interface ITableData {
  members: [];
}
interface IDataSource {
  // images?: string[];
  // id: string;
  age: string;
  name: string;
  orgName: string;
  province: string;
  sex: string;
  sid: string;
  shqx: string;
  xcg: string;
  bcg: string;
  xzcs: string;
  xdt: string;
  hypertension: string;
  hyperglycemin: string;
  hyperlipemia: string;
  hyperuricemia: string;
}

interface IRepotCon {
  condition: {
    base:[]
    images: queryImage[];
    other: queryOther;
    queryScope: CommonData;
  }
  teams: []
}
