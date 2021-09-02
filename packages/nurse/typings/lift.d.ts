interface ILife {
  content: object;
  date: string,
  conditionType: string,
}
interface IFormatData {
  name?: string;
  value?: string;
}
interface IDiatContent {
  egg: {
    level: string;
    value: string;
  },
  fruit: {
    level: string;
    value: string;
  },
  mainFood: {
    level: string;
    value: string;
  },
  meat: {
    level: string;
    value: string;
  },
  milk: {
    level: string;
    value: string;
  },
  oil: {
    level: string;
    value: string;
  },
  salt: {
    level: string;
    value: string;
  },
  vegetable: {
    level: string;
    value: string;
  },
}
interface ISleepContent {
  sleepSituations: {
    question: string;
    sleepAnswer: string;
  }[]
}
interface ISportContent {
  heartRate: {
    monitor: boolean;
    value: number;
  };
  patterns: string[];
  regular: boolean
  strength: string;
  time: {
    level: string
    unit: string
    value: string
  }
}
interface IDiet {
  condition: IDiatContent,
  date: string,
  conditionType: string,
  createdAt: number;
  // realValue: string;
  // referenceValue: string;
  // status: string;
  // type: string;
  // unit: string;
}
interface ISleep {
  condition: ISleepContent,
  date: string,
  conditionType: string,
  createdAt: number;
  // realValue: string;
  // referenceValue: string;
  // status: string;
  // type: string;
}
interface ISport {
  condition: ISportContent,
  date: string,
  conditionType: string,
  createdAt: number;
  // referenceValue: string;
  // type: string;
  // unit: string;
}
