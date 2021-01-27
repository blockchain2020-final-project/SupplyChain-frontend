export default [
  {
    path: '/home/administrator',
    name: 'AdministratorHome',
    component: () => import('@/views/Components/Administrator/AdministratorHome.vue')
  },
  {
    path: '/home/administrator/banks',
    name: 'AdministratorBank',
    component: () => import('@/views/Components/Administrator/AdministratorBank.vue')
  }
]
