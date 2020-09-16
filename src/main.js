import Vue from "vue"
import vueCustomElement from 'vue-custom-element'
import TagDemo from './components/Demo/Main.vue'

Vue.use(vueCustomElement);
Vue.customElement('tag-demo', TagDemo, {});

/*
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
*/
