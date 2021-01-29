export default [
  {
    path: '/home/company',
    name: 'CompanyHome',
    component: () => import('@/views/Components/Company/CompanyHome.vue')
  },
  {
    path: '/home/company/transaction',
    name: 'CompanyTransaction',
    component: () => import('@/views/Components/CoreCompany/CoreCompanyTransactions.vue')
  },
  {
    path: '/home/company/finance',
    name: 'CompanyFinance',
    component: () => import('@/views/Components/CoreCompany/CoreCompanyFinance.vue')
  },
  {
    path: '/home/company/receipt',
    name: 'CompanyReceipt',
    component: () => import('@/views/Components/CoreCompany/CoreCompanyReceipts.vue')
  },
  {
    path: '/home/company/receipt/shouldPaid',
    name: 'CompanyReceiptShouldPaid',
    component: () => import('@/views/Components/CoreCompany/CoreCompanyReceiptsShouldPaid.vue')
  }
]
