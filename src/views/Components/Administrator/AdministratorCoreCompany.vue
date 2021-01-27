<template>
  <div>
    <div style="height: 40px">
      <a-row>
        <a-col :span="3" :offset="21">
          <a-button
            type="primary"
            icon="plus"
            @click="addCoreCompany()"
            style="background-color: green; border-color: green;"
          >
            添加核心企业
          </a-button>
        </a-col>
      </a-row>
    </div>

    <a-table
      :columns="columns"
      :row-key="record => record.index"
      :data-source="coreCompanies"
    >
      <span slot="action" slot-scope="text, record">
        <a-config-provider :auto-insert-space-in-button="false">
          <a-button
            type="primary"
            @click="sendCredit(record)"
            style="background-color: red; border-color: red;"
          >
            发放信用点
          </a-button>
        </a-config-provider>

        <a-config-provider :auto-insert-space-in-button="false">
          <a-button
            type="primary"
            @click="seeTransactions(record)"
          >
            查看交易
          </a-button>
        </a-config-provider>

        <a-config-provider :auto-insert-space-in-button="false">
          <a-button
            type="primary"
            @click="seeReceipt(record)"
            style="background-color: green; border-color: green;"
          >
            查看应收账单
          </a-button>
        </a-config-provider>
      </span>
    </a-table>

    <a-modal
      v-model="adding"
      title="添加核心企业"
      @ok="addingConfirm"
      :maskClosable="false"
      :destroyOnClose="true"
    >
      <a-input placeholder="核心企业名" v-model="record.name"/>
      <p></p>
      <a-input placeholder="核心企业地址" v-model="record.addr"/>
      <p></p>
    </a-modal>

    <a-modal
      v-model="sendingCredit"
      title="发放信用点"
      @ok="sendCreditConfirm"
      :maskClosable="false"
      :destroyOnClose="true"
    >
      <a-input placeholder="核心企业地址" v-model="record.addr"/>
      <p></p>
      <a-input placeholder="待发放信用点" v-model="amount" />
      <p></p>
    </a-modal>

    <a-modal
      v-modal="seeingTransaction"
      title="查看交易账单"
      @ok="() => seeingTransaction = false"
      :maskClosable="false"
      :destroyOnClose="true"
    >
      <a-table
        :columns="tcolumns"
        :row-key="record => record.id"
        :data-source="transactions">
      </a-table>
    </a-modal>

    <a-modal
      v-modal="seeingReceipt"
      title="查看应收账单"
      @ok="() => seeingReceipt = false"
      :maskClosable="false"
      :destroyOnClose="true"
    >
      <a-table
        :columns="rcolumns"
        :row-key="record => record.id"
        :data-source="receipts">
      </a-table>
    </a-modal>
  </div>
</template>

<script>
import api from '@/api'
import * as Identity from '@/util/identity'

export default {
  name: 'AdministratorCoreCompany',
  data () {
    return {
      adding: false,

      sendingCredit: false,
      seeingTransaction: false,
      seeingReceipt: false,
      record: {},
      amount: 0,
      coreCompanies: [],
      columns: [
        {
          title: '序号',
          dataIndex: 'index',
          width: '8%'
        },
        {
          title: '核心企业名',
          dataIndex: 'name',
          width: '12%'
        },
        {
          title: '核心企业地址',
          dataIndex: 'addr',
          width: '24%'
        },
        {
          title: '总分配信用点',
          dataIndex: 'inCredit',
          width: '10%'
        },
        {
          title: '已发放信用点',
          dataIndex: 'outCredit',
          width: '10%'
        },
        {
          title: '操作',
          scopedSlots: { customRender: 'action' }
        }
      ],
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
          width: '25%'
        },
        {
          title: '购买方地址',
          dataIndex: 'buyerAddr',
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
          width: '15%'
        },
        {
          title: '交易模式',
          dataIndex: 'tMode',
          width: '5%'
        },
        {
          title: '应收账款Id',
          dataIndex: 'oriReceiptId',
          width: '5%'
        },
        {
          title: '请求状态',
          dataIndex: 'requestStatus',
          width: '8%'
        }
      ],
      receipts: [],
      rcolumns: [
        {
          title: 'Id',
          dataIndex: 'id',
          width: '4%'
        },
        {
          title: '借款方地址',
          dataIndex: 'debtorAddr',
          width: '18%'
        },
        {
          title: '收款方地址',
          dataIndex: 'debteeAddr',
          width: '18%'
        },
        {
          title: '已还账款',
          dataIndex: 'curAmount',
          width: '6%'
        },
        {
          title: '账款总额',
          dataIndex: 'oriAmount',
          width: '6%'
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
          title: '银行签名',
          dataIndex: 'bankSignature',
          width: '18%'
        },
        {
          title: '核心企业签名',
          dataIndex: 'coreCompanySignature',
          width: '18%'
        }

      ]
    }
  },
  mounted () {
    this.fetch()
  },
  methods: {
    fetch () {
      api.coreCompany.getAllCoreCompany()
        .then(res => {
          const core = res.data.data
          for (let i = 0; i<core.length; i++) {
            core[i].index = i + 1
          }
          this.coreCompanies = core
        })
    },
    addCoreCompany() {
      this.adding = true
      this.record = {
        addr: '',
        name: ''
      }
    },
    sendCredit (record) {
      this.sendingCredit = true
      this.record = record
    },
    seeTransaction (record) {
      this.seeingTransaction = true
      this.record = record
      this.transactions = []
      api.coreCompany.getAllTransactions(record.addr)
        .then(res => {
          this.transactions = res.data.data
        })
    },
    seeReceipt (record) {
      this.seeingReceipt = true
      this.record = record
      this.receipts = []
      api.coreCompany.getAllReceipt(record.addr)
        .then(res => {
          this.receipts = res.data.data
        })
    },
    addingConfirm () {
      const addr = this.record.addr
      const name = this.record.name
      if (addr && name) {
        api.coreCompany.createCoreCompany(addr, name)
          .then(() => {
            this.$message.success('提交成功')
            this.fetch()
            this.adding = false
          })
      } else {
        this.$message.error('请提供必要参数')
      }
    },
    sendCreditConfirm () {
      const addr = this.record.addr
      const amount = this.amount
      if (amount <= 0) {
        this.$message.error('请提供正确的参数')
      } else {
        const identity = this.$store.getters.getIdentity()
        let promise = null;
        if (identity === Identity.Bank) {
          promise = api.bank.sendCredit(addr, amount)
        } else if (identity === Identity.Certifier) {
          promise = api.certifier.sendCredit(addr, amount)
        }
        if (promise) {
          promise.then(() => {
            this.$message.success('发送信用点成功')
            this.fetch()
            this.sendingCredit = false
          })
        } else {
          this.$message.error('您没有权限发送信用点')
        }
      }
    }
  }
}
</script>
