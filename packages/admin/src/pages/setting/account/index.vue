<template>
  <v-container>
    <v-form ref="queryAccountList" :model="queryValid">
      <v-row dense class="jhkz-actions__nav">
        <v-col cols="3">
          <v-text-field v-model="queryForm.account" clearable label="账户" />
        </v-col>
        <v-col cols="3">
          <v-text-field v-model="queryForm.name" clearable label="姓名" />
        </v-col>
        <v-col cols="3">
          <v-text-field v-model="queryForm.phone" clearable label="手机" />
        </v-col>
        <v-col cols="3">
          <v-text-field v-model="queryForm.nickName" clearable label="昵称" />
        </v-col>
        <v-col cols="3">
          <v-select
            v-model="queryForm.roleId"
            :items="rolesSelect"
            hide-selected
            item-text="name"
            item-value="id"
            clearable
            label="角色"
          />
        </v-col>
        <v-col cols="3">
          <v-select v-model="queryForm.enabled" :items="statusSelect" hide-selected clearable label="状态" />
        </v-col>
        <v-col cols="3">
          <v-select v-model="queryForm.gender" :items="genderSelect" hide-selected clearable label="性别" />
        </v-col>
        <v-col cols="3">
          <v-btn color="primary" @click="getAccountList(1)">
            查询
          </v-btn>
        </v-col>
      </v-row>
    </v-form>

    <v-data-table
      class="jhkz-table__default"
      :headers="headers"
      :page.sync="pager.page"
      :items-per-page.sync="pager.size"
      :page-count="pager.totalPage"
      :loading="tableLoading"
      loading-text="数据加载中"
      no-data-text="没有更多数据了"
      hide-default-footer
    />

    <jhkz-pagination :page.sync="pager.page" :size.sync="pager.size" :total-page="pager.totalPage" @pageChange="pageChange" @sizeChange="sizeChange" />
  </v-container>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import debounce from 'lodash/debounce'
import { Pagination, Confirm } from '~/components'

@Component({
  components: {
    [Pagination.options.name]: Pagination,
    [Confirm.options.name]: Confirm
  }
})
export default class AccountSetting extends Vue {
  tableLoading = false
  tableData = []
  queryValid = false
  queryForm = {
    account: '',
    name: '',
    phone: '',
    nickName: '',
    roleId: '',
    enabled: '',
    gender: ''
  }

  rolesSelect: { id: number, name: string }[] = []
  statusSelect = [{
    text: '已启用',
    value: true
  }, {
    text: '已禁用',
    value: false
  }]

  genderSelect = [{
    text: '男',
    value: 1
  }, {
    text: '女',
    value: 0
  }]

  headers = [{
    text: '账号',
    value: 'account',
    sortable: false,
    align: 'center'
  }, {
    text: '姓名',
    value: 'name',
    sortable: false,
    align: 'center'
  }, {
    text: '手机',
    value: 'phone',
    sortable: false,
    align: 'center'
  }, {
    text: '角色',
    value: 'email',
    sortable: false,
    align: 'center'
  }, {
    text: '性别',
    value: 'gender',
    sortable: false,
    align: 'center'
  }, {
    text: '年龄',
    value: 'age',
    sortable: false,
    align: 'center'
  }, {
    text: '邮箱',
    value: 'email',
    sortable: false,
    align: 'center'
  }, {
    text: '昵称',
    value: 'nickname',
    sortable: false,
    align: 'center'
  }, {
    text: '状态',
    value: 'enabled',
    sortable: false,
    align: 'center'
  }, {
    text: '操作',
    value: 'actions',
    sortable: false,
    align: 'center'
  }]

  pager = {
    page: 1,
    size: 10,
    totalPage: 0,
    totalElements: 0
  }

  created () {
    this.getRolesSelect()
    this.getAccountList()
  }

  async getRolesSelect () {
    const result = await this.$api.getSystemInfo({
      type: 'roles'
    })

    this.rolesSelect = result
  }

  pageChange () {}
  sizeChange () {}

  getAccountList = debounce(async function (page = 1, size = this.pager.size) {
    const result = await this.$api.getUsers({
      ...this.queryForm,
      page,
      size
    })
    console.log(result)
  }, 200)
}
</script>

<style lang="stylus" scoped>
</style>
