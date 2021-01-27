export default [
  {
    path: '/home/certifier',
    name: 'CertifierHome',
    component: () => import('@/views/Components/Certifier/CertifierHome.vue')
  },
  {
    path: '/home/certifier/bank',
    name: 'CertifierBank',
    component: () => import('@/views/Components/Administrator/AdministratorBank.vue')
  },
  {
    path: '/home/certifier/core-company',
    name: 'CertifierCoreCompany',
    component: () => import('@/views/Components/Administrator/AdministratorCoreCompany.vue')
  },
  {
    path: '/home/certifier/company',
    name: 'CertifierCompany',
    component: () => import('@/views/Components/Administrator/AdministratorCompany.vue')
  }
]
