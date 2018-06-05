import VWatermark from './VWatermark.vue'
const watermark = {
  install(Vue, options) {
    Vue.component(VWatermark.name, VWatermark)
  }
}
export default watermark
if (typeof window != 'undefined' && window.Vue) {
  window.Vue.component('v-watermark', VWatermark)
}
