<template>
  <div>
    <div style="height: 40px">
      <a-row>
        <a-col :span="3" :offset="21">
          <a-button
            type="primary"
            icon="plus"
            @click="() => paying = true"
          >
            还款
          </a-button>
        </a-col>
      </a-row>
    </div>
    <a-table
      :columns="rcolumns"
      :row-key="record => record.id"
      :data-source="receipts">
    </a-table>
    <a-modal
      v-model="paying"
      title="发起还款"
      @ok="confirm"
      :maskClosable="false"
      :destroyOnClose="true"
    >
      <a-input placeholder="收款方地址" v-model="addr"/>
      <p></p>
      <a-input placeholder="还款账单Id" v-model="id"/>
      <p></p>
      <a-input placeholder="还款额度" v-model="amount"/>
      <p></p>
    </a-modal>
  </div>
</template>

<script>
import api from '@/api'
import * as Identity from '@/util/identity'
import http from '@/util/http'

export default {
  name: 'CoreCompanyReceipts',
  data () {
    return {
      paying: false,
      addr: '',
      amount: 0,
      id: '',
      rcolumns: [
        {
          title: 'Id',
          dataIndex: 'id',
          width: '11%'
        },
        {
          title: '收款方地址',
          dataIndex: 'payeeAddr',
          width: '32%'
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
        api.coreCompany.getAllReceiptShouldPaid(this.myAddr)
          .then(res => {
            const r = res.data.data
            this.receipts = r
          })
      } else {
        api.company.getAllReceiptsShouldPaid(this.myAddr)
          .then(res => {
            const r = res.data.data
            this.receipts = r
          })
      }
    },
    confirm () {
      if (this.isCoreCompany) {
        http.post('core_companies/payreceipt', {
          senderAddr: this.addr,
          payerAddr: this.$store.state.username,
          receiptId: this.id,
          amount: this.amount,
          isFinance: false
        })
          .then(() => {
            this.$message.success('还款成功')
            this.paying = false
          })
      } else {
        http.post('companies/payreceipt', {
          senderAddr: this.addr,
          payerAddr: this.$store.state.username,
          receiptId: this.id,
          amount: this.amount,
          isFinance: false
        })
          .then(() => {
            this.$message.success('还款成功')
            this.paying = false
          })
      }
    }
  }
}
</script>
