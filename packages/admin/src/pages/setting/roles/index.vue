<template>
  <div>
    <div class="jhkz-actions__nav">
      <!-- 新增 -->
      <v-dialog v-model="createRolePanel" max-width="600px" @click:outside="closeCreateRolePanel">
        <template v-slot:activator="{ on }">
          <v-btn color="primary" dark v-on="on">
            新建角色
          </v-btn>
        </template>

        <v-card :loading="submitStatus">
          <v-card-title>
            <span>新建角色</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-form ref="createRole" :model="formValid">
                <v-text-field v-model="form.name" :rules="rules.name" autofocus label="角色名" />
                <v-textarea
                  v-model="form.description"
                  :counter="limitDesc"
                  :rules="rules.description"
                  no-resize
                  rows="1"
                  auto-grow
                  label="描述"
                />
              </v-form>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer />
            <v-btn text @click="closeCreateRolePanel">
              取消
            </v-btn>
            <v-btn color="blue darken-1" text @click="submit">
              创建
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
    <v-data-table
      class="jhkz-table__default"
      :loding="tableLoading"
      loding-text="数据加载中"
      :headers="headers"
      :items="tableData"
      no-data-text="没有更多数据了"
      hide-default-footer
      :page.sync="pager.page"
      :items-per-page.sync="pager.size"
      :page-count="pager.totalPage"
    >
      <template v-slot:item.actions="{ item }">
        <v-icon
          small
          class="mr-2"
          @click="editItem(item)"
        >
          mdi-pencil
        </v-icon>
        <v-icon
          small
          @click="openConfirmPanel(item)"
        >
          mdi-delete
        </v-icon>
      </template>
    </v-data-table>
    <jhkz-pagination :page.sync="pager.page" :size.sync="pager.size" :total-page="pager.totalPage" @pageChange="paginationChange" @sizeChange="sizeChange" />
    <jhkz-confirm v-model="confirmPanel" :loading="confirmLoading" :message="currentMsg" @confirm="deleteItem" @close="closeConfirmPanel" />
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { required, maxLength, refValidate, minLength, refReset } from '../../../utils/validate'
import { Pagination, Confirm } from '~/components'
import { SYNOPSIS_MAX_LENGTH, TITLE_MAX_LENGTH, TITLE_MIN_LENGTH } from '~/config/limit-length'

@Component({
  components: {
    [Pagination.options.name]: Pagination,
    [Confirm.options.name]: Confirm
  }
})
export default class RolesSettingPage extends Vue {
  headers = [
    {
      text: '角色名',
      sortable: false,
      align: 'center',
      value: 'name'
    },
    {
      text: '描述',
      sortable: false,
      align: 'center',
      value: 'description'
    },
    {
      text: '操作',
      value: 'actions',
      sortable: false,
      align: 'center'
    }
  ]

  createRolePanel = false
  tableLoading = false
  tableData = []
  formValid = false
  limitDesc = SYNOPSIS_MAX_LENGTH
  submitStatus = false
  confirmPanel = false
  currentItem: any = null
  currentMsg = ''
  confirmLoading = false

  form = {
    name: '',
    description: ''
  }

  rules = {
    name: [
      required('请填写角色名称'),
      minLength(TITLE_MIN_LENGTH, `名称长度不可小于${TITLE_MIN_LENGTH}`),
      maxLength(TITLE_MAX_LENGTH, `名称长度不可大于${TITLE_MAX_LENGTH}`)
    ],
    description: [
      maxLength(SYNOPSIS_MAX_LENGTH, `描述内容长度不可大于${SYNOPSIS_MAX_LENGTH}`)
    ]
  }

  pager = {
    page: 1,
    size: 10,
    totalPage: 0,
    totalElements: 0
  }

  closeConfirmPanel () {
    this.currentItem = null
    this.currentMsg = ''
  }

  openConfirmPanel (item: any) {
    if (!item) {
      throw new Error('未能获取到item数据')
    }
    this.currentItem = item
    this.currentMsg = `您确认删除 ${this.currentItem.name} 此项吗`
    this.confirmPanel = true
  }

  closeCreateRolePanel () {
    refReset(this.$refs, 'createRole')
    this.createRolePanel = false
  }

  async deleteItem () {
    this.confirmLoading = true
    await this.$api.deleteRole(undefined, {
      payload: `/${this.currentItem.id}`
    })
    this.confirmLoading = false
    this.$msg.success(`删除 ${this.currentItem.name} 角色成功`)
    this.confirmPanel = false
    this.closeConfirmPanel()
    this.getRoles()
  }

  async submit () {
    const validate = await refValidate(this.$refs, 'createRole')
    if (!validate) { return }
    this.submitStatus = true
    await this.$api.createRole({
      name: this.form.name,
      description: this.form.description || ''
    })
    this.submitStatus = false
    this.closeCreateRolePanel()
    this.$msg.success('角色新建成功')
    this.getRoles()
  }

  paginationChange (val: number) {
    if (val === this.pager.page) { return }
    this.getRoles(val)
  }

  sizeChange (val: number) {
    if (val === this.pager.size) { return }
    this.getRoles(1, val)
  }

  async getRoles (page = 1, size = this.pager.size) {
    this.tableLoading = true
    const result = await this.$api.rolesList({
      page,
      size
    })
    this.tableLoading = false
    this.pager.page = page
    this.pager.size = size
    this.pager.totalPage = result.totalPage
    this.pager.totalElements = result.totalElements
    this.tableData = result.content || []
  }

  created () {
    this.getRoles()
  }
}
</script>

<style lang="stylus" scoped>
</style>
