<template>
  <v-container>
    <v-form ref="queryUsersList" :model="queryValid">
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
          <v-btn color="primary" @click="getUsersList(1)">
            查询
          </v-btn>
        </v-col>
        <v-col cols="12">
          <v-btn color="primary" dark @click="openUserPanel('add')">
            新建用户
          </v-btn>
        </v-col>
      </v-row>
    </v-form>

    <v-data-table
      class="jhkz-table__default"
      :items="tableData"
      :headers="headers"
      :page.sync="pager.page"
      :items-per-page.sync="pager.size"
      :page-count="pager.totalPage"
      :loading="tableLoading"
      loading-text="数据加载中"
      no-data-text="没有更多数据了"
      hide-default-footer
    >
      <template v-slot:item.actions="{ item }">
        <v-icon
          small
          class="mr-2"
          @click="openUserPanel('edit', item)"
        >
          mdi-pencil
        </v-icon>
        <v-icon
          small
          @click="openEditEnabled('delete', item)"
        >
          mdi-delete
        </v-icon>
      </template>

      <template v-slot:item.enabled="{ item }">
        <v-switch
          v-model="item.enabled"
          readonly
          style="display: inline-block;"
          @click.stop="openEditEnabled('enabled', item)"
        />
      </template>
      <template v-slot:item.gender="{ item }">
        {{ GENDER_MAP[item.gender] }}
      </template>
    </v-data-table>

    <!-- 新增/修改 -->
    <v-dialog v-model="createOrUpdatePanel" max-width="650" @click:outside="closeUserPanel">
      <v-card :loading="userPanelLoading">
        <v-card-title>
          <span>{{ userPanelType === 'add' ? '新建' : '修改 ' }}用户</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-form ref="users" :model="formValid">
              <v-text-field
                v-model="currentForm.account"
                :disabled="userPanelType === 'edit'"
                :rules="rules.account"
                :prepend-icon="mdiAccount"
                autofocus
                label="*账户"
              />
              <v-text-field
                v-model="currentForm.password"
                :disabled="userPanelType === 'edit'"
                :rules="userPanelType === 'add' ? rules.password : []"
                :type="isShowPassword ? 'text' : 'password'"
                :append-icon="isShowPassword ? 'mdi-eye' : 'mdi-eye-off'"
                :prepend-icon="mdiOnepassword"
                label="*密码"
                @click:append="isShowPassword = !isShowPassword"
              />
              <v-text-field v-model="currentForm.phone" :rules="rules.phone" :prepend-icon="mdiCellphone" label="*手机" />
              <v-row dense>
                <v-col cols="6">
                  <v-text-field v-model="currentForm.name" clearable dense label="姓名" />
                </v-col>
                <v-col cols="6">
                  <v-text-field v-model="currentForm.nickname" clearable dense label="昵称" />
                </v-col>
              </v-row>
              <v-row dense>
                <v-col cols="6">
                  <v-select
                    v-model="currentForm.gender"
                    clearable
                    dense
                    :items="genderSelect"
                    hide-selected
                    label="性别"
                  />
                </v-col>
                <v-col cols="6">
                  <v-text-field v-model="currentForm.age" clearable type="number" dense label="年龄" />
                </v-col>
              </v-row>
              <v-row dense>
                <v-col cols="6">
                  <v-text-field v-model="currentForm.email" clearable dense label="邮箱" />
                </v-col>
                <v-col cols="6">
                  <v-select
                    v-model="currentForm.roleId"
                    :items="rolesSelect"
                    dense
                    hide-selected
                    clearable
                    item-text="name"
                    item-value="id"
                    label="角色"
                  />
                </v-col>
              </v-row>
            </v-form>
          </v-container>
        </v-card-text>

        <v-card-actions>
          <v-spacer />
          <v-btn text @click="closeUserPanel">
            取消
          </v-btn>
          <v-btn color="blue darken-1" text @click="submitOrUpdate(userPanelType)">
            {{ userPanelType === 'add' ? '创建' : '修改 ' }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <jhkz-pagination :page.sync="pager.page" :size.sync="pager.size" :total-page="pager.totalPage" @pageChange="pageChange" @sizeChange="sizeChange" />
    <jhkz-confirm v-model="confirmPanel" :loading="confirmLoading" :message="confirmMsg" @confirm="confirm" @close="closeConfirm" />
  </v-container>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import debounce from 'lodash/debounce'
import { mdiAccount, mdiOnepassword, mdiCellphone } from '@mdi/js'
import { required, maxLength, minLength, isPhone, refValidate, refReset } from '../../../utils/validate'
import { ACCOUNT_MAX_LENGTH, PASSWORD_MAX_LENGTH, PASSWORD_MIN_LENGTH } from '../../../config/limit-length'
import { Pagination, Confirm } from '~/components'
import { GENDER, GENDER_MAP } from '~/config/constants'

@Component({
  components: {
    [Pagination.options.name]: Pagination,
    [Confirm.options.name]: Confirm
  }
})
export default class AccountSetting extends Vue {
  mdiAccount = mdiAccount
  mdiOnepassword = mdiOnepassword
  mdiCellphone = mdiCellphone

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

  genderSelect = GENDER
  GENDER_MAP = GENDER_MAP

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
    value: 'role.name',
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

  confirmPanel = false
  confirmLoading = false
  confirmMsg = ''
  confirmType: 'enabled' | 'delete' | '' = ''
  confirmItem: any = {}

  createOrUpdatePanel = false
  userPanelType = ''
  formValid = false
  userPanelLoading = false
  isShowPassword = false
  currentId = ''
  currentForm: any = {
    account: '',
    password: '',
    phone: '',
    name: '',
    nickname: '',
    gender: null,
    age: null,
    email: '',
    roleId: null
  }

  rules = {
    account: [
      required('请填写登录账户'),
      maxLength(ACCOUNT_MAX_LENGTH, `账户长度不可大于${ACCOUNT_MAX_LENGTH}`)
    ],
    password: [
      required('请填写登录密码'),
      minLength(PASSWORD_MIN_LENGTH, `密码长度不可小于${PASSWORD_MIN_LENGTH}`),
      maxLength(PASSWORD_MAX_LENGTH, `密码长度不可大于${PASSWORD_MAX_LENGTH}`)
    ],
    phone: [
      required('请填写用户手机'),
      isPhone('请填写正确的手机号')
    ]
  }

  created () {
    this.getRolesSelect()
    this.getUsersList()
  }

  async submit () {
    const validate = await refValidate(this.$refs, 'users')
    if (!validate) { return }
    this.userPanelLoading = true
    await this.$api.createUser(this.currentForm)
    this.closeUserPanel()
    this.$msg.success('用户新建成功')
    this.getUsersList()
  }

  async submitOrUpdate (type: 'add' | 'edit') {
    if (type === 'add') {
      this.submit()
    } else {
      this.userPanelLoading = true
      await this.update(this.currentForm, this.currentId)
      this.closeUserPanel()
    }
  }

  closeUserPanel () {
    refReset(this.$refs, 'users')
    this.currentId = ''
    this.createOrUpdatePanel = false
    this.userPanelType = ''
    this.isShowPassword = false
    this.userPanelLoading = false
  }

  openUserPanel (type: 'add' | 'edit', item?: any) {
    if (type === 'edit') {
      this.currentForm.account = item.account
      this.currentForm.phone = item.phone
      this.currentForm.name = item.name
      this.currentForm.nickname = item.nickname
      this.currentForm.gender = item.gender
      this.currentForm.age = item.age
      this.currentForm.email = item.email
      this.currentForm.roleId = item.role && item.role.id
      this.currentId = item.uuid
    }
    this.userPanelType = type
    this.createOrUpdatePanel = true
  }

  async getRolesSelect () {
    const result = await this.$api.getSystemInfo({
      type: 'roles'
    })

    this.rolesSelect = result
  }

  openEditEnabled (type: 'enabled' | 'delete', item: any) {
    this.confirmType = type
    this.confirmItem = item
    switch (this.confirmType) {
      case 'enabled':
        this.confirmMsg = `您确认${item.enabled ? '停用' : '启用'} ${item.account} 吗?`
        this.confirmPanel = true
        break
      case 'delete':
        this.confirmMsg = `您确认删除 ${item.account} 吗?这将会彻底移除该用户!`
        this.confirmPanel = true
        break
      default:
        break
    }
  }

  closeConfirm () {
    this.confirmPanel = false
    this.confirmMsg = ''
    this.confirmLoading = false
    this.confirmType = ''
    this.confirmItem = {}
  }

  async confirm () {
    switch (this.confirmType) {
      case 'enabled':
        this.confirmLoading = true
        await this.update({ enabled: !this.confirmItem.enabled }, this.confirmItem.uuid)
        this.confirmLoading = false
        this.$msg.success(`${!this.confirmItem.enabled ? '启用' : '停用'}成功`)
        this.closeConfirm()
        break
      case 'delete':
        this.confirmLoading = true
        await this.deleteUser(this.confirmItem.uuid)
        this.confirmLoading = false
        this.$msg.success('删除成功')
        this.closeConfirm()
        break
      default:
        break
    }
  }

  async deleteUser (uid: string) {
    await this.$api.deleteUser(undefined, {
      payload: `/${uid}`
    })
    this.getUsersList()
  }

  async update (params: {}, uid: string) {
    await this.$api.updateUser(params, {
      payload: `/${uid}`
    })
    this.getUsersList()
  }

  pageChange (val: number) {
    if (val === this.pager.page) { return }
    this.getUsersList(val)
  }

  sizeChange (val: number) {
    if (val === this.pager.size) { return }
    this.getUsersList(1, val)
  }

  getUsersList = debounce(async function (page = 1, size = this.pager.size) {
    this.tableLoading = true
    const result = await this.$api.getUsers({
      ...this.queryForm,
      page,
      size
    })
    this.tableLoading = false
    this.pager.page = page
    this.pager.size = size
    this.pager.totalPage = result.totalPage
    this.pager.totalElements = result.totalElements
    this.tableData = result.content || []
  }, 200)
}
</script>

<style lang="stylus" scoped>
</style>
