declare type TIndexItem = {
  id: string;
  type: string;
  name?: string;
  sampleFrom?: string;
  title: string;
  jcdName?: string;
  method?: string;
  source: string;
  sourceSid?: string;
  sid?: string;
};

declare type TReference = {
  type: string;
  value: string | null;
  secondValue: string | null;
  unit: string | null;
  note: string | null;
  isDefault: boolean;
};


