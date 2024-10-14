/**
 * @Author Alexander Bassov Sat Oct 05 2024
 * @Email blackxes.dev@gmail.com
 */

import { isAsyncFunction } from "../@types/helper.types";
import {
  PluginBaseInterface,
  PluginLoaderConstructor,
  PluginLoaderInterface,
  PluginManagerInterface,
  PluginRegistryItem,
} from "../@types/plugin-system.types";
import { executeFunction } from "./plugin-helper";
import { RecursivePluginLoader } from "./plugin-loader";
import { PluginRegistryClass } from "./plugin-registry";

class PluginManagerClass
  extends PluginRegistryClass
  implements PluginManagerInterface
{
  private _instantiated: Map<string, PluginBaseInterface> = new Map();
  private _loader: PluginLoaderInterface | null = null;
  private _loaderClass: PluginLoaderConstructor | null = null;

  public constructor() {
    super();
  }

  public async init(loader?: PluginLoaderConstructor) {
    // Custom loader
    if (loader) this._loaderClass = loader;

    if (!this._loaderClass) {
      this._loaderClass = RecursivePluginLoader;
    }

    this._loader = new this._loaderClass();

    // If the count of loaded plugins doesn't match the registered something is missing
    return (
      this.getList.length == (await this._loader.load(this.getList())).length
    );
  }

  public setLoader(loader: PluginLoaderConstructor) {
    this._loaderClass = loader;
  }

  public async initiate<P extends PluginBaseInterface>(
    identifier: string
  ): Promise<P | boolean | null> {
    if (this._instantiated.has(identifier)) {
      return this._instantiated.get(identifier) as P;
    }

    const registryItem = this.get(identifier);

    if (!registryItem) {
      return null;
    }

    // To factory or not to factory
    const result: PluginBaseInterface | boolean =
      await this._resolvePluginInstantiation(registryItem);

    if (typeof result === "boolean") {
      return result;
    }

    if (!result) {
      return false;
    }

    this._instantiated.set(identifier, result);

    return result as P;
  }

  private async _resolvePluginInstantiation<P extends PluginBaseInterface>(
    plugin: PluginRegistryItem
  ): Promise<P | boolean> {
    // If its a factory
    let instance = await executeFunction(plugin.factory);

    // Simple single function plugins are the best plugins
    if (typeof instance == "boolean") {
      return instance;
    }

    // On a class plugin
    if (instance == null) {
      if (!plugin.pluginClass) {
        throw new Error(
          "Tried to instantiate an invalid plugin class. Please define either a factory or a class as a plugin"
        );
      }

      instance = new plugin.pluginClass();
    }

    // From here on `instance` is an plugin instance
    await executeFunction(instance.beforeInit);
    await executeFunction(instance.init);
    await executeFunction(instance.afterInit);

    this._instantiated.set(plugin.identifier, instance);

    return instance as P;
  }

  public async kill(identifier: string) {
    const plugin = this._instantiated.get(identifier);

    if (!plugin) {
      return true;
    }

    if (plugin.shutdown) {
      isAsyncFunction(plugin.shutdown)
        ? await plugin.shutdown()
        : plugin.shutdown();
    }

    return true;
  }

  public getLoadingOrder() {
    return [...this._instantiated.keys()];
  }
}

const PluginManager = new PluginManagerClass();

export default PluginManager;
