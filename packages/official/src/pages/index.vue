<template>
  <div class="demo-index">
    nuxt typescript template!<br>
    Name: {{ fullName }}<br>
    Message: {{ message }}<br>
    <v-btn small color="primary">
      Primary
    </v-btn><br>
    <v-icon size="24px">
      {{ mdiQqchat }}
    </v-icon>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { mdiQqchat } from '@mdi/js'

interface User {
  firstName: string;
  lastName: number;
}

@Component
export default class YourComponent extends Vue {
  user: User = {
    firstName: 'jxm',
    lastName: 7
  }

  mdiQqchat = mdiQqchat

  message: string = 'This is a message'

  get fullName (): string {
    return `${this.user.firstName} ${this.user.lastName}`
  }

  created () {
    // console.log('Env dotenv: ', process.env.ENV) // get dotenv vars
  }
}
</script>

<style lang="stylus" scoped>
+block(index)
  font-size 24px
  text-align center
</style>
