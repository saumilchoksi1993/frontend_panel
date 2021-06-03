import Vue from "vue";
import VueResource from "vue-resource";

import App from "./App.vue";
import vuetify from "@/plugins/components";
import router from "@/router/index";
import store from "@/plugins/store";

Vue.use(VueResource);

new Vue({
  vuetify,
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");