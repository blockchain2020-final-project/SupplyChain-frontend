export default {
  Administrator: {
    selected: ['/home/administrator'],
    menus: [
      {
        key: '/home/administrator',
        icon: 'user',
        description: '我的信息'
      },
      {
        key: '/home/administrator/banks',
        icon: 'bank',
        description: '银行信息'
      },
      {
        key: '/home/administrator/certifier',
        icon: 'safety-certificate',
        description: '监督机构'
      },
      {
        key: '/home/administrator/core-company',
        icon: 'unordered-list',
        description: '核心企业'
      },
      {
        key: '/home/administrator/company',
        icon: 'unordered-list',
        description: '普通企业'
      }
    ]
  },
  Bank: {
    selected: ['/home/bank'],
    menus: [
      {
        key: '/home/bank',
        icon: 'user',
        description: '我的信息'
      },
      {
        key: '/home/bank/core-company',
        icon: 'unordered-list',
        description: '核心企业'
      },
      {
        key: '/home/bank/finance/detail',
        icon: 'unordered-list',
        description: '贷款情况'
      },
      {
        key: '/home/bank/finance/ask',
        icon: 'unordered-list',
        description: '贷款申请'
      }
    ]
  },
  Certifier: {
    selected: ['/home/certifier'],
    menus: [
      {
        key: '/home/certifier',
        icon: 'user',
        description: '我的信息'
      },
      {
        key: '/home/certifier/bank',
        icon: 'bank',
        description: '银行信息'
      },
      {
        key: '/home/certifier/core-company',
        icon: 'unordered-list',
        description: '核心企业'
      },
      {
        key: '/home/certifier/company',
        icon: 'unordered-list',
        description: '普通企业'
      }
    ]
  },
  CoreCompany: {
    selected: ['/home/core-company'],
    menus: [
      {
        key: '/home/core-company',
        icon: 'user',
        description: '我的信息'
      },
      {
        key: '/home/core-company/transaction',
        icon: 'unordered-list',
        description: '我的交易'
      },
      {
        key: '/home/core-company/finance',
        icon: 'bank',
        description: '银行贷款'
      },
      {
        key: '/home/core-company/receipt',
        icon: 'unordered-list',
        description: '应收账单'
      }
    ]
  },
  Company: {
    selected: ['/home/company'],
    menus: [
      {
        key: '/home/company',
        icon: 'user',
        description: '我的信息'
      },
      {
        key: '/home/company/transaction',
        icon: 'unordered-list',
        description: '我的交易'
      },
      {
        key: '/home/company/finance',
        icon: 'bank',
        description: '银行贷款'
      },
      {
        key: '/home/company/receipt',
        icon: 'unordered-list',
        description: '应收账单'
      }
    ]
  }
}