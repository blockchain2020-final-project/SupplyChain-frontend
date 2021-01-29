<template>
  <div>
    <div style="height: 40px">
      <a-row>
        <a-col :span="3" :offset="21">
          <a-button
            type="primary"
            icon="plus"
            @click="() => addingAmount = true"
          >
            金额变动
          </a-button>
        </a-col>
      </a-row>
    </div>

    <a-table
      :columns="fcolumns"
      :row-key="record => record.id"
      :data-source="finances"
    >
    </a-table>

    <a-modal
      v-model="addingAmount"
      title="金额变动"
      @ok="addingConfirm"
      :maskClosable="false"
      :destroyOnClose="true"
    >
      <a-input placeholder="企业地址" v-model="addr"/>
      <p></p>
      <a-input placeholder="账款" v-model="amount"/>
      <p></p>
    </a-modal>
  </div>
  
</template>

<script>
import api from '@/api'

export default {
  name: 'BankFinanceDetail',
  data () {
    return {
      addingAmount: false,
      addr: '',
      amount: '',
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
  mounted () {
    this.fetch()
  },
  methods: {
    fetch () {
      api.bank.getAllFinances(this.$store.state.username)
        .then(res => {
          this.finances = res.data.data
        })
    },
    addingConfirm () {
      if(this.amount > 0) {
        api.bank.deposite(this.addr, this.amount)
          .then(() => {
            this.$message.success('操作成功')
            this.addingAmount = false
            this.fetch()
          })
      } else {
        api.bank.withdraw(this.addr, this.amount)
          .then(() => {
            this.$message.success('操作成功')
            this.addingAmount = false
            this.fetch()
          })
      }
    }
  }
}
</script>
