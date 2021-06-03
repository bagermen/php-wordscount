import { createApp } from "vue";
import router from "./router";
import App from './App.vue';

import store from "./store";

import "@/assets/bootstrap.scss"
import "bootstrap"

createApp(App).use(store).use(router).mount("#app");
// console.log(process.env.API_URL)