<template>
  <div>
    <home-banner />
    <home-search />
    <home-game-logo />
    <home-apply-join />
    <home-services />
    <app-footer />
  </div>
</template>

<script lang="ts">
import AppFooter from '../layouts/app-footer.vue'
import HomeBanner from './banner.vue'
import HomeSearch from './search.vue'
import HomeGameLogo from './game-logo.vue'
import HomeApplyJoin from './apply-join.vue'
import HomeServices from './services.vue'
import { Vue, Component } from 'vue-property-decorator'

@Component({
  head: {
    title: '首页'
  },
  components: {
    HomeBanner,
    HomeSearch,
    HomeGameLogo,
    HomeApplyJoin,
    HomeServices,
    AppFooter
  }
})
export default class HomePage extends Vue {}
</script>

<style>

</style>
