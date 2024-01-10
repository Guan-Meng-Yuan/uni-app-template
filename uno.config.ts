import { defineConfig, presetIcons, presetTypography } from "unocss";
import { presetUni } from "@uni-helper/unocss-preset-uni";

export default defineConfig({
  presets: [
    presetIcons({
      extraProperties: {
        display: "inline-block",
        "vertical-align": "middle",
      },
    }),
    presetUni(),
    //@ts-ignore
    presetTypography(),
  ],
});
