<template>
  <v-dialog v-model="dialogScreenshot" class="jhkz-screenshot" width="650px">
    <v-card :loading="uploadLoading">
      <v-card-title>订单截图管理</v-card-title>

      <v-card-text>
        <v-row>
          <v-col cols="6">
            <span class="jhkz-screenshot__order-id">所属订单: {{ orderId }}</span>
          </v-col>
          <v-col cols="6">
            <v-menu
              ref="imagesDate"
              v-model="imagesDateMenu"
              :close-on-content-click="false"
              :return-value.sync="dates"
              transition="scale-transition"
              offset-y
            >
              <template v-slot:activator="{ on }">
                <v-text-field
                  v-model="showDateInput"
                  class="jhkz-screenshot__input"
                  :prepend-icon="mdiCalendarRange"
                  label="截图起止日期"
                  readonly
                  v-on="on"
                />
              </template>

              <v-date-picker
                v-model="dates"
                :allowed-dates="allowedDates"
                range
                class="max-width"
                scrollable
                :first-day-of-week="0"
                locale="zh-cn"
              >
                <v-spacer />
                <v-btn text color="primary" @click="imagesDateMenu = false">
                  取消
                </v-btn>
                <v-btn text color="primary" @click="$refs.imagesDate.save(dates)">
                  确认
                </v-btn>
              </v-date-picker>
            </v-menu>
          </v-col>
        </v-row>
        <v-divider />
        <v-row>
          <v-col cols="3">
            <v-card hover height="130px" @click="activeUpload">
              <v-icon large class="jhkz-screenshot__plus">
                mdi-plus
              </v-icon>
            </v-card>
          </v-col>
          <v-col v-for="item in screenshotList" :key="item.id" cols="3">
            <v-lazy>
              <v-card hover height="130px">
                <v-img height="100%" :src="item.coverImgUrl" />
              </v-card>
            </v-lazy>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
    <v-file-input v-show="false" ref="fileInput" accept="image/*" label="截图上传" @change="fileChange" />
  </v-dialog>
</template>

<script lang="ts">
import { Component, Vue, Model, Watch, Emit, Prop, Ref } from 'vue-property-decorator'
import { mdiCalendarRange } from '@mdi/js'
import { format } from 'date-fns'
import { Getter } from 'vuex-class'

@Component({
  name: 'screenshot-manager'
})
export default class ScreenshotManager extends Vue {
  @Model('input', { type: Boolean }) value: boolean
  @Prop(String) orderId: string

  dialogScreenshot = false
  uploadLoading = false
  imagesDateMenu = false
  mdiCalendarRange = mdiCalendarRange
  dates = [format(new Date(), 'yyyy-MM-dd')]
  screenshotList = []
  queryForm = {
    currentDate: ''
  }

  get showDateInput () {
    const date = this.formatDates(this.dates)
    if (date.start && date.end) {
      return `${date.start} ~ ${date.end}`
    }
    return date.start
  }

  @Getter('userInfo', { namespace: 'context' }) userInfo: Record<string, any>

  @Ref('fileInput') readonly fileInput: any

  @Watch('dates')
  datesWatch (val: [string] | [string, string]) {
    const date = this.formatDates(val)
    if (date.start && date.end) {
      this.$emit('change', date)
    }
  }

  @Watch('dialogScreenshot')
  dialogScreenshotWatch (val: boolean) {
    if (val === this.value) { return }
    this.$emit('input', val)
    if (val === false) {
      this.close()
    }
  }

  @Watch('value', { immediate: true })
  valueWatch (val: boolean) {
    if (val === this.dialogScreenshot) { return }
    this.dialogScreenshot = val
    if (val) {
      this.queryImages()
    }
  }

  @Watch('orderId', { immediate: true })
  orderIdWatch (val: string) {
    if (!val) { return }
    this.queryImages()
  }

  @Emit()
  close () {}

  async queryImages () {
    this.screenshotList = await this.$api.getOrders(undefined, {
      payload: `/${this.orderId}/images`
    })
  }

  async uploadImage (file: any) {
    const formData = new FormData()
    formData.append('file', file)
    formData.append('orderId', this.orderId)
    formData.append('userId', this.userInfo.userId)
    this.uploadLoading = true
    await this.$api.uploadImage(formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    this.uploadLoading = false
    this.$msg.success('图片上传成功')
    this.queryImages()
  }

  fileChange (file: any) {
    this.uploadImage(file)
  }

  activeUpload () {
    this.fileInput.$refs.input.click()
  }

  formatDates (dates: [string] | [string, string] | any[] | null | undefined) {
    const dateObj = {
      start: '',
      end: ''
    }
    if (!dates || !dates.length) { return dateObj }
    if (dates.length === 2) {
      const firstTime = new Date(dates[0])
      const twoTime = new Date(dates[1])
      if (firstTime >= twoTime) {
        dateObj.start = dates[1]
        dateObj.end = dates[0]
      } else {
        dateObj.start = dates[0]
        dateObj.end = dates[1]
      }
    } else {
      dateObj.start = dateObj.end = dates[0]
    }
    return dateObj
  }

  allowedDates (val: string) {
    return new Date() >= new Date(val)
  }
}
</script>

<style lang="stylus" scoped>
+block(screenshot) {
  +element(input) {
    max-width 320px
  }
  +element(order-id) {
    font-size: 16px;
    line-height: 70px;
  }
  +element(plus) {
    position absolute
    margin auto
    top 0
    bottom 0
    left 0
    right 0
  }
}
</style>
