import Vue from "vue";
import App from "./App";
import VueFirestore from "vue-firestore";
import router from "./router";

// turns off the 'You are running Vue in development mode.' msg
Vue.config.productionTip = false;

Vue.use(VueFirestore);

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
