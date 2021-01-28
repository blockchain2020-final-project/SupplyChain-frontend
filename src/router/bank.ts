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
  },
  {
    path: '/home/bank/company',
    name: 'BankCompany',
    component: () => import('@/views/Components/Administrator/AdministratorCompany.vue')
  },
  {
    path: '/home/bank/finance/detail',
    name: 'BankFinanceDetail',
    component: () => import('@/views/Components/Bank/BankFinanceDetail.vue')
  },
  {
    path: '/home/bank/finance/ask',
    name: 'BankFinanceAsk',
    component: () => import('@/views/Components/Bank/BankFinanceAsk.vue')
  }
]