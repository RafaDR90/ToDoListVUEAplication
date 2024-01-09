import { createRouter, createWebHistory } from 'vue-router'
import toDos from '../views/toDos.vue'
import HomeView from '../views/homePage.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/todo',
      name: 'todo',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/toDos.vue')
    }
  ]
})

export default router
