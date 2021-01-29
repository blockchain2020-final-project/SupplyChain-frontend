<template>
  <div>
    <div style="height: 40px">
      <a-row>
        <a-col :span="3" :offset="18">
          <a-button
            type="primary"
            icon="plus"
            @click="addFinance()"
          >
            申请贷款
          </a-button>
        </a-col>
        <a-col :span="3">
          <a-button
            type="primary"
            icon="minus"
            @click="() => paying = true"
          >
            归还贷款
          </a-button>
        </a-col>
      </a-row>
    </div>

    <a-table
      :columns="fcolumns"
      :row-key="record => record.id"
      :data-source="finances">
    </a-table>

    <a-modal
      v-model="adding"
      title="申请贷款"
      @ok="addingConfirm"
      :maskClosable="false"
      :destroyOnClose="true"
    >
      <a-input v-model="myAddr" disabled/>
      <p></p>
      <a-input placeholder="收款方" v-model="payeeAddr"/>
      <p></p>
      <a-input placeholder="交易账款" v-model="amount"/>
      <p></p>
      <a-input placeholder="截止日期" v-model="deadline"/>
      <p></p>
      <a-input placeholder="其他信息" v-model="info"/>
      <p></p>
      <a-input placeholder="使用的已有的应收账单地址" v-model="oriReceiptId"/>
      <p></p>
    </a-modal>

    <a-modal
      v-model="paying"
      title="归还贷款"
      @ok="payingConfirm"
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
  name: 'CoreCompanyFinance',
  data () {
    return {
      adding: false,
      finances: [],
      fcolumns: [
        {
          title: 'Id',
          dataIndex: 'id',
          width: '5%'
        },
        {
          title: '收款方',
          dataIndex: 'payeeAddr',
          width: '25%'
        },
        {
          title: '贷款总额',
          dataIndex: 'amount',
          width: '8%'
        },
        {
          title: '发起时间',
          dataIndex: 'createTime',
          width: '10%'
        },
        {
          title: '对应应收款单据',
          dataIndex: 'oriReceiptId',
          width: '25%'
        },
        {
          title: 'Pass?',
          dataIndex: 'requestStatus',
          width: '8%'
        },
        {
          title: '附加信息',
          dataIndex: 'info'
        }
      ],
      payeeAddr: '',
      amount: 0,
      deadline: 0,
      oriReceiptId: '',
      info: '',
      paying: false,
      addr: '',
      id: ''
    }
  },
  computed: {
    myAddr () {
      return this.$store.state.username
    },
    isCoreCompany () {
      return this.$store.state.usertype === Identity.CoreCompany
    }
  },
  mounted () {
    this.fetch()
  },
  methods: {
    fetch () {
      if(this.isCoreCompany) {
        api.coreCompany.getAllFinance(this.myAddr)
          .then(res => {
            const f = res.data.data
            this.finances = f
          })
      } else {
        api.company.getAllFinances(this.myAddr)
          .then(res => {
            this.finances = res.data.data
          })
      }
    },
    addFinance () {
      this.adding = true
    },
    addingConfirm () {
      if(this.isCoreCompany) {
        api.coreCompany.createFinance({
          payeeAddr: this.payeeAddr,
          amount: this.amount,
          deadline: this.deadline,
          oriReceiptId: this.oriReceiptId,
          info: this.info
        })
          .then(() => {
            this.$message.success('申请成功')
            this.adding = false
          })
      } else {
        api.company.createFinance({
          payeeAddr: this.payeeAddr,
          amount: this.amount,
          deadline: this.deadline,
          oriReceiptId: this.oriReceiptId,
          info: this.info
        })
          .then(() => {
            this.$message.success('申请成功')
            this.adding = false
          })
      }
    },
    payingConfirm () {
      if (this.isCoreCompany) {
        http.post('core_companies/payreceipt', {
          senderAddr: this.addr,
          payerAddr: this.$store.state.username,
          receiptId: this.id,
          amount: this.amount,
          isFinance: true
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
          isFinance: true
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