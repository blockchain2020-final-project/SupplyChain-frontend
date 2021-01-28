<template>
  <div>
    <div style="height: 40px">
      <a-row>
        <a-col :span="3" :offset="21">
          <a-button
            type="primary"
            icon="plus"
            @click="addCompany()"
          >
            添加普通企业
          </a-button>
        </a-col>
      </a-row>
    </div>

    <a-table
      :columns="columns"
      :row-key="record => record.index"
      :data-source="companys"
    >
      <span slot="action" slot-scope="text, record">
        <a-config-provider :auto-insert-space-in-button="false">
          <a-button
            type="primary"
            @click="seeReceipts(record)"
          >
            查看应收账单
          </a-button>
        </a-config-provider>
      </span>
    </a-table>

    <a-modal
      v-model="adding"
      title="添加普通企业"
      @ok="addingConfirm"
      :maskClosable="false"
      :destroyOnClose="true"
    >
      <a-input placeholder="企业名" v-model="name"/>
      <p></p>
      <a-input placeholder="企业地址" v-model="addr"/>
      <p></p>
    </a-modal>

    <a-modal
      v-model="seeingTransactions"
      title="查看应收账单"
      @ok="() => seeingTransactions = false" 
      :maskClosable="false"
      :destroyOnClose="true"
      :width="1380"
    >
      <a-table
        :columns="tcolumns"
        :row-key="record => record.id"
        :data-source="transactions"
      >
      </a-table>
    </a-modal>
  </div>
</template>

<script>
import api from '@/api'

export default {
  name: 'AdministratorCompany',
  data () {
    return {
      adding: false,
      seeingTransactions: false,
      companys: [],
      transactions: [],
      name: '',
      addr: '',
      columns: [
        {
          title: '序号',
          dataIndex: 'index',
          width: '10%'
        },
        {
          title: '企业名',
          dataIndex: 'name',
          width: '15%'
        },
        {
          title: '企业地址',
          dataIndex: 'addr',
          width: '25%'
        },
        {
          title: '企业类型',
          dataIndex: 'cType',
          width: '10%'
        },
        {
          title: '总获得信用点',
          dataIndex: 'inCredit',
          width: '10%'
        },
        {
          title: '已使用信用点',
          dataIndex: 'outCredit',
          width: '10%'
        },
        {
          title: '操作',
          scopedSlots: { customRender: 'action' }
        }
      ],
      tcolumns: [
        {
          title: 'id',
          dataIndex: 'id',
          width: '5%'
        },
        {
          title: '销售方地址',
          dataIndex: 'sellerAddr',
          width: '25%'
        },
        {
          title: '购买方地址',
          dataIndex: '销售方地址',
          width: '25%'
        },
        {
          title: '账款',
          dataIndex: 'amount',
          width: '10%'
        },
        {
          title: '发起日期',
          dataIndex: 'createTime',
          width: '12%'
        },
        {
          title: '应收账款Id',
          dataIndex: 'oriReceiptId',
          width: '17%'
        },
        {
          title: '状态',
          dataIndex: 'requestStatus',
          width: '8%'
        }
      ]
    }
  },
  computed: {
    identity () {
      return this.$store.getters.getIdentity
    }
  },
  mounted () {
    this.fetch()
  },
  methods: {
    fetch () {
      api.company.getAllCompanies()
        .then(res => {
          const companys = res.data.data || []
          for (let i = 0; i < companys.length; i++) {
            companys[i].index = i + 1
          }
          this.companys = companys
        })
    },
    seeReceipts (record) {
      this.seeingTransactions = true
      api.company.getAllTransactions(record.addr)
        .then(res => {
          this.transactions = res.data.data
        })
    },
    addCompany () {
      this.adding = true
    },
    addingConfirm () {
      api.company.createCompany(this.addr, this.name)
        .then(() => {
          this.$message.success('操作成功')
          this.adding = false
          this.fetch()
        })
    }
  }
}
</script>
