import { createRouter, createWebHistory } from 'vue-router'
import HomeLayout from '@/layouts/HomeLayout.vue'
import { authenticate } from './guards'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/home',
      component: HomeLayout,
      beforeEnter: [authenticate],
      children: [
        {
          path: '',
          name: 'Home',
          component: () => import('../views/HomeView/index.vue'),
        },
      ],
    },
    {
      path: '/tale',
      component: HomeLayout,
      beforeEnter: [authenticate],
      children: [
        {
          path: '',
          name: 'Tale',
          component: () => import('../views/TaleView/index.vue'),
        },
      ],
    },
    {
      path: '/book',
      component: HomeLayout,
      beforeEnter: [authenticate],
      children: [
        {
          path: '',
          name: 'StoryBook',
          component: () => import('../views/StoryBook.vue'),
        },
      ],
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('../views/LoginView.vue'),
    },
    {
      path: '/signup',
      name: 'Signup',
      component: () => import('../views/SignupView.vue'),
    },
    {
      path: '',
      name: 'Landing',
      component: () => import('../views/LandingView.vue'),
    },
  ],
})

export default router
