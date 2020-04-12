<template>
  <div>
    <v-row dense class="jhkz-actions__nav">
      <v-col cols="3">
        <v-text-field v-model="queryForm.name" clearable label="角色名" />
      </v-col>
      <v-col cols="3">
        <v-btn color="primary" dark @click="getRoles(1)">
          查询
        </v-btn>
      </v-col>
      <v-col cols="12">
        <v-btn color="primary" dark @click="openRole('add')">
          新建角色
        </v-btn>
      </v-col>
    </v-row>
    <v-data-table
      class="jhkz-table__default"
      :headers="headers"
      :items="tableData"
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
          @click="openRole('edit', item)"
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

      <template v-slot:item.authorities="{ item }">
        <v-tooltip bottom>
          <template v-slot:activator="{ on }">
            <span v-on="on">
              {{ item.authorities | showAuthsName | limitLength(40) }}
            </span>
          </template>
          <span>{{ item.authorities | showAuthsName }}</span>
        </v-tooltip>
      </template>
    </v-data-table>

    <!-- 新增/修改 -->
    <v-dialog v-model="createRolePanel" max-width="650px" @click:outside="closeCreateRolePanel">
      <v-card :loading="submitStatus">
        <v-card-title>
          <span>{{ rolePanelType === 'add' ? '新建' : '修改 ' }}角色</span>
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
              <v-menu v-model="authsMenuPanel" :close-on-content-click="false" offset-y>
                <template v-slot:activator="{ on }">
                  <v-text-field v-model="showAuths" readonly label="角色权限" v-on="on" />
                </template>

                <v-card>
                  <v-sheet class="pa-4 primary lighten-2">
                    <v-text-field
                      v-model="searchAuths"
                      label="过滤权限列表"
                      dark
                      flat
                      solo-inverted
                      hide-details
                      clearable
                      clear-icon="mdi-close-circle-outline"
                    />
                  </v-sheet>
                  <v-card-text style="max-height: 80vh;overflow: auto">
                    <v-treeview
                      v-model="form.auths"
                      selection-type="independent"
                      :items="authsTree"
                      :search="searchAuths"
                      open-all
                      item-key="key"
                      selectable
                      @input="authsChange"
                    />
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer />
                    <v-btn color="blue darken-1" text @click="authsMenuPanel = false">
                      完成
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-menu>
            </v-form>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn text @click="closeCreateRolePanel">
            取消
          </v-btn>
          <v-btn color="blue darken-1" text @click="submitOrUpdate(rolePanelType)">
            {{ rolePanelType === 'add' ? '创建' : '修改 ' }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <jhkz-pagination :page.sync="pager.page" :size.sync="pager.size" :total-page="pager.totalPage" @pageChange="paginationChange" @sizeChange="sizeChange" />
    <jhkz-confirm v-model="confirmPanel" :loading="confirmLoading" :message="currentMsg" @confirm="deleteItem" @close="closeConfirmPanel" />
  </div>
</template>

<script lang="ts">
import { required, maxLength, refValidate, minLength, refReset } from '../../../utils/validate'
import { Vue, Component } from 'vue-property-decorator'
import { Action } from 'vuex-class'
import { debounce } from 'lodash'
import { Pagination, Confirm } from '~/components'
import { SYNOPSIS_MAX_LENGTH, TITLE_MAX_LENGTH, TITLE_MIN_LENGTH } from '~/config/limit-length'

@Component({
  filters: {
    limitLength (text: string, length: number = 0) {
      if (!text || length === 0 || text.length <= length) { return text }
      return text.slice(0, length) + '...'
    },
    showAuthsName (auths: any[]) {
      if (!auths || !auths.length) { return }
      return auths.map(el => el.name).join('、')
    }
  },
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
      text: '权限',
      sortable: false,
      align: 'center',
      value: 'authorities'
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
  rolePanelType = ''
  authsMenuPanel = false
  authsTree: any[] = []
  AUTHS_MAP: any = {}
  searchAuths = ''
  showAuths = ''

  form: any = {
    name: '',
    description: '',
    auths: [],
    id: 0
  }

  queryForm = {
    name: ''
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

  async created () {
    this.getRoles()
    const auths = await this.getAuths()
    this.transferAuths(auths)
  }

  @Action('getAuths', { namespace: 'system-info' })
  getAuths: () => Record<string, any>[]

  authsChange (auths: string[]) {
    const arr = auths.map(key => this.AUTHS_MAP[key])
    this.showAuths = arr.join('、')
  }

  transferAuths (auths: Record<string, any>[]) {
    if (!auths || !auths.length) { return }
    // 一二级权限
    const authsArr: any[] = []
    // 三级权限
    const notFoundArr: any[] = []
    auths.forEach((auth) => {
      this.AUTHS_MAP[auth.key] = auth.name
      if (!auth.parentId) {
        // 一级权限
        return authsArr.push({
          ...auth,
          children: []
        })
      }
      const parent = authsArr.find(auths => auths.key === auth.parentId)
      if (parent) {
        parent.children.push({
          ...auth,
          children: []
        })
      } else {
        notFoundArr.push(auth)
      }
    })

    let twoAuths: any[] = []
    authsArr.forEach((auth) => {
      twoAuths = twoAuths.concat(auth.children)
    })

    twoAuths.forEach((auth) => {
      const arr = notFoundArr.filter(el => el.parentId === auth.key)
      auth.children = auth.children.concat(arr)
    })

    this.authsTree = authsArr
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
    if (this.rolePanelType === 'edit') {
      this.form.id = 0
    }
    this.form.auths = []
    this.rolePanelType = ''
    this.submitStatus = false
  }

  openRole (type: 'add' | 'edit', item?: any) {
    if (type === 'edit') {
      this.form.name = item.name
      this.form.description = item.description
      this.form.id = item.id
      this.form.auths = item.authorities && item.authorities.map((el: any) => el.key)
      this.authsChange(this.form.auths)
    }
    this.rolePanelType = type
    this.createRolePanel = true
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

  submitOrUpdate (type: 'add' | 'edit') {
    if (type === 'add') {
      this.submit()
    } else { this.update() }
  }

  async update () {
    const validate = await refValidate(this.$refs, 'createRole')
    if (!validate) { return }
    this.submitStatus = true
    await this.$api.putRole({
      name: this.form.name,
      description: this.form.description || '',
      auths: this.form.auths || []
    }, {
      payload: `/${this.form.id}`
    })
    this.submitStatus = false
    this.closeCreateRolePanel()
    this.$msg.success('角色修改成功')
    this.getRoles()
  }

  async submit () {
    const validate = await refValidate(this.$refs, 'createRole')
    if (!validate) { return }
    this.submitStatus = true
    await this.$api.createRole({
      name: this.form.name,
      description: this.form.description || '',
      auths: this.form.auths || []
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

  getRoles = debounce(async function (page = 1, size = this.pager.size) {
    this.tableLoading = true
    const result = await this.$api.rolesList({
      name: this.queryForm.name,
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
