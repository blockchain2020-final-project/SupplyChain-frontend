<template>
  <div>
    <a-table
      :columns="rcolumns"
      :row-key="record => record.id"
      :data-source="receipts">
    </a-table>
  </div>
</template>

<script>
import api from '@/api'

export default {
  name: 'CoreCompanyReceipts',
  data () {
    return {
      rcolumns: [
        {
          title: 'Id',
          dataIndex: 'id',
          width: '23%'
        },
        {
          title: '收款方地址',
          dataIndex: 'debteeAddr',
          width: '23%'
        },
        {
          title: '已还账款',
          dataIndex: 'curAmount',
          width: '8%'
        },
        {
          title: '账款总额',
          dataIndex: 'oriAmount',
          width: '8%'
        },
        {
          title: '发起时间',
          dataIndex: 'createTime',
          width: '11%'
        },
        {
          title: '截止日期',
          dataIndex: 'deadline',
          width: '11%'
        },
        {
          title: '是否还清',
          dataIndex: 'receiptStatus',
          width: '5%'
        }
      ],
      receipts: []
    }
  },
  mounted () {
    this.fetch()
  },
  methods: {
    fetch () {
      api.coreCompany.getAllReceipt()
        .then(res => {
          const r = res.data.data
          this.receipts = r
        })
    }
  }
}
</script>
