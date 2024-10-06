import { defineConfig } from "vite";

/** @type UserConfig */
const commonConfig = {};

/** @type Partial<UserConfig> */
const devConfig = {};

/** @type Partial<UserConfig> */
const prodConfig = {};

export default defineConfig(({ mode }) =>
  Object.assign(
    {},
    commonConfig,
    mode == "development" ? devConfig : prodConfig
  )
);
