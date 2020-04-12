import Vue from 'vue'
import { formatDate, parseISODate } from '~/filters'

Vue.filter('formatDate', formatDate)
Vue.filter('parseISO', parseISODate)
