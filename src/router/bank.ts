export default [
  {
    path: '/home/bank',
    name: 'BankHome',
    component: () => import('@/views/Components/Bank/BankHome.vue')
  },
  {
    path: '/home/bank/core-company',
    name: 'BankCoreCompany',
    component: () => import('@/views/Components/Administrator/AdministratorCoreCompany.vue')
  }
]