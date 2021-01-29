export default [
  {
    path: '/home/core-company',
    name: 'CoreCompanyHome',
    component: () => import('@/views/Components/CoreCompany/CoreCompanyHome.vue')
  },
  {
    path: '/home/core-company/transaction',
    name: 'CoreCompanyTransaction',
    component: () => import('@/views/Components/CoreCompany/CoreCompanyTransactions.vue')
  },
  {
    path: '/home/core-company/finance',
    name: 'CoreCompanyFinance',
    component: () => import('@/views/Components/CoreCompany/CoreCompanyFinance.vue')
  },
  {
    path: '/home/core-company/receipt',
    name: 'CoreCompanyReceipt',
    component: () => import('@/views/Components/CoreCompany/CoreCompanyReceipts.vue')
  },
  {
    path: '/home/core-company/receipt/shouldPaid',
    name: 'CoreCompanyReceipt',
    component: () => import('@/views/Components/CoreCompany/CoreCompanyReceiptsShouldPaid.vue')
  }
]