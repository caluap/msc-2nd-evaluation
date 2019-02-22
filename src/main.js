import Vue from "vue";
import App from "./App";
import VueFirestore from "vue-firestore";

// turns off the 'You are running Vue in development mode.' msg
Vue.config.productionTip = false;

Vue.use(VueFirestore);

new Vue({
  render: h => h(App)
}).$mount("#app");
