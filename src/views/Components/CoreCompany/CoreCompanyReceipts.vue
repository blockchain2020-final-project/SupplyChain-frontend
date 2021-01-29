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
import * as Identity from '@/util/identity'

export default {
  name: 'CoreCompanyReceipts',
  data () {
    return {
      rcolumns: [
        {
          title: 'Id',
          dataIndex: 'id',
          width: '10%'
        },
        {
          title: '付款方地址',
          dataIndex: 'payerAddr',
          width: '36%'
        },
        {
          title: '已还账款',
          dataIndex: 'paidAmount',
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
  computed: {
    isCoreCompany () {
      return this.$store.state.usertype === Identity.CoreCompany
    },
    myAddr () {
      return this.$store.state.username
    },
  },
  methods: {
    fetch () {
      if(this.isCoreCompany) {
        api.coreCompany.getAllReceipt(this.myAddr)
          .then(res => {
            const r = res.data.data
            this.receipts = r
          })
      } else {
        api.company.getAllReceipts(this.myAddr)
          .then(res => {
            const r = res.data.data
            this.receipts = r
          })
      }
    }
  }
}
</script>
