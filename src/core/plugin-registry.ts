/**
 * @Author Alexander Bassov Sat Oct 05 2024
 * @Email blackxes.dev@gmail.com
 */

import {
  PluginConstructor,
  PluginRegistryInterface,
  PluginRegistryItem,
} from "../@types/plugin-system.types";

class PluginRegistryClass implements PluginRegistryInterface {
  private _registered: Map<string, PluginRegistryItem>;

  constructor() {
    this._registered = new Map();
  }

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

  public get(identifier: string) {
    return this._registered.get(identifier);
  }

  public has(identifier: string) {
    return this._registered.has(identifier);
  }

  public getList() {
    return [...this._registered.keys()];
  }
}

const PluginRegistry = new PluginRegistryClass();

export default PluginRegistry;
