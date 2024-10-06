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
} from "../@types/plugin-system.types";
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

  public async instantiate<P extends PluginBaseInterface>(
    identifier: string
  ): Promise<P | false> {
    if (this._instantiated.has(identifier)) {
      return this._instantiated.get(identifier) as P;
    }

    const plugin = this.get(identifier);

    if (!plugin) {
      return false;
    }

    const instance: PluginBaseInterface | null = plugin.factory
      ? isAsyncFunction<PluginBaseInterface>(plugin.factory)
        ? await plugin.factory()
        : plugin.factory()
      : plugin.pluginClass
      ? new plugin.pluginClass()
      : null;

    if (instance == null) {
      return false;
    }

    this._instantiated.set(identifier, instance);

    instance.init &&
      (isAsyncFunction(instance.init)
        ? await instance.init()
        : instance.init());

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
