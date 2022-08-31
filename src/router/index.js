import { createRouter, createWebHashHistory } from 'vue-router'
import ImportacionesView from '../views/ImportacionesView.vue'
import ExportacionesView from '../views/ExportacionesView.vue'

const routes = [
  {
    path: '/',
    name: 'ImportacionesView',
    component: ImportacionesView
  },
  {
    path: '/detalles',
    name: 'DetallesView',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/DetallesView.vue')
  },
  {
    path: '/exportaciones',
    name: 'ExportacionesView',
    component: ExportacionesView,
    
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
