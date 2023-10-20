import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/list',
      name: 'list',
      component: () => import ('../views/UserList.vue'),
    },
    {
      path: '/user',
      name: 'user',
      component: () => import ('../views/userView.vue'),
    }
  ]
})

export default router
