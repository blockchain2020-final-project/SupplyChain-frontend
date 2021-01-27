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
  },
  {
    path: '/home/administrator/certifier',
    name: 'AdministratorCertifiers',
    component: () => import('@/views/Components/Administrator/AdministratorCertifier.vue')
  },
  {
    path: '/home/administrator/core-company',
    name: 'AdministratorCoreCompany',
    component: () => import('@/views/Components/Administrator/AdministratorCoreCompany.vue')
  },
  {
    path: '/home/administrator/company',
    name: 'AdministratorCompany',
    component: () => import('@/views/Components/Administrator/AdministratorCompany.vue')
  }
]
