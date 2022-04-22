// https://procomponents.ant.design/components/layout/#route

export const page404 = {
  component: './404',
};
const routes = [
  {
    path: '/',
    component: '../layouts/index',
    menu: {
      flatMenu: true,
      menuRender: false,
    },
    routes: [
      {
        path: '/login',
        layout: false,
        lacale: false,
        component: './user/login',
      },
      // {
      //   path: '/find_pwd',
      //   layout: false,
      //   lacale: false,
      //   component: './user/find_pwd',
      // },
      {
        path: '/personnel',
        name: '人员管理',
        icon: 'icon-renyuanguanli',
        component: './personnel',
        routes: [
          {
            path: 'org-structure',
            name: '组织架构',
            icon: 'crown',
            hideInMenu: true,
            component: './personnel/org-structure',
          },
          {
            path: 'role-list',
            name: '角色',
            hideInMenu: true,
            component: './personnel/role-list',
          },
          page404,
        ],
      },
      {
        path: '/service-type',
        name: '服务管理',
        icon: 'icon-zhihuishenghuo--fuwuguanli',
        component: './service-type',
        local: false,
      },
      page404,
    ],
  },
];
export default routes;
