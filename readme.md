## 使用pnpm及monorepo重新设计xzl-web关联项目

### 项目现状

1. 项目依赖安装慢（200s-300s），开发冷启动慢(90s左右)。
2. 项目分散...
3. 医生端，护士端，管理端，院外端，各个项目独立开发，逻辑清晰。但是存在**公共组件/公共库****复用**困难的问题。
  - 以前方案: 提炼公共库（容易）; 提炼公共组件（麻烦, 可能掺杂业务逻辑）;

### 解决方案
1. 慢的问题
   - 包管理工具切换至pnpm，取代npm/yarn。pnpm提供中央仓库，每次安装时判断是否命中仓库缓存，命中的话从仓库复制到项目，
     未命中则下载到仓库，pnpm再复制到项目。这样的话，初首次使用pnpm安装依赖外，安装依赖时间压缩至10-20s内。
2. 分散及复用的问题
   - 借用[pnpm](https://pnpm.io/zh/workspaces)的**workspace**能力，管理项目间的依赖关系 -> monorepo。

### shared包
**项目开发时涉及到同时修改shared库**:
开发时如果涉及到shared包，需先进入到shared项目进行watch。
```sh
pnpm build-ts-watch
pnpm build-css-watch
```
在进入web项目，必须使用```pnpm dev-shared```等，避免使用mfsu，shared库更新时，实时同步到umi的node_modules

**项目开发时未涉及到同时修改shared库**：

 直接使用 ```pnpm dev```等即可，开启mfsu，启用缓存。




