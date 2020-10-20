import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
Vue.use(ElementUI);
import io from "socket.io-client";
// Vue.prototype.$socket = io.connect("http://60.205.200.110:7005");
// Vue.prototype.$socket = io.connect("https://60.205.200.110:7004");
// Vue.prototype.$socket = io.connect("https://192.168.0.188:7004");
Vue.config.productionTip = false;

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount("#app");
