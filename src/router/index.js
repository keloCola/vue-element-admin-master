import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'
import tree from 'element-ui/packages/table/src/store/tree'

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 * 任何用户都会使用constantRoutes
 */
export const constantRoutes = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/auth-redirect',
    component: () => import('@/views/login/auth-redirect'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/error-page/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/error-page/401'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/index'),
        name: 'Dashboard',
        meta: { title: 'Dashboard', icon: 'dashboard', affix: true }
      }
    ]
  }
]

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 * 异步路由，将我们自己的组件放在这，一定条件下会被加载
 */
export const asyncRoutes = [
  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true },
  {
    path: '/book',
    name: '我自己的组件', // 可以不写
    component: Layout, // 路由对应的组件瞅瞅第七行import Layout from '@/layout'
    redirect: '/book/create', // 重定向，访问/book的时候会重定向
    meta: { title: '图书管理', icon: 'documentation', roles: ['admin', 'editor'] },
    children: [
      {
        name: 'bookCreate',
        path: '/book/create',
        component: () => import('@/views/book/create'), // 方法
        // meta: { title: '组件的名字', icon: 'edit' }
        meta: { title: '上传图书 ', icon: 'list',
          roles: ['admin'] // 规定某些人可以看实现权限设置
        }
      },
      {
        name: 'bookEdit',
        path: '/book/edit',
        component: () => import('@/views/book/edit'),
        hidden: true,
        meta: { title: '编辑图书', icon: 'edit', roles: ['admin'], activeMenu: '/book/list' }
      },
      {
        name: 'bookList',
        path: '/book/list',
        component: () => import('@/views/book/create'),
        meta: { title: '图书列表', icon: 'list', roles: ['admin'] }
      }

    ]
  }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
