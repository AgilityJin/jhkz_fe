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
  </div>
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
export default class GameCategoriesPage extends Vue {
  tableData = []
  tableLoading = false
  queryForm = {
    name: ''
  }

  rules = {
    name: [],
    website: []
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
      vale: 'name',
      align: 'center',
      sortable: false
    },
    {
      text: '游戏官网',
      vale: 'website',
      align: 'center',
      sortable: false
    },
    {
      text: '操作',
      vale: 'actions',
      align: 'center',
      sortable: false
    }
  ]

  created () {
    this.getGameCategories()
  }

  openCategory (type: 'add' | 'edit', row: any) {}

  openConfirmPanel () {}

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

<style lang="stylus">
+block(game-categories) {}
</style>
