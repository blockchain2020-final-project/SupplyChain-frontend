<template>
  <div>
    <div style="height: 40px">
      <a-row>
        <a-col :span="3" :offset="21">
          <a-button
            type="primary"
            icon="plus"
            @click="addTransaction()"
          >
            新建交易
          </a-button>
        </a-col>
      </a-row>
    </div>
    <a-table
      :columns="tcolumns"
      :row-key="record => record.index"
      :data-source="transactions">
      <span slot="action" slot-scope="text, record" v-if="record.requestStatus !== 1">
        <a-config-provider :auto-insert-space-in-button="false">
          <a-button
            type="primary"
            @click="confirm(record, true)"
            ghost
          >
            同意
          </a-button>
        </a-config-provider>
        <a-config-provider :auto-insert-space-in-button="false">
          <a-button
            type="danger"
            @click="confirm(record, false)"
            ghost
          >
            拒绝
          </a-button>
        </a-config-provider>
      </span>
    </a-table>
    <a-modal
      v-model="adding"
      title="发起交易"
      @ok="addingConfirm"
      :maskClosable="false"
      :destroyOnClose="true"
    >
      <a-input v-model="myAddr" disabled/>
      <p></p>
      <a-input placeholder="交易方" v-model="otherAddr"/>
      <p></p>
      <a-input placeholder="交易账款" v-model="amount"/>
      <p></p>
      <a-input placeholder="截止日期" v-model="deadline"/>
      <p></p>
      <a-input placeholder="其他信息" v-model="info"/>
      <p></p>
      <a-input placeholder="使用的已有的应收账单地址（如果有）" v-model="oriReceiptId"/>
      <p></p>
    </a-modal>
  </div>
</template>

<script>
import api from '@/api'
import * as Identity from '@/util/identity'
import http from '@/util/http'

export default {
  name: 'CoreCompanyTransaction',
  data () {
    return {
      adding: false,
      transactions: [],
      tcolumns: [
        {
          title: 'Id',
          dataIndex: 'id',
          width: '13%'
        },
        {
          title: '发起方地址',
          dataIndex: 'payerAddr',
          width: '30%'
        },
        {
          title: '账款',
          dataIndex: 'amount',
          width: '10%'
        },
        {
          title: '发起时间',
          dataIndex: 'createTime',
          width: '17%'
        },
        {
          title: '请求状态',
          dataIndex: 'requestStatus',
          width: '8%'
        },
        {
          title: '操作',
          scopedSlots: { customRender: 'action' }
        }
      ],
      otherAddr: '',
      amount: 0,
      deadline: 0,
      info: '',
      oriReceiptId: ''
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
        api.coreCompany.getAllTransactions(this.myAddr)
          .then(res => {
            const transactions = res.data.data
            for (let i = 0; i < transactions.length; i++) {
              transactions[i].index = i + 1
            }
            this.transactions = transactions
          })
      } else {
        api.company.getAllTransactions(this.myAddr)
          .then(res => {
            const transactions = res.data.data
            for (let i = 0; i < transactions.length; i++) {
              transactions[i].index = i + 1
            }
            this.transactions = transactions
          })
      }
    },
    addTransaction () {
      this.adding = true
    },
    addingConfirm () {
      if(!this.oriReceiptId) {
        if(this.isCoreCompany) {
          api.coreCompany.createTransactionNew({
            payeeAddr: this.otherAddr,
            amount: this.amount,
            deadline: this.deadline,
            info: this.info
          })
            .then(() => {
              this.$message.success('提交成功')
              this.adding = false
              this.fetch()
            })
        } else {
          api.company.createTransactionNew({
            payeeAddr: this.otherAddr,
            amount: this.amount,
            deadline: this.deadline,
            info: this.info
          })
            .then(() => {
              this.$message.success('提交成功')
              this.adding = false
              this.fetch()
            })
        }
      } else {
        if(this.isCoreCompany) {
          api.coreCompany.createTransactionOld({
            payeeAddr: this.otherAddr,
            amount: this.amount,
            deadline: this.deadline,
            info: this.info,
            oriReceiptId: this.oriReceiptId
          })
            .then(() => {
              this.$message.success('提交成功')
              this.adding = false
              this.fetch()
            })
        } else {
          api.company.createTransactionOld({
            payeeAddr: this.otherAddr,
            amount: this.amount,
            deadline: this.deadline,
            info: this.info,
            oriReceiptId: this.oriReceiptId
          })
            .then(() => {
              this.$message.success('提交成功')
              this.adding = false
              this.fetch()
            })
        }
      }
    },
    confirm (record, result) {
      const respond = result ? 1 : 0
      if (this.isCoreCompany) {
        http.post('core_companies/transactionrespond', {
          senderAddr: this.$store.state.username,
          payerAddr: record.payerAddr,
          transactionId: record.id,
          respond
        })
          .then(() => {
            this.$message.success('操作完成')
            this.adding = false
            this.fetch()
          })
      } else {
        http.post('companies/transactionrespond', {
          senderAddr: this.$store.state.username,
          payerAddr: record.payerAddr,
          transactionId: record.id,
          respond
        })
          .then(() => {
            this.$message.success('操作完成')
            this.adding = false
            this.fetch()
          })
      }
    }
  }
}
</script>
