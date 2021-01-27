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
    selected: [],
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
      }
    ]
  }
}