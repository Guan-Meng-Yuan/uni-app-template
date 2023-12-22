import { defineConfig } from "vite";
import uni from "@dcloudio/vite-plugin-uni";
import UnoCSS from "unocss/vite";
import AutoImport from "unplugin-auto-import/vite";
import Components from "@uni-helper/vite-plugin-uni-components";
import { UniUIResolver } from "@uni-helper/vite-plugin-uni-components/resolvers";
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    Components({
      resolvers: [UniUIResolver()],
    }),
    UnoCSS(),
    AutoImport({
      imports: ["uni-app", "vue"],
    }),
    uni(),
  ],
});
