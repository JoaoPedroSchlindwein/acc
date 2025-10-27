import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: () => import('../views/Home.vue')
    },
    {
      path: '/complexidade',
      name: 'Complexity',
      component: () => import('../views/Complexity.vue')
    },
    {
      path: '/estruturas',
      name: 'DataStructures',
      component: () => import('../views/DataStructures.vue')
    },
    {
      path: '/algoritmos',
      name: 'Algorithms',
      component: () => import('../views/Algorithms.vue')
    },
    {
      path: '/problemas',
      name: 'Problems',
      component: () => import('../views/Problems.vue')
    },
    {
      path: '/demo-interativa',
      name: 'InteractiveDemo',
      component: () => import('../views/InteractiveDemo.vue')
    }
  ]
})

export default router
