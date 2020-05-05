<template>
  <app-container class="jhkz-home-game-logo">
    <v-row>
      <v-col v-for="(item, index) in 6" :key="index" :cols="4">
        <v-card hover>
          <div class="jhkz-home-game-logo__logo" :class="`jhkz-home-game-logo__logo_${item}`" />
        </v-card>
      </v-col>
    </v-row>
  </app-container>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

@Component({
  name: 'home-game-logo'
})
export default class HomeGameLogoComp extends Vue {}
</script>

<style lang="stylus" scoped>
$logo1 := '../../assets/images/game-1.png'
$logo2 := '../../assets/images/game-2.png'
$logo3 := '../../assets/images/game-3.png'
$logo4 := '../../assets/images/game-4.png'
$logo5 := '../../assets/images/game-5.png'
$logo6 := '../../assets/images/game-6.png'

+block(home-game-logo)
  +element(logo)
    height 190px
    +modifier(1)
      background url($logo1) no-repeat center
      background-size cover
    +modifier(2)
      background url($logo2) no-repeat center
      background-size cover
    +modifier(3)
      background url($logo3) no-repeat center
      background-size cover
    +modifier(4)
      background url($logo4) no-repeat center
      background-size cover
    +modifier(5)
      background url($logo5) no-repeat center
      background-size cover
    +modifier(6)
      background url($logo6) no-repeat center
      background-size cover
</style>
