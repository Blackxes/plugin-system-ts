/**
 * @Author Alexander Bassov Sun Oct 06 2024
 * @Email blackxes.dev@gmail.com
 */

import { PluginFactorySignature } from "../../../@types/plugin-system.types";
import { PluginBase } from "../../../core/plugin-base";

export class TestPlugin_ClassA_InitSync extends PluginBase {
  public init(returnValue: boolean = true) {
    console.log("%cTestPlugin_ClassA_InitSync initialized", "color: grey");
    return returnValue;
  }
}

export class TestPlugin_ClassB_InitSync extends PluginBase {
  public init(returnValue: boolean = true) {
    console.log("%TestPlugin_ClassB_InitSync initialized", "color: grey");
    return returnValue;
  }
}

export class TestPlugin_ClassC_InitSync extends PluginBase {
  public init(returnValue: boolean = true) {
    console.log("%TestPlugin_ClassC_InitSync initialized", "color: grey");
    return returnValue;
  }
}

export class TestPlugin_ClassD_InitSync extends PluginBase {
  public init(returnValue: boolean = true) {
    console.log("%TestPlugin_ClassD_InitSync initialized", "color: grey");
    return returnValue;
  }
}

export class TestPlugin_ClassE_InitSync extends PluginBase {
  public init(returnValue: boolean = true) {
    console.log("%TestPlugin_ClassE_InitSync initialized", "color: grey");
    return returnValue;
  }
}

export class TestPlugin_ClassF_InitSync extends PluginBase {
  public init(returnValue: boolean = true) {
    console.log("%TestPlugin_ClassF_InitSync initialized", "color: grey");
    return returnValue;
  }
}

export class TestPlugin_ClassG_InitSync extends PluginBase {
  public init(returnValue: boolean = true) {
    console.log("%TestPlugin_ClassG_InitSync initialized", "color: grey");
    return returnValue;
  }
}

export const TestPlugin_Factory_Sync: PluginFactorySignature = (
  returnValue: boolean
) => {
  return returnValue;
};

export const TestPlugin_Factory_Async: PluginFactorySignature = async (
  ms: number,
  returnValue: boolean
) => {
  return new Promise<boolean>((resolve) =>
    setTimeout(() => resolve(returnValue), ms)
  );
};
