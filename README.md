# 关于vue2.0的项目 冲
## 关于router的源码解读
### 关于路由处理

- vue-element-admin 对`所有访问的路由`进行拦截；

- 访问路由时会从 Cookie 中获取 Token，判断 Token 是否存在：

  - 如果` Token 存在`，将根据用户角色生成动态路由，然后访问路由，生成对应的页面组件。这里有一个特例，即用户访问 `/login` 时会重定向至 `/` 路由；

  - 如果 `Token 不存在`，则会判断路由是否在`白名单`中，如果在白名单中将直接访问，否则说明该路由需要登录才能访问，此时会将路由生成一个` redirect `参数传入 login 组件，实际访问的路由为：

    `/login?redirect=/xxx`。

### 关于动态路由和权限校验

- vue-element-admin 将路由分为：`constantRoutes` 和 `asyncRoutes`
- 用户登录系统时，会动态生成路由，其中 constantRoutes 必然包含，asyncRoutes 会进行过滤；
- asyncRoutes 过滤的逻辑是看路由下是否包含 `meta `和 `meta.roles` 属性，如果没有该属性，所以这是一个通用路由，不需要进行权限校验；如果包含 roles 属性则会判断用户的角色是否命中路由中的任意一个权限，如果命中，则将路由保存下来，如果未命中，则直接将该路由舍弃；
- asyncRoutes 处理完毕后，会和 constantRoutes 合并为一个新的路由对象，并保存到 vuex 的 `permission/routes `中；
- 用户登录系统后，侧边栏会从 vuex 中获取 `state.permission.routes`，根据该路由动态渲染用户菜单。
## 关于slider的源码解读
- sidebar：sidebar 主要包含 el-menu 容器组件，el-menu 中遍历 vuex 中的 routes，生成 sidebar-item 组件。sidebar 主要配置项如下：

  - activeMenu：根据当前路由的 meta.activeMenu 属性控制侧边栏中高亮菜单
  - isCollapse：根据 Cookie 的 sidebarStatus 控制侧边栏是否折叠
  - variables：通过 `@/styles/variables.scss` 填充 el-menu 的基本样式
- sidebar-item：sidebar-item 分为两部分：
  - 第一部分是当只需要展示一个 children 或者没有 children 时进行展示，展示的组件包括：
    - app-link：动态组件，path 为链接时，显示为 a 标签，path 为路由时，显示为 router-link 组件
    - el-menu-item：菜单项，当 sidebar-item 为非 nest 组件时，el-menu-item 会增加 submenu-title-noDropdown 的 class
    - item：el-menu-item 里的内容，主要是 icon 和 title，当 title 为空时，整个菜单项将不会展示
  - 第二部分是当 children 超过两项时进行展示，展示的组件包括：
    - el-submenu：子菜单组件容器，用于嵌套子菜单组件
    - sidebar-item：el-submenu 迭代嵌套了 sidebar-item 组件，在 sidebar-item 组件中有两点变化：
      - 设置 is-nest 属性为 true
      - 根据 child.path 生成了 base-path 属性传入 sidebar-item 组件
## 关于重定向的源码解读
- login.vue 中对 $route 进行监听
- `this.getOtherQuery(query)` 的用途是获取除 redirect 外的其他查询条件
- 完成重定向的代码为
  ```
  this.$router.push({ path: this.redirect || '/', query: this.otherQuery })
  ```
  vue-element-admin 提供了专门的重定向组件，源码如下：
  
  ```
  <script>
  export default {
    created() {
      const { params, query } = this.$route
      const { path } = params
      this.$router.replace({ path: '/' + path, query })
    },
    render: function(h) {
      return h() // avoid warning message
    }
  }
  </script>
  ```
  ## 面包屑源码解读
  - el-breadcrumb：面包屑导航容器，`separator` 控制面包屑导航文本中分割线
  - el-breadcrumb-item：面包屑子项目，可以使用 `to` 属性切换路由，slot 中可以包含 `a` 标签来跳转到外链
- 获取 `this.$route.matched`，并过滤其中不包含 `item.meta.title` 的项，生成新的面包屑导航数组 `matched`
- 判断 `matched` 第一项是否为 dashboard，如果不是，则添加 dashboard 为面包屑导航第一项
- 再次过滤 `matched` 中 `item.meta.title` 为空的项和 `item.meta.breadcrumb` 为 false 的项
- `el-breadcrumb-item` 内做了一个判断，如果是最后一个元素或者路由的 `redirect` 属性指定为 `noRedirect` 则不会生成链接，否则将使用 `a` 标签生成链接，但是这里使用了 `@click.prevent` 阻止了默认 `a` 标签事件触发，而使用自定义的 `handleLink` 方法处理路由跳转
