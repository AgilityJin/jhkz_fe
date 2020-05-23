<template>
  <div class="jhkz-my-order">
    <v-form ref="queryOrders" :model="queryValid">
      <v-row dense class="jhkz-actions_nav">
        <v-col cols="3">
          <v-text-field v-model="queryForm.orderId" :rules="rules.orderId" clearable label="订单号" />
        </v-col>
        <v-col cols="3">
          <v-text-field v-model="queryForm.account" clearable label="账户" />
        </v-col>
        <v-col cols="3">
          <v-text-field v-model="queryForm.roleName" clearable label="角色名" />
        </v-col>
        <v-col cols="3">
          <v-text-field v-model="queryForm.roleArea" clearable label="区服" />
        </v-col>
        <v-col cols="3">
          <v-menu
            ref="startTimeMenu"
            v-model="startTimeMenu"
            :close-on-content-click="false"
            :return-value.sync="queryForm.startTime"
            transition="scale-transition"
            offset-y
          >
            <template v-slot:activator="{ on }">
              <v-text-field
                v-model="queryForm.startTime"
                :prepend-icon="mdiCalendarRange"
                clearable
                label="开始时间"
                readonly
                v-on="on"
              />
            </template>

            <v-date-picker
              v-model="queryForm.startTime"
              :allowed-dates="allowedStartDates"
              class="max-width"
              scrollable
              :first-day-of-week="0"
              locale="zh-cn"
            >
              <v-spacer />
              <v-btn text color="primary" @click="startTimeMenu = false">
                取消
              </v-btn>
              <v-btn text color="primary" @click="$refs.startTimeMenu.save(queryForm.startTime)">
                确认
              </v-btn>
            </v-date-picker>
          </v-menu>
        </v-col>
        <v-col cols="3">
          <v-menu
            ref="endTimeMenu"
            v-model="endTimeMenu"
            :close-on-content-click="false"
            :return-value.sync="queryForm.endTime"
            transition="scale-transition"
            offset-y
          >
            <template v-slot:activator="{ on }">
              <v-text-field
                v-model="queryForm.endTime"
                :prepend-icon="mdiCalendarRange"
                clearable
                label="截止时间"
                readonly
                v-on="on"
              />
            </template>

            <v-date-picker
              v-model="queryForm.endTime"
              :allowed-dates="allowedEndDates"
              class="max-width"
              scrollable
              :first-day-of-week="0"
              locale="zh-cn"
            >
              <v-spacer />
              <v-btn text color="primary" @click="endTimeMenu = false">
                取消
              </v-btn>
              <v-btn text color="primary" @click="$refs.endTimeMenu.save(queryForm.endTime)">
                确认
              </v-btn>
            </v-date-picker>
          </v-menu>
        </v-col>
        <v-col cols="3">
          <v-select
            v-model="queryForm.status"
            :items="ORDER_STATUS"
            clearable
            hide-selected
            label="订单状态"
          />
        </v-col>
        <v-col cols="3">
          <v-btn color="primary" @click="queryOrders">
            查询
          </v-btn>
        </v-col>
      </v-row>
    </v-form>

    <!-- table -->
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
      <template v-slot:item.images="{ item }">
        <v-icon small @click="openScreenshotManagerPanel(item)">
          {{ mdiFolderMultipleImage }}
        </v-icon>
      </template>

      <template v-slot:item.startTime="{ item }">
        {{ item.startTime }}
      </template>
      <template v-slot:item.endTime="{ item }">
        {{ item.endTime }}
      </template>ORDER_STATUS_MAP
      <template v-slot:item.status="{ item }">
        {{ ORDER_STATUS_MAP[item.status] }}
      </template>
    </v-data-table>
    <app-pagination :page.sync="pager.page" :size.sync="pager.size" :total-page="pager.totalPage" @pageChange="pageChange" @sizeChange="sizeChange" />
  </div>
</template>

<script lang="ts">
import { Vue, Component, Ref } from 'vue-property-decorator'
import { mdiCalendarRange, mdiFolderMultipleImage } from '@mdi/js'
import { asyncTask } from '@helper-gdp/utils'
import { debounce } from 'lodash'
import { length, isPhone, required } from '../../utils/validate'
import { ORDER_LENGTH } from '../../config/limit-length'
import { AppPagination } from '~/components'
import { ORDER_STATUS_MAP, ORDER_STATUS } from '~/config'

@Component({
  components: {
    AppPagination
  }
})
export default class MyOrderPage extends Vue {
  queryValid = false
  mdiCalendarRange = mdiCalendarRange
  mdiFolderMultipleImage = mdiFolderMultipleImage
  startTimeMenu = false
  endTimeMenu = false
  tableLoading = false
  ORDER_STATUS = ORDER_STATUS
  ORDER_STATUS_MAP = ORDER_STATUS_MAP
  tableData = []
  queryForm = {
    orderId: '', // 精确
    account: '', // 精确
    startTime: '',
    endTime: '',
    roleName: '',
    roleArea: '',
    comments: '',
    status: ''
  }

  pager = {
    page: 1,
    size: 10,
    count: 0,
    totalPage: 0,
    totalElements: 0
  }

  rules = {
    orderId: [
      length(ORDER_LENGTH, `请提供正确的${ORDER_LENGTH}位订单号`)
    ],
    phone: [
      isPhone('请填写正确的手机号')
    ],
    account: [
      required('请提供账号')
    ],
    formPhone: [
      required('请提供联系手机'),
      isPhone('请填写正确的手机号')
    ],
    gameCategoryId: [
      required('请选择订单所属游戏')
    ]
  }

  headers = [{
    text: '订单号',
    align: 'center',
    value: 'orderId',
    sortable: false
  }, {
    text: '所属游戏',
    align: 'center',
    value: 'gameCategory.name',
    sortable: false
  }, {
    text: '账号',
    align: 'center',
    value: 'account',
    sortable: false
  }, {
    text: '角色名',
    align: 'center',
    value: 'roleName',
    sortable: false
  }, {
    text: '区服',
    value: 'roleArea',
    align: 'center',
    sortable: false
  }, {
    text: '开始时间',
    align: 'center',
    value: 'startTime',
    sortable: false
  }, {
    text: '截止时间',
    value: 'endTime',
    align: 'center',
    sortable: false
  }, {
    text: '状态',
    value: 'status',
    align: 'center',
    sortable: false
  }, {
    text: '代练截图',
    value: 'images',
    align: 'center',
    sortable: false
  }]

  @Ref('queryOrders') queryOrdersRef: any

  created () {
    if (this.$route.query.orderId) {
      this.queryForm.orderId = this.$route.query.orderId as string
    }
    this.getOrders()
  }

  openScreenshotManagerPanel () {}

  queryOrders () {
    const validate = this.queryOrdersRef.validate()
    if (!validate) { return }
    this.getOrders()
  }

  getOrders = debounce(async function (page = 1, size = this.pager.size) {
    this.tableLoading = true
    const params = {
      ...this.queryForm,
      page,
      size
    }
    const [err, result]: any[] = await asyncTask(this.$api.queryOrders(params))
    this.tableLoading = false
    if (err) { return }
    this.pager.page = page
    this.pager.size = size
    this.pager.totalPage = result.totalPage
    this.pager.totalElements = result.totalElements
    this.tableData = result.content || []
  }, 200)

  pageChange (val: number) {
    if (val === this.pager.page) { return }
    this.getOrders(val)
  }

  sizeChange (val: number) {
    if (val === this.pager.size) { return }
    this.getOrders(1, val)
  }

  allowedEndDates (val: string) {
    if (!this.queryForm.startTime) { return true }
    return new Date(this.queryForm.startTime) <= new Date(val)
  }

  allowedStartDates (val: string) {
    if (!this.queryForm.endTime) { return true }
    return new Date(this.queryForm.endTime) >= new Date(val)
  }
}
</script>

<style lang="stylus" scoped>
+block(my-order)
  padding  33px 33px 33px 40px
</style>
