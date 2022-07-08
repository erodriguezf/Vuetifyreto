import Vue from 'vue'
import VueRouter from 'vue-router'


Vue.use(VueRouter)

const routes = [
  {
    path: '',
   name: 'loging',
    component: ()=>import('../views/LoginView.vue')
  },
  {
    path: '/secion',
    name: 'secion',
    component: ()=>import('../views/SecionView.vue'),
    children:[
      {
        path: 'Configuracion',
        name: 'Configuracion',
        component: ()=>import('../views/ConfiguracionView.vue'),
      },
      {
        path: 'Inventario',
        name: 'Inventario',
        component: () => import( '../views/InventarioView.vue')
      },
      {
        path: 'Seguridad',
        name: 'Seguridad',
        component: () => import( '../views/SeguridadView.vue')
      },
      {
        path: 'Dashboard',
        name: 'Dashboard',
        component: () => import( '../views/DashboardView.vue')
      }
    ]
  }

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
