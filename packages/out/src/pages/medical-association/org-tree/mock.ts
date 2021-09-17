const rootData: any = {
  rootName: '心之力医院',
  downward: {
    direction: 'downward',
    name: 'origin',
    hasChildren: true,
    children: [
      {
        name: '华润健一',
        hasHumanholding: true,
        hasChildren: false,
        isExpand: true,
      },
      {
        name: '霖海市中医院',
        hasHumanholding: false,
        hasChildren: false,
        isExpand: true,
        amount: '100',
        ratio: '55%',
      },
      {
        name: '北方人民医院',
        hasHumanholding: false,
        hasChildren: false,
        isExpand: true,
        amount: '100',
        ratio: '55%',
      },
      {
        name: '中山街道社区医院',
        hasHumanholding: false,
        hasChildren: false,
        isExpand: true,
        amount: '100',
        ratio: '55%',
      },
      {
        name: '益海总医院',
        hasHumanholding: false,
        hasChildren: false,
        isExpand: true,
        amount: '100',
        ratio: '55%',
      },
    ],
  },
  upward: {
    direction: 'upward',
    name: 'origin',
    hasChildren: true,
    children: [
      {
        name: '临汾人民医院',
        hasChildren: false,
        hasHumanholding: false,
        amount: '100',
        ratio: '55%',
      },
      {
        name: '霖海第二医院',
        hasChildren: false,
        hasHumanholding: false,
        amount: '100',
        ratio: '55%',
      },
    ],
  },
};

export default rootData;
