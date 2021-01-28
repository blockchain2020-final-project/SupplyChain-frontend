<template>
  <div>
    <div style="height: 40px">
      <a-row>
        <a-col :span="3" :offset="17">
          <a-button
            type="primary"
            icon="plus"
            @click="() => addingBank = true"
            :disabled="identity !== 1"
          >
            添加银行
          </a-button>
        </a-col>
        <a-col :span="3">
          <a-button
            type="primary"
            icon="plus"
            @click="() => addingMoney = true"
            :disabled="identity !== 1"
          >
            金额变动
          </a-button>
        </a-col>
      </a-row>
    </div>
    <a-table
      :columns="columns"
      :row-key="record => record.index"
      :data-source="banks"
    >
      <span slot="action" slot-scope="text, record">
        <a-config-provider :auto-insert-space-in-button="false">
          <a-button
            type="primary"
            @click="recycleCredit(record)"
            ghost
            :disabled="identity !== 1"
          >
            回收信用点
          </a-button>
        </a-config-provider>

        <a-divider type="vertical" />

        <a-config-provider :auto-insert-space-in-button="false">
          <a-button
            type="primary"
            @click="sendCredit(record)"
            ghost
            :disabled="identity !== 1"
          >
            发放信用点
          </a-button>
        </a-config-provider>
      </span>
    </a-table>

    <a-modal
      v-model="addingBank"
      title="添加银行"
      @ok="addBankConfirm"
      :maskClosable="false"
      :destroyOnClose="true"
    >
      <a-input placeholder="银行名称" v-model="bankName"/>
      <p></p>
      <a-input placeholder="银行地址" v-model="bankAddress"/>
      <p></p>
    </a-modal>

    <a-modal
      v-model="recyclingRecord"
      title="回收信用点"
      @ok="recycleRecordConfirm"
      :maskClosable="false"
      :destroyOnClose="true"
    >
      <a-input placeholder="银行地址" v-model="recycleCreditRecord.addr" disabled/>
      <p></p>
      <a-input :placeholder="`已有信用点${recycleCreditRecord.creditAmount}`" disabled/>
      <p></p>
      <a-input placeholder="回收信用点" v-model="amount"/>
    </a-modal>

    <a-divider type="vertical" />

    <a-modal
      v-model="sendingCredit"
      title="发放信用点"
      @ok="sendCreditConfirm"
      :maskClosable="false"
      :destroyOnClose="true"
    >
      <a-input placeholder="银行地址" v-model="sendCreditRecord.addr" disabled/>
      <p></p>
      <a-input :placeholder="`已有信用点: ${sendCreditRecord.creditAmount}`" disabled/>
      <p></p>
      <a-input placeholder="发放信用点" v-model="amount"/>
    </a-modal>

    <a-modal
      v-model="addingMoney"
      title="金额变动"
      @ok="addingMoneyConfirm"
      :maskClosable="false"
      :destroyOnClose="true"
    >
      <a-input placeholder="银行地址" v-model="addingAddr"/>
      <p></p>
      <a-input placeholder="发放金额" v-model="amount"/>
      <p></p>
    </a-modal>
  </div>
</template>

<script>
import api from '@/api'

export default {
  name: 'AdministratorBank',
  data () {
    return {
      banks: [],
      columns: [
        {
          title: '序号',
          dataIndex: 'index',
          width: '8%'
        },
        {
          title: '银行名称',
          dataIndex: 'name',
          width: '13%'
        },
        {
          title: '银行地址',
          dataIndex: 'addr',
          width: '32%'
        },
        {
          title: '信用点',
          dataIndex: 'creditAmount',
          width: '11%'
        },
        {
          title: '可用金额',
          dataIndex: 'cashAmount',
          width: '11%'
        },
        {
          title: '操作',
          scopedSlots: { customRender: 'action' }
        }
      ],
      addingBank: false,
      bankName: '',
      bankAddress: '',
      recyclingRecord: false,
      recycleCreditRecord: {},
      amount: 0,
      sendingCredit: false,
      sendCreditRecord: {},
      addingMoney: false,
      addingAddr: '',
      addingAmount: 0
    }
  },
  computed: {
    identity () {
      return this.$store.getters.getIdentity
    }
  },
  mounted () {
    this.getAllBanks()
  },
  methods: {
    getAllBanks () {
      api.bank.getAllBanks()
        .then(res => {
          const banks = res.data.data
          console.log(banks)
          for(let i = 0; i<banks.length; i++) {
            banks[i].remainCredit = banks[i].inCredit - banks[i].outCredit
            banks[i].index = i + 1
          }
          this.banks = banks
        })
    },
    recycleCredit (record) {
      this.recyclingRecord = true
      this.recycleCreditRecord = record
    },
    addBankConfirm () {
      if (!this.bankName || !this.bankAddress) {
        this.$message.error('请提供必要信息')
      } else {
        api.bank.registerBank(this.bankAddress, this.bankName)
          .then(() => {
            this.getAllBanks()
            this.$message.success('操作成功')
            this.addingBank = false
          })
      }
    },
    recycleRecordConfirm () {
      const amount = this.amount
      const addr = this.recycleCreditRecord.addr
      if(amount > 0) {
        api.administrator.recycleCredit(addr, amount)
          .then(() => {
            this.recyclingRecord = false
            this.recycleCreditRecord = {}
            this.$message.success('回收成功')
            this.getAllBanks()
          })
      } else {
        this.$message.error('请输入有效参数')
      }
    },
    sendCreditConfirm () {
      const amount = this.amount
      const addr = this.sendCreditRecord.addr
      if(amount > 0) {
        api.administrator.sendCredit(addr, amount)
          .then(() => {
            this.sendingCredit = false
            this.sendCreditRecord = {}
            this.$message.success('发放成功')
            this.getAllBanks()
          })
      } else {
        this.$message.error('请输入有效参数')
      }
    },
    sendCredit (record) {
      this.sendingCredit = true
      this.sendCreditRecord = record
    },
    addingMoneyConfirm () {
      if(this.amount > 0) {
        api.administrator.deposite(this.addingAddr, this.addingAmount)
          .then(() => {
            this.$message.success('操作成功')
            this.addingMoney = false
            this.getAllBanks()
          })
      } else {
        api.administrator.withdraw(this.addingAddr, -this.addingAmount)
          .then(() => {
            this.$message.success('操作成功')
            this.addingMoney = false
            this.getAllBanks()
          })
      }
    }
  }
}
</script>