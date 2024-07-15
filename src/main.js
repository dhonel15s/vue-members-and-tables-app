import { createApp } from "vue";
// Element Plus
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";
// Moment
import moment from "moment";
// Vue
import App from "./App.vue";
import router from "./router.js";
import store from "./store/index.js";
const app = createApp(App);

app.use(ElementPlus);
app.use(router);
app.use(store);
app.use(moment);

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}

router.isReady().then(() => {
  app.mount("#app");
});
