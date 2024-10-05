/**
 * @Author Alexander Bassov Sat Oct 05 2024
 * @Email blackxes.dev@gmail.com
 */

import {
  PluginBase,
  PluginConstructor,
  PluginManagerInterface,
} from "../@types/plugin-system.types";

class PluginManagerClass implements PluginManagerInterface {
  private _instantiated: Map<string, PluginBase> = new Map();

  public register(
    identifier: string,
    constructor: PluginConstructor,
    dependencies: string[]
  ) {
    return true;
  }

  public override(
    identifier: string,
    constructor: PluginConstructor,
    dependencies: string[]
  ) {
    return true;
  }

  public deregister(identifier: string, killInstance: boolean) {
    return true;
  }

  public instantiate<P extends PluginBase>(identifier: string): P | false {
    return false;
  }

  public get(identifier: string) {
    return undefined;
  }

  public has(identifier: string) {
    return true;
  }

  public getList() {
    return [];
  }
}
