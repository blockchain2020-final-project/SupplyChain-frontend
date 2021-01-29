<template>
  <div>
    <a-table
      :columns="fcolumns"
      :row-key="record => record.id"
      :data-source="finances"
    >

      <span slot="action" slot-scope="text, record">
        <a-config-provider :auto-insert-space-in-button="false">
          <a-button
            type="primary"
            @click="respond(record, true)"
            ghost
          >
            同意
          </a-button>
        </a-config-provider>
        <a-config-provider :auto-insert-space-in-button="false">
          <a-button
            type="danger"
            @click="respond(record, false)"
            ghost
          >
            拒绝
          </a-button>
        </a-config-provider>
      </span>
    </a-table>
  </div>
</template>

<script>
import api from '@/api'
export default {
  name: 'BankFinanceAsk',
  data () {
    return {
      finances: [],
      fcolumns: [
        {
          title: 'Id',
          dataIndex: 'id',
          width: '11%'
        },
        {
          title: '申请人',
          dataIndex: 'payeeAddr',
          width: '32%'
        },
        {
          title: '金额',
          dataIndex: 'amount',
          width: '8%'
        },
        {
          title: '发起时间',
          dataIndex: 'createTime',
          width: '13%'
        },
        {
          title: '应收账款Id',
          dataIndex: 'oriReceiptId',
          width: '11%'
        },
        {
          title: 'Pass?',
          dataIndex: 'requestStatus',
          width: '8%'
        },
        {
          title: '操作',
          scopedSlots: { customRender: 'action' }
        }
      ]
    }
  },
  mounted () {
    this.fetch()
  },
  methods: {
    fetch () {
      api.bank.getAllFinanceAsks(this.$store.state.username)
        .then(res => {
          this.finances = res.data.data
        })
    },
    respond (record, r) {
      const t = r ? 1 : 0
      api.bank.response({
        respond: t,
        senderAddr: record.payeeAddr,
        payerAddr: record.payerAddr,
        financeId: record.id
      })
        .then(() => {
          this.$message.success('提交成功')
          this.fetch()
        })
    }
  }
}
</script>