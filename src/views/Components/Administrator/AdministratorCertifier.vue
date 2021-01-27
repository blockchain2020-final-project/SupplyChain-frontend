<template>
  <div>
    <div style="height: 40px">
      <a-row>
        <a-col :span="3" :offset="21">
          <a-button
            type="primary"
            icon="plus"
            @click="addCertifier()"
            style="background-color: green; border-color: green;"
          >
            添加监管机构
          </a-button>
        </a-col>
      </a-row>
    </div>

    <a-table
      :columns="columns"
      :row-key="record => record.index"
      :data-source="certifiers"
    >
    </a-table>

    <a-modal
      v-model="addingCertifier"
      title="添加监督机构"
      @ok="addCertifierConfirm"
      :maskClosable="false"
      :destroyOnClose="true"
    >
      <a-input placeholder="监督机构名字" v-model="certAddress"/>
      <p></p>
      <a-input placeholder="监督机构地址" v-model="certName"/>
    </a-modal>
  </div>
</template>

<script>
import api from '@/api'

export default {
  name: 'AdministratorCertifier',
  data () {
    return {
      certifiers: [],
      columns: [
        {
          title: '序号',
          dataIndex: 'index',
          width: '12%'
        },
        {
          title: '监管机构名称',
          dataIndex: 'name',
          width: '25%'
        },
        {
          title: '监管机构地址',
          dataIndex: 'addr'
        }
      ],
      addingCertifier: false,
      certAddress: '',
      certName: ''
    }
  },
  mounted () {
    this.fetch()
  },
  methods: {
    fetch () {
      api.certifier.getAllCertifiers()
        .then(res => {
        const certifiers = res.data.data
        for (let i = 0; i < certifiers.length; i++) {
          certifiers[i].index = i + 1
        }
        this.certifiers = certifiers
      })
    },
    addCertifier () {
      this.addingCertifier = true
      this.certAddress = ''
      this.certName = ''
    },
    addCertifierConfirm () {
      if(!this.certAddress || !this.certName) {
        this.$message.error('请提供必要信息')
      } else {
        api.certifier.createCertifier(this.certAddress, this.certName)
          .then(() => {
            this.addingCertifier = false
            this.fetch()
            this.$message.success('添加成功')
          })
      }
    }
  }
}
</script>
