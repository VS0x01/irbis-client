import Vue from 'vue'
import VueRouter from 'vue-router'
import { layout, route } from '../util/routes'
import store from '../store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/Home'),
    redirect: '/app'
  },
  layout(
    'default',
    [
      route('About', '/about'),
      route('Authors', '/authors', { default: 'AuthorsList' }),
      { ...route('Author', '/authors/:id'), props: { default: true } }
    ],
    '/app'
  ),
  { path: '*', component: () => import('@/views/Error') }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  scrollBehavior: (to, from, savedPosition) => {
    if (to.hash) return { selector: to.hash }
    if (savedPosition) return savedPosition

    return { x: 0, y: 0 }
  },
  routes
})

router.beforeEach((to, from, next) => {
  store.commit('app/pushBreadcrumbs', { router, from, to })
  next()
})

export default router
