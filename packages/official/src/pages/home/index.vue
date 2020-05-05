<template>
  <div>
    <home-banner />
  </div>
</template>

<script>
import { Vue, Component } from 'vue-property-decorator'
import HomeBanner from './banner.vue'

@Component({
  components: {
    HomeBanner
  }
})
export default class HomePage extends Vue {}
</script>

<style>

</style>
