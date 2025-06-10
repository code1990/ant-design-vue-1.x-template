## Todo List

---

### 🧪 **不推荐但可用的解决方案：绕过 Node 版本校验**

yarn config set ignore-engines true
yarn install

yarn config set "strict-ssl" false

yarn cache clean

yarn install --ignore-optional

-----

删除yarn 使用npm管理

npm install

npm run dev

启动时自动打开默认浏览器

页面自动登录

---

### 常用提交类型示例：

#### ✅ 新功能（`feat`）

```
bash


复制编辑
feat: 添加用户登录自动跳转功能
```

#### ✅ 修复问题（`fix`）

```
bash


复制编辑
fix: 修复登录页面记住密码无效的问题
```

#### ✅ 文档更新（`docs`）

```
bash


复制编辑
docs: 更新项目 README 添加开发指南
```

#### ✅ 样式变更（不影响逻辑，如空格、格式）（`style`）

```
bash


复制编辑
style: 调整登录页样式缩进和空格
```

#### ✅ 重构代码（不改变行为）（`refactor`）

```
bash


复制编辑
refactor: 抽离表单校验逻辑为独立方法
```

#### ✅ 添加测试（`test`）

```
bash


复制编辑
test: 添加登录模块的单元测试
```

#### ✅ 构建配置或脚本变更（`chore`）

```
bash


复制编辑
chore: 升级依赖包 ant-design-vue 到 v1.7.8
```

------

### ✅ 带作用域的提交（可选）

```
bash复制编辑feat(login): 添加默认用户名和密码提示
fix(router): 修复登录后无法跳转的问题
```
