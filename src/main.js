import duTable from "./components/Table/Main.vue";

// import vueCustomElement from "vue-custom-element";

// Vue.use(vueCustomElement);
// Vue.config.ignoredElements = [/du-*/];
// Vue.customElement("du-table", duTable);

// Install the components
export function install(Vue) {
  //Vue.use(Buefy)
  Vue.component("du-table", duTable);
  /* -- Add more components here -- */
}

// Expose the components
export {
  //Buefy,
  duTable
  /* -- Add more components here -- */
};

/* -- Plugin definition & Auto-install -- */
/* You shouldn't have to modify the code below */

// Plugin
const plugin = {
  /* eslint-disable no-undef */
  version: "1.0.0",
  install
};

export default plugin;

// Auto-install
let GlobalVue = null;
if (typeof window !== "undefined") {
  GlobalVue = window.Vue;
} else if (typeof global !== "undefined") {
  GlobalVue = global.Vue;
}
if (GlobalVue) {
  GlobalVue.use(plugin);
}
