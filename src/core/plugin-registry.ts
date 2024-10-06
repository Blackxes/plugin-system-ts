/**
 * @Author Alexander Bassov Sat Oct 05 2024
 * @Email blackxes.dev@gmail.com
 */

import { isClass } from "../@types/helper.types";
import {
  PluginConstructionClass,
  PluginConstructor,
  PluginRegistryInterface,
  PluginRegistryItem,
} from "../@types/plugin-system.types";
import { PluginBase } from "./plugin-base";
import PluginManager from "./plugin-manager";

export class PluginRegistryClass implements PluginRegistryInterface {
  private _registry: Map<string, PluginRegistryItem>;

  constructor() {
    this._registry = new Map();
  }

  public register(
    identifier: string,
    constructor: PluginConstructor,
    dependencies: string[] = []
  ) {
    if (this._registry.has(identifier)) {
      return false;
    }

    const registryItem: PluginRegistryItem = {
      identifier,
      dependencies,
    };

    if (
      isClass(constructor) &&
      !(constructor.prototype instanceof PluginBase)
    ) {
      throw new Error("Plugin constructor class must inherit from PluginBase");
    }

    registryItem.identifier;

    this._registry.set(identifier, {
      identifier,
      factory: isClass(constructor) ? undefined : constructor,
      pluginClass: isClass(constructor) ? constructor : undefined,
      dependencies,
    });

    return true;
  }

  public override(
    identifier: string,
    constructor: PluginConstructionClass,
    dependencies: string[] = []
  ) {
    const plugin = this.get(identifier);

    if (!plugin) {
      throw new Error(`Couldn't override plugin "${identifier}" not found`);
    }

    class newOverridenPlugin extends constructor {}

    newOverridenPlugin.prototype = Object.assign(
      newOverridenPlugin,
      newOverridenPlugin.prototype
    );
    newOverridenPlugin.prototype.constructor = newOverridenPlugin;

    this._registry.set(identifier, {
      identifier,
      dependencies,
      pluginClass: newOverridenPlugin,
    });

    return true;
  }

  public deregister(identifier: string, killInstance: boolean) {
    const success = this._registry.delete(identifier);

    if (killInstance && success) {
      PluginManager.kill(identifier);
    }

    return true;
  }

  public get(identifier: string) {
    return this._registry.get(identifier);
  }

  public has(identifier: string) {
    return this._registry.has(identifier);
  }

  public getList() {
    return [...this._registry.keys()];
  }
}
