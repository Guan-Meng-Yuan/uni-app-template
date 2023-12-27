import { defineConfig, presetIcons, presetTypography } from "unocss";
import { presetUni } from "@uni-helper/unocss-preset-uni";

export default defineConfig({
  presets: [
    presetUni(),
    presetIcons({
      scale: 1.2,
      extraProperties: {
        display: "inline-block",
        "vertical-align": "middle",
      },
    }),
    // @ts-ignore
    presetTypography(),
  ],
});
