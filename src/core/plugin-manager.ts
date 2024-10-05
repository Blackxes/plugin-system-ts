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
import PluginRegistry from "./plugin-registry";

class PluginManagerClass
  extends PluginRegistry
  implements PluginManagerInterface
{
  private _instantiated: Map<string, PluginBaseInterface> = new Map();

  private _loaderConstructor: PluginLoaderConstructor = RecursivePluginLoader;
  private _loader: PluginLoaderInterface | null = null;

  public constructor() {
    super();
  }

  public async init() {
    if (!this._loader) {
      this._loader = new this._loaderConstructor();
    }

    // If the count of loaded plugins doesn't match the registered something is missing
    return (
      this.getList.length == (await this._loader.load(this.getList())).length
    );
  }

  public setLoader(loader: PluginLoaderConstructor) {
    this._loaderConstructor = loader;
  }

  public async instantiate<P extends PluginBaseInterface>(
    identifier: string
  ): Promise<P | false> {
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

    if (instance === null) {
      return false;
    }

    this._instantiated.set(identifier, instance);

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
}

const PluginManager = new PluginManagerClass();

export default PluginManager;
