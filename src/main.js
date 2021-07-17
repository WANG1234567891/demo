import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/zh-CN' // lang i18n
import VCharts from 'v-charts'
import VueQuillEditor from 'vue-quill-editor'
// import cases from './components/waitCase/cases.vue'
import '@/styles/index.scss' // global css

import App from './App'
import router from './router'
import store from './store'

import '@/icons' // icon
import JsonExcel from 'vue-json-excel'
import "viewerjs/dist/viewer.css";
import Viewer from "v-viewer";

import '@/permission' // permission control

import echarts from 'echarts'
Vue.prototype.$echarts = echarts
Vue.use(Viewer);
// Vue.component('cases', cases)
Vue.component('downloadExcel', JsonExcel)
Vue.use(ElementUI, { locale })
Vue.use(VCharts)
Vue.use(VueQuillEditor)
Vue.config.productionTip = false

new Vue({
    el: '#app',
    router,
    store,
    template: '<App/>',
    components: { App }
})