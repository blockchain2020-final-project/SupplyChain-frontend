<template>
  <a-table
    :columns="fcolumns"
    :row-key="record => record.id"
    :data-source="finances"
  >
  </a-table>
</template>

<script>
import api from '@/api'

export default {
  name: 'BankFinanceDetail',
  data () {
    return {
      finances: [],
      fcolumns: [
        {
          title: 'Id',
          dataIndex: 'id',
          width: '5%'
        },
        {
          title: '支付者地址',
          dataIndex: 'payerAddr',
          width: '25%'
        },
        {
          title: '账款',
          dataIndex: 'amount',
          width: '10%'
        },
        {
          title: '发起时间',
          dataIndex: 'createTime',
          width: '11%'
        },
        {
          title: '应收单据ID',
          dataIndex: 'oriReceiptId',
          width: '25%'
        },
        {
          title: '信息',
          dataIndex: 'info'
        }
      ]
    }
  },
  methods: {
    fetch () {
      api.bank.getAllFinances()
        .then(res => {
          this.finances = res.data.data
        })
    }
  }
}
</script>
