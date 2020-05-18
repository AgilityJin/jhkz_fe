<template>
  <div class="jhkz-game-categories">
    <v-row dense class="jhkz-actions__nav">
      <v-col cols="3">
        <v-text-field v-model="queryForm.name" clearable label="游戏名称" />
      </v-col>
      <v-col cols="3">
        <v-btn color="primary" dark @click="getGameCategories(1)">
          查询
        </v-btn>
      </v-col>
      <v-col cols="12">
        <v-btn color="primary" dark @click="openCategory('add')">
          新建游戏类目
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
          @click="openCategory('edit', item)"
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

    <v-dialog v-model="gameCategoryPanel" max-width="650px" @click:outside="closeGameCategoryPanel">
      <v-card :loading="dialogLoading">
        <v-card-title>
          <span>{{ gameCategoryType === 'add' ? '新建' : '修改' }}游戏类目</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-form ref="gameCategoryRef" :model="formValid">
              <v-text-field v-model="form.name" :rules="rules.name" autofocus label="*游戏名称" />
              <v-text-field v-model="form.website" :rules="rules.website" label="游戏官网" />
            </v-form>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn text @click="closeGameCategoryPanel">
            取消
          </v-btn>
          <v-btn color="blue darken-1" text @click="createOrUpdate">
            {{ gameCategoryType === 'add' ? '创建' : '修改 ' }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <jhkz-confirm v-model="confirmPanel" :loading="confirmLoading" :message="currentMsg" @confirm="removeGameCategory" @close="closeConfirmPanel" />
  </div>
</template>

<script lang="ts">
import { Vue, Component, Ref } from 'vue-property-decorator'
import debounce from 'lodash/debounce'
import { Action } from 'vuex-class'
import { asyncTask } from '@helper-gdp/utils'
import { required, isUrl } from '../../../utils/validate'
import { IGameCategories } from '../../../interface'
import { Pagination, Confirm } from '~/components'

@Component({
  components: {
    [Pagination.options.name]: Pagination,
    [Confirm.options.name]: Confirm
  }
})
export default class GameCategoriesPage extends Vue {
  tableData: any[] = []
  tableLoading = false
  dialogLoading = false
  formValid = false
  gameCategoryPanel = false
  gameCategoryType: 'add' | 'edit' = 'add'
  gameCategoryCurrentId: number = 0
  currentItem: any = null
  currentMsg = ''
  confirmPanel = false
  confirmLoading = false
  queryForm = {
    name: ''
  }

  form = {
    website: '',
    name: ''
  }

  rules = {
    name: [
      required('请提供游戏名称')
    ],
    website: [
      isUrl('请提供正确的链接')
    ]
  }

  pager = {
    page: 1,
    size: 10,
    totalPage: 0,
    totalElements: 0
  }

  headers = [
    {
      text: '游戏名称',
      value: 'name',
      align: 'center',
      sortable: false
    },
    {
      text: '游戏官网',
      value: 'website',
      align: 'center',
      sortable: false
    },
    {
      text: '操作',
      value: 'actions',
      align: 'center',
      sortable: false
    }
  ]

  @Ref('gameCategoryRef') readonly gameCategoryRef: any

  @Action('getGameCategories', { namespace: 'system-info' })
  updateSystemInfoGameCategories: (params: { force: boolean }) => Promise<IGameCategories[]>

  created () {
    this.getGameCategories()
  }

  closeConfirmPanel () {
    this.confirmPanel = false
    this.currentItem = null
    this.currentMsg = ''
  }

  openConfirmPanel (item: any) {
    if (!item) {
      throw new Error('未能获取到当前行数据')
    }
    this.currentItem = item
    this.currentMsg = `您确认删除 ${this.currentItem.name} 此项吗`
    this.confirmPanel = true
  }

  async removeGameCategory () {
    this.confirmLoading = true
    const [err] = await asyncTask(this.$api.removeGameCategory(undefined, {
      payload: `/${this.currentItem.id}`
    }))
    this.confirmLoading = false
    if (err) { return }
    this.$msg.success('删除游戏类目成功')
    const index = this.tableData.findIndex(item => item.id === this.currentItem.id)
    this.$delete(this.tableData, index)
    this.closeConfirmPanel()
    this.updateSystemInfoGameCategories({ force: true })
  }

  async createOrUpdate () {
    const validate = await this.gameCategoryRef.validate()
    if (!validate) { return }
    this.dialogLoading = true
    if (this.gameCategoryType === 'add') {
      await this.createGameCategory()
    } else {
      await this.updateGameCategory()
    }
    this.updateSystemInfoGameCategories({ force: true })
  }

  async updateGameCategory () {
    const gameCategory = await this.$api.updateGameCategory(this.form, {
      payload: `/${this.gameCategoryCurrentId}`
    })
    const data = this.tableData.find(item => item.id === gameCategory.id)
    this.closeGameCategoryPanel()
    this.$msg.success('更新游戏类目成功')
    if (data) { Object.assign(data, gameCategory) }
  }

  async createGameCategory () {
    const gameCategory = await this.$api.createGameCategory(this.form)
    this.closeGameCategoryPanel()
    this.$msg.success('游戏类目创建成功')
    this.tableData.unshift(gameCategory)
  }

  closeGameCategoryPanel () {
    if (this.gameCategoryRef) {
      this.gameCategoryRef.reset()
    }

    this.gameCategoryPanel = false
    if (this.gameCategoryType === 'edit') {
      this.gameCategoryCurrentId = 0
    }
    this.gameCategoryType = 'add'
    this.dialogLoading = false
  }

  openCategory (type: 'add' | 'edit', item: any) {
    if (type === 'edit') {
      this.gameCategoryCurrentId = item.id
      this.form.name = item.name
      this.form.website = item.website
    }
    this.gameCategoryType = type
    this.gameCategoryPanel = true
  }

  paginationChange (val: number) {
    if (val === this.pager.page) { return }
    this.getGameCategories(val)
  }

  sizeChange (val: number) {
    if (val === this.pager.size) { return }
    this.getGameCategories(1, val)
  }

  getGameCategories = debounce(async function (page = 1, size = this.pager.size) {
    this.tableLoading = true
    const result = await this.$api.getGameCategories({
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

<style lang="stylus">
+block(game-categories) {}
</style>
