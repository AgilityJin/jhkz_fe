<template>
  <v-row class="jhkz-pagination">
    <v-col cols="10">
      <v-pagination
        v-model="currentPage"
        class="jhkz-pagination__page"
        :length="totalPage"
        prev-icon="mdi-menu-left"
        next-icon="mdi-menu-right"
        :total-visible="totalVisibal"
        @input="paginationChange"
      />
    </v-col>

    <v-col cols="2">
      <v-select
        v-model="defaultSize"
        class="jhkz-pagination__select"
        :items="defaultSizeItems"
        hide-selected
        :height="38"
        dense
        solo
        @change="sizeChange"
      />
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from 'vue-property-decorator'

@Component({
  name: 'app-pagination'
})
export default class PaginationComp extends Vue {
  @Prop(Number) page: number // .sync
  @Prop(Number) size: 10 | 20 | 50 | 100 // .sync
  @Prop(Number) totalPage: number
  @Prop({ type: Number, default: 10 }) totalVisibal?: number

  defaultSize = 10
  defaultSizeItems = [10, 20, 50, 100]

  currentPage = 1

  created () {
    this.currentPage = this.page
    this.defaultSize = this.size
  }

  @Watch('page')
  pageWatch (val: number) {
    if (val === this.currentPage) { return }
    this.currentPage = val
  }

  @Watch('currentPage')
  currentPageWatch (val: number) {
    if (val === this.page) { return }
    this.$emit('update:page', val)
  }

  @Watch('size')
  sizeWatch (val: number) {
    if (val === this.defaultSize) { return }
    this.defaultSize = val
  }

  @Watch('defaultSize')
  defaultSizeWatch (val: number) {
    if (val === this.size) { return }
    this.$emit('update:size', val)
  }

  sizeChange (val: number) {
    if (val === this.size) { return }
    this.$emit('sizeChange', val)
  }

  paginationChange (val: number) {
    if (val === this.page) { return }
    this.$emit('pageChange', val)
  }
}
</script>

<style lang="stylus" scoped>
+block(pagination) {
  +element(page) {
    justify-content flex-end
  }
  +element(select) {
    max-width 80px
    padding-top 3px
  }
}
</style>
