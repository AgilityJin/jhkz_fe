<template>
  <div>
    <v-form ref="queryOrders" :model="queryValid">
      <v-row dense class="jhkz-actions_nav">
        <v-col cols="3">
          <v-text-field v-model="queryForm.orderId" :rules="rules.orderId" clearable label="订单号" />
        </v-col>
        <v-col cols="3">
          <v-text-field v-model="queryForm.phone" :rules="rules.phone" clearable label="手机" />
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
        <v-col cols="12">
          <v-btn color="primary" dark @click="openOrderPanel('add')">
            新建订单
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
      <template v-slot:item.actions="{ item }">
        <v-icon
          small
          class="mr-2"
          @click="openOrderPanel('edit', item)"
        >
          mdi-pencil
        </v-icon>
        <v-icon
          small
          @click="openConfirm('delete', item)"
        >
          mdi-delete
        </v-icon>
      </template>

      <template v-slot:item.startTime="{ item }">
        {{ item.startTime | parseISO | formatDate('yyyy-MM-dd') }}
      </template>
      <template v-slot:item.endTime="{ item }">
        {{ item.endTime | parseISO | formatDate('yyyy-MM-dd') }}
      </template>ORDER_STATUS_MAP
      <template v-slot:item.status="{ item }">
        {{ ORDER_STATUS_MAP[item.status] }}
      </template>
    </v-data-table>
    <jhkz-pagination :page.sync="pager.page" :size.sync="pager.size" :total-page="pager.totalPage" @pageChange="pageChange" @sizeChange="sizeChange" />

    <v-dialog v-model="createOrUpdatePanel" max-width="650" @click:outside="closeOrderPanel">
      <v-card :loading="orderPanelLoading">
        <v-card-title>
          <span>{{ orderPanelType === 'add' ? '新建' : '修改 ' }}订单</span>
        </v-card-title>

        <v-card-text>
          <v-container>
            <v-form ref="order" :model="orderValid">
              <v-text-field v-model="currentForm.account" :rules="rules.account" autofocus label="*账号" />
              <v-text-field v-model="currentForm.phone" :rules="rules.formPhone" label="*联系手机" />
              <v-row dense>
                <v-col cols="6">
                  <v-text-field v-model="currentForm.password" type="password" label="账号密码" />
                </v-col>
                <v-col cols="6">
                  <v-select
                    v-model="currentForm.status"
                    :items="ORDER_STATUS"
                    hide-selected
                    label="订单状态"
                  />
                </v-col>
                <v-col cols="6">
                  <v-text-field v-model="currentForm.roleName" label="角色名" />
                </v-col>
                <v-col cols="6">
                  <v-text-field v-model="currentForm.roleArea" label="角色区服" />
                </v-col>
                <v-col cols="6">
                  <v-menu
                    ref="startTimeOrderMenu"
                    v-model="startTimeOrderMenu"
                    :close-on-content-click="false"
                    :return-value.sync="currentForm.startTime"
                    transition="scale-transition"
                    offset-y
                  >
                    <template v-slot:activator="{ on }">
                      <v-text-field
                        v-model="currentForm.startTime"
                        :prepend-icon="mdiCalendarRange"
                        label="开始时间"
                        clearable
                        readonly
                        v-on="on"
                      />
                    </template>

                    <v-date-picker
                      v-model="currentForm.startTime"
                      :allowed-dates="allowedStartDatesOrder"
                      class="max-width"
                      scrollable
                      :first-day-of-week="0"
                      locale="zh-cn"
                    >
                      <v-spacer />
                      <v-btn text color="primary" @click="startTimeOrderMenu = false">
                        取消
                      </v-btn>
                      <v-btn text color="primary" @click="$refs.startTimeOrderMenu.save(currentForm.startTime)">
                        确认
                      </v-btn>
                    </v-date-picker>
                  </v-menu>
                </v-col>
                <v-col cols="6">
                  <v-menu
                    ref="endTimeOrderMenu"
                    v-model="endTimeOrderMenu"
                    :close-on-content-click="false"
                    :return-value.sync="currentForm.endTime"
                    transition="scale-transition"
                    offset-y
                  >
                    <template v-slot:activator="{ on }">
                      <v-text-field
                        v-model="currentForm.endTime"
                        :prepend-icon="mdiCalendarRange"
                        label="截止时间"
                        clearable
                        readonly
                        v-on="on"
                      />
                    </template>

                    <v-date-picker
                      v-model="currentForm.endTime"
                      :allowed-dates="allowedEndDatesOrder"
                      class="max-width"
                      scrollable
                      :first-day-of-week="0"
                      locale="zh-cn"
                    >
                      <v-spacer />
                      <v-btn text color="primary" @click="endTimeOrderMenu = false">
                        取消
                      </v-btn>
                      <v-btn text color="primary" @click="$refs.endTimeOrderMenu.save(currentForm.endTime)">
                        确认
                      </v-btn>
                    </v-date-picker>
                  </v-menu>
                </v-col>
              </v-row>
              <v-textarea
                v-model="currentForm.comments"
                :counter="limitDesc"
                no-resize
                rows="1"
                auto-grow
                label="备注"
              />
            </v-form>
          </v-container>
        </v-card-text>

        <v-card-actions>
          <v-spacer />
          <v-btn text @click="closeOrderPanel">
            取消
          </v-btn>
          <v-btn color="blue darken-1" text @click="submitOrUpdate(orderPanelType)">
            {{ orderPanelType === 'add' ? '创建' : '修改 ' }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <jhkz-confirm v-model="confirmPanel" :loading="confirmLoading" :message="confirmMsg" @confirm="confirm" @close="closeConfirm" />
  </div>
</template>

<script lang="ts">
import { refValidate, refReset, isPhone, length, required } from '../../utils/validate'
import { ORDER_LENGTH } from '../../config/limit-length'
import { Vue, Component } from 'vue-property-decorator'
import { mdiCalendarRange } from '@mdi/js'
import { Pagination, Confirm } from '~/components'
import debounce from 'lodash/debounce'
import { asyncTask } from '@helper-gdp/utils'
import { SYNOPSIS_MAX_LENGTH } from '~/config/limit-length'
import { format, parseISO } from 'date-fns'
import { ORDER_STATUS_MAP, ORDER_STATUS } from '~/config/constants'

@Component({
  components: {
    [Pagination.options.name]: Pagination,
    [Confirm.options.name]: Confirm
  }
})
export default class OrderPage extends Vue {
  queryValid = false
  startTimeMenu = false
  endTimeMenu = false
  tableLoading = false
  tableData = []
  confirmPanel = false
  confirmLoading = false
  confirmMsg = ''
  confirmType: 'delete' | '' = ''
  confirmItem: any = null
  ORDER_STATUS = ORDER_STATUS
  ORDER_STATUS_MAP = ORDER_STATUS_MAP

  headers = [{
    text: '订单号',
    align: 'center',
    value: 'orderId',
    sortable: false
  }, {
    text: '账号',
    align: 'center',
    value: 'account',
    sortable: false
  }, {
    text: '联系手机',
    value: 'phone',
    align: 'center',
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
    text: '备注',
    value: 'comments',
    align: 'center',
    sortable: false
  }, {
    text: '操作',
    value: 'actions',
    align: 'center',
    sortable: false
  }]

  // icon
  mdiCalendarRange = mdiCalendarRange

  queryForm = {
    orderId: '', // 精确
    phone: '', // 精确
    account: '', // 精确
    startTime: '',
    endTime: '',
    roleName: '',
    roleArea: '',
    comments: '',
    status: ''
  }

  currentForm = {
    account: '',
    phone: '',
    password: '',
    roleName: '',
    roleArea: '',
    startTime: '',
    endTime: '',
    comments: '',
    status: 'not_started'
  }

  currentId = 0
  orderValid = false
  orderPanelType: 'add' | 'edit' = 'add'
  createOrUpdatePanel = false
  orderPanelLoading = false
  limitDesc = SYNOPSIS_MAX_LENGTH
  startTimeOrderMenu = false
  endTimeOrderMenu = false

  pager = {
    page: 1,
    size: 10,
    count: 0,
    totalPage: 0,
    totalElements: 0
  }

  rules = {
    orderId: [
      length(ORDER_LENGTH, '请提供正确的21位订单号')
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
    ]
  }

  created () {
    this.getOrders()
  }

  openConfirm (type: 'delete', item: any) {
    this.confirmType = type
    this.confirmItem = item
    switch (this.confirmType) {
      case 'delete':
        this.confirmMsg = `您确认删除 ${item.account} 吗?这将会彻底移除该订单`
        this.confirmPanel = true
        break
      default:
        break
    }
  }

  closeConfirm () {
    this.confirmPanel = false
    this.confirmLoading = false
    this.confirmType = ''
    this.confirmItem = null
    this.confirmMsg = ''
  }

  async confirm () {
    switch (this.confirmType) {
      case 'delete':
        this.confirmLoading = true
        await this.$api.removeOrder(undefined, {
          payload: `/${this.confirmItem.id}`
        })
        this.$msg.success('删除订单成功')
        this.closeConfirm()
        this.getOrders()
        break

      default:
        break
    }
  }

  async queryOrders () {
    const validate = await refValidate(this.$refs, 'queryOrders')
    if (!validate) { return }
    this.getOrders()
  }

  async submit () {
    const validate = await refValidate(this.$refs, 'order')
    if (!validate) { return }
    this.orderPanelLoading = true
    const [err] = await asyncTask(this.$api.createOrder(this.currentForm))
    this.orderPanelLoading = false
    if (err) { return }
    this.closeOrderPanel()
    this.$msg.success('订单创建成功')
    this.getOrders()
  }

  async update (params: {}, id: number) {
    await this.$api.updateOrder(params, {
      payload: `/${id}`
    })
    this.$msg.success('订单修改成功')
    this.getOrders()
  }

  async submitOrUpdate (type: 'add' | 'edit') {
    if (type === 'add') {
      this.submit()
    } else {
      this.orderPanelLoading = true
      await this.update(this.currentForm, this.currentId)
      this.closeOrderPanel()
    }
  }

  closeOrderPanel () {
    refReset(this.$refs, 'order')
    this.createOrUpdatePanel = false
    this.orderPanelLoading = false
    this.orderPanelType = 'add'
    this.currentId = 0
  }

  openOrderPanel (type: 'add' | 'edit', item?: any) {
    if (type === 'edit') {
      this.currentForm.account = item.account
      this.currentForm.phone = item.phone
      this.currentForm.password = item.password
      this.currentForm.roleName = item.roleName
      this.currentForm.roleArea = item.roleArea
      this.currentForm.startTime = item.startTime && format(parseISO(item.startTime), 'yyyy-MM-dd')
      this.currentForm.endTime = item.endTime && format(parseISO(item.endTime), 'yyyy-MM-dd')
      this.currentForm.comments = item.comments
      this.currentForm.status = item.status
      this.currentId = item.id
    } else {
      this.currentForm.status = 'not_started'
    }
    this.orderPanelType = type
    this.createOrUpdatePanel = true
  }

  allowedEndDatesOrder (val: string) {
    if (!this.currentForm.startTime) { return true }
    return new Date(this.currentForm.startTime) <= new Date(val)
  }

  allowedStartDatesOrder (val: string) {
    if (!this.currentForm.endTime) { return true }
    return new Date(this.currentForm.endTime) >= new Date(val)
  }

  allowedEndDates (val: string) {
    if (!this.queryForm.startTime) { return true }
    return new Date(this.queryForm.startTime) <= new Date(val)
  }

  allowedStartDates (val: string) {
    if (!this.queryForm.endTime) { return true }
    return new Date(this.queryForm.endTime) >= new Date(val)
  }

  pageChange (val: number) {
    if (val === this.pager.page) { return }
    this.getOrders(val)
  }

  sizeChange (val: number) {
    if (val === this.pager.size) { return }
    this.getOrders(1, val)
  }

  getOrders = debounce(async function (page = 1, size = this.pager.size) {
    this.tableLoading = true
    const params = {
      ...this.queryForm,
      page,
      size
    }
    const [err, result]: any[] = await asyncTask(this.$api.getOrders(params))
    this.tableLoading = false
    if (err) { return }
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
