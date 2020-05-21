import Vue from 'vue'
import { formatDate, maskString } from '~/filters'

Vue.filter('formatDate', formatDate)
Vue.filter('maskString', maskString)
