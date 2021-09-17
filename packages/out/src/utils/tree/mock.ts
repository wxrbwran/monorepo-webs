const rootData: any = {
  rootName: '心之力医院',
  downward: {
    direction: 'downward',
    name: 'origin',
    // children: []
    children: [
      {
        name: '呼吸科',
        hasHumanholding: true,
        hasChildren: true,
        isExpand: true,
        children: [
          {
            name: '医生团队',
            hasHumanholding: true,
            hasChildren: true,
            isExpand: true,
            children: [
              {
                name: '张三',
                hasHumanholding: false,
                hasChildren: false,
                desc: '主任医师',
              },
            ],
          },
          {
            name: '护士团队',
            hasHumanholding: true,
            hasChildren: true,
            isExpand: true,
            children: [
              {
                name: '张护士',
                hasHumanholding: false,
                hasChildren: false,
                // desc: '主任医师',
              },
            ],
          },
        ],
      },
      {
        name: '肿瘤科',
        hasHumanholding: true,
        hasChildren: true,
        isExpand: true,
        children: [
          {
            name: '医生团队',
            hasHumanholding: true,
            hasChildren: true,
            isExpand: true,
            children: [
              {
                name: '李四',
                hasHumanholding: false,
                hasChildren: false,
                desc: '主任医师',
              },
            ],
          },
          {
            name: '护士团队',
            hasHumanholding: true,
            hasChildren: true,
            isExpand: true,
            children: [
              {
                name: '张护士',
                hasHumanholding: false,
                hasChildren: false,
                // desc: '主任医师',
              },
            ],
          },
        ],
      },
    ],
  },
  upward: {
    direction: 'upward',
    name: 'origin',
    // children: []
    children: [
      {
        name: '上海唯猎',
        hasHumanholding: false,
        amount: '100',
        ratio: '55%',
        children: [
          {
            name: '名字',
            hasHumanholding: false,

            children: [],
          },
          {
            name: '名字',
            hasHumanholding: false,
            isExpand: false,

            children: [
              {
                name: '名字',
                hasHumanholding: false,

                children: [],
              },
              {
                name: '名字',
                hasHumanholding: false,

                children: [],
              },
            ],
          },
          {
            name: '名字',
            hasHumanholding: false,

            children: [],
          },
        ],
      },
      {
        name: '上海唯猎创业投资中心(有限合伙)',
        hasHumanholding: false,
        amount: '100',
        ratio: '55%',
        children: [
          {
            name: '名字',
            hasHumanholding: false,

            children: [],
          },
          {
            name: '名字',
            hasHumanholding: false,
            isExpand: false,

            children: [
              {
                name: '名字',
                hasHumanholding: false,

                children: [],
              },
              {
                name: '名字',
                hasHumanholding: false,

                children: [],
              },
            ],
          },
          {
            name: '名字',
            hasHumanholding: false,

            children: [],
          },
        ],
      },
    ],
  },
};

export default rootData;
