import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store/store";

Vue.config.productionTip = false;

/* Registering global components */
import "./plugins/globalComponents";

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
