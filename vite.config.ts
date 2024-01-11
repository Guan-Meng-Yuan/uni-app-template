import { defineConfig, loadEnv } from "vite";
import uni from "@dcloudio/vite-plugin-uni";
import Components, { kebabCase } from "@uni-helper/vite-plugin-uni-components";
import { UniUIResolver } from "@uni-helper/vite-plugin-uni-components/resolvers";
import UnoCss from "unocss/vite";
import AutoImport from "unplugin-auto-import/vite";
// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, "");
  return {
    plugins: [
      UnoCss(),
      Components({
        resolvers: [UniUIResolver()],
      }),
      AutoImport({
        dts: true,
        imports: ["vue", "uni-app"],
      }),
      uni(),
    ],
    server: {
      proxy: {
        [env.VITE_H5_BASE_URL]: {
          target: env.VITE_DOMAIN,
          changeOrigin: true,
          rewrite: (path) =>
            path.replace(new RegExp(`^${env.VITE_H5_BASE_URL}`), ""),
        },
      },
    },
  };
});
