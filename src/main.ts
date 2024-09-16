import { App, createApp } from "vue";
import MyApp from "./App.vue";
import router from "./router";

import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";
import "./style.css";

let app: App;

app = createApp(MyApp).use(router).use(Toast);
app.mount("#app");
