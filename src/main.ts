import { createSSRApp } from "vue";
import App from "./App.vue";
import "virtual:uno.css";
import "./uni.scss";
export function createApp() {
  const app = createSSRApp(App);
  return {
    app,
  };
}
