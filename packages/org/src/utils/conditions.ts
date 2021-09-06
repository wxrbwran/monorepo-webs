export const name = (value: string) => ({
  var: "sj.details->>'name'", // 筛选实体姓名
  operator: 'like',
  value,
});

const title = (value: string) => ({
  var: "sj.details->>'title'",
  value,
  operator: 'like',
});

const sRole = (value: string) => ({
  var: 'cr.s_role', // 筛选实体级别(普通：普通患者角色,vip患者角色)
  operator: '=',
  value,
});

export const searchOrgByNameOrAdminName = (value: string) => [
  {
    var: "sj.details->>'adminName',sj.details->>'name'", // 如果是搜索，如支持姓名、地址，则使用逗号分割
    operator: 'like',
    value,
  },
];

// const searchByName = (value: string): Store => name(value);

export const handleSelection = (allValues: Store): Store[] => {
  const selects = Object.keys(allValues)
    .filter((select) => !!allValues[select])
    .map((select) => {
      switch (select) {
        case 'title':
          return title(allValues[select]);
        case 's_role':
          return sRole(allValues[select]);
        case 'searchByName':
        case 'name':
          return name(allValues[select]);
        default:
          return {};
      }
    });
  return selects;
};

export default searchOrgByNameOrAdminName;
