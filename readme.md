## 使用pnpm及monorepo重新设计xzl-web关联项目


###  项目开始时未涉及到同时修改shared库

 直接使用 ```pnpm dev```等即可，开启mfsu，启用缓存。

### 项目开始时涉及到同时修改shared库

必须使用```pnpm dev-shared```等，避免使用mfsu，shared库更新时，实时同步到umi的node_modules


