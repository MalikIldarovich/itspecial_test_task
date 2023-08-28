import { pinia } from "@/store";
import { createApp } from "vue";
import "./assets/css/style.scss";
import App from "./App.vue";
import router from "./router";

const app = createApp(App);
app.use(router);
app.use(pinia);
app.mount("#app");
