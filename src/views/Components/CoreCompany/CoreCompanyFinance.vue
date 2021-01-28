<template>
  <div>
    <div style="height: 40px">
      <a-row>
        <a-col :span="3" :offset="21">
          <a-button
            type="primary"
            icon="plus"
            @click="addFinance()"
          >
            申请贷款
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
  </div>
</template>

<script>
import api from '@/api'

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
      info: ''
    }
  },
  computed: {
    myAddr () {
      return this.$store.state.username
    }
  },
  methods: {
    fetch () {
      api.coreCompany.getAllFinance()
        .then(res => {
          const f = res.data.data
          this.finances = f
        })
    },
    addFinance () {
      this.adding = true
    },
    addingConfirm () {
      api.coreCompany.createFinance({
        payeeAddr: this.payeeAddr,
        amount: this.amount,
        deadline: this.deadline,
        oriReceiptId: this.oriReceiptId,
        info: this.info
      })
    }
  }
}
</script>