/**
 * @Author Alexander Bassov Sun Oct 06 2024
 * @Email blackxes.dev@gmail.com
 */

import { PluginBase } from "../../../core/plugin-base";

export class TestPlugin_ClassA_InitAsync extends PluginBase {
  public async init(ms: number = 1000, resolveValue: boolean = true) {
    return await new Promise<boolean>((resolve) =>
      setTimeout(() => resolve(resolveValue), ms)
    );
  }
}

export class TestPlugin_ClassB_InitAsync extends PluginBase {
  public async init(ms: number = 1000, resolveValue: boolean = true) {
    return await new Promise<boolean>((resolve) =>
      setTimeout(() => resolve(resolveValue), ms)
    );
  }
}

export class TestPlugin_ClassC_InitAsync extends PluginBase {
  public async init(ms: number = 1000, resolveValue: boolean = true) {
    return await new Promise<boolean>((resolve) =>
      setTimeout(() => resolve(resolveValue), ms)
    );
  }
}

export class TestPlugin_ClassD_InitAsync extends PluginBase {
  public async init(ms: number = 1000, resolveValue: boolean = true) {
    return await new Promise<boolean>((resolve) =>
      setTimeout(() => resolve(resolveValue), ms)
    );
  }
}

export class TestPlugin_ClassE_InitAsync extends PluginBase {
  public async init(ms: number = 1000, resolveValue: boolean = true) {
    return await new Promise<boolean>((resolve) =>
      setTimeout(() => resolve(resolveValue), ms)
    );
  }
}
