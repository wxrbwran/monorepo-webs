declare type TDocument = {
  id?: string;
  name?: string;
  sampleFrom?: string;
  part?: string;
  method?: string;
  data?: any[];
};

declare type TIndexItem = {
  id: string;
  type: string;
  name?: string;
  abbreviation?: string;
  common?: boolean;
  sampleFrom?: string;
  title: string;
  jcdName?: string;
  method?: string;
  source: string;
  sourceSid?: string;
  sid?: string;
  references?: TReference[]
};

declare type TReference = {
  type: string;
  value: string | null;
  secondValue: string | null;
  unit: string | null;
  note: string | null;
  isDefault: boolean;
};
