import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue')
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/customer',
      name: 'customer',
      component: () => import('../views/Customer.vue')
    },
    {
      path: '/customer-form',
      name: 'customer-form',
      component: () => import('../views/CustomerForm.vue')
    },
    {
      path: '/edit-form/:id',
      name: 'edit-form',
      component: () => import('../views/CustomerForm.vue')
    },
  ]
})

export default router
