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
          width: '7%'
        },
        {
          title: '销售方地址',
          dataIndex: 'sellerAddr',
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
          width: '15%'
        },
        {
          title: '交易模式',
          dataIndex: 'tMode',
          width: '10%'
        },
        {
          title: '应收账款Id',
          dataIndex: 'oriReceiptId',
          width: '15%'
        },
        {
          title: '请求状态',
          dataIndex: 'requestStatus',
          width: '8%'
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
    }
  },
  mounted () {
    this.fetch()
  },
  methods: {
    fetch () {
      api.coreCompany.getAllTransactions(this.myAddr)
        .then(res => {
          const transactions = res.data.data
          for (let i = 0; i < transactions.length; i++) {
            transactions[i].index = i + 1
          }
          this.transactions = transactions
        })
    },
    addTransaction () {
      this.adding = true
    },
    addingConfirm () {
      if(this.oriReceiptId) {
        api.coreCompany.createTransactionNew({
          payeeAddr: this.otherAddr,
          amount: this.amount,
          deadline: this.deadline,
          info: this.info
        })
          .then(() => {
            this.$message.success('提交成功')
            this.fetch()
          })
      } else {
        api.coreCompany.createTransactionOld({
          payeeAddr: this.otherAddr,
          amount: this.amount,
          deadline: this.deadline,
          info: this.info,
          oriReceiptId: this.oriReceiptId
        })
          .then(() => {
            this.$message.success('提交成功')
            this.fetch()
          })
      }
    }
  }
}
</script>
