import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./registerServiceWorker";
import Axios from "axios";
import iView from "iview";
import "iview/dist/styles/iview.css";

Vue.config.productionTip = false;

Vue.prototype.$axios = Axios;

Vue.use(iView);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
