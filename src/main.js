import Vue from "vue";
import App from "./App";
import VueFirestore from "vue-firestore";
import router from "./router";
import VueAnalytics from "vue-analytics";

// turns off the 'You are running Vue in development mode.' msg
Vue.config.productionTip = false;

const isProd = process.env.NODE_ENV === "production";
Vue.use(VueAnalytics, {
  id: "UA-28336737-2",
  router,
  set: [{ field: "test_name", value: "data3" }],
  debug: {
    enabled: !isProd,
    sendHitTask: isProd
  }
});

Vue.use(VueFirestore);

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
