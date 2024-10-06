/**
 * @Author Alexander Bassov Sun Oct 06 2024
 * @Email blackxes.dev@gmail.com
 */

import { PluginFactorySignature } from "../../@types/plugin-system.types";
import { PluginBase } from "../../core/plugin-base";

export class PluginA extends PluginBase {
  init() {
    console.log("PluginA initialized");
    return true;
  }
}

export class PluginB extends PluginBase {
  init() {
    console.log("PluginB initialized");
    return true;
  }
}

export const PluginC: PluginFactorySignature = () => {
  console.log("PluginC initialized");
  return {};
};

export const PluginD: PluginFactorySignature = async () => {
  await new Promise((resolve) => setTimeout(resolve, 3500));

  console.log("PluginD initialized");

  return {};
};

export class PluginE extends PluginBase {
  init() {
    console.log("PluginE initialized");
    return true;
  }
}

export class PluginF extends PluginBase {
  init() {
    console.log("PluginF initialized");
    return true;
  }
}

export class PluginG extends PluginBase {
  init() {
    console.log("PluginG initialized");
    return true;
  }
}
