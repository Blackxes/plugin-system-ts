/**
 * @Author Alexander Bassov Sun Oct 06 2024
 * @Email blackxes.dev@gmail.com
 */

import { PluginLoaderInterface } from "../@types/plugin-system.types";
import PluginManager from "./plugin-manager";

export class RecursivePluginLoader implements PluginLoaderInterface {
  /**
   * Tracks which plugins currently wait for dependencies
   */
  private _pendingPlugins = new Map<string, boolean>();

  /**
   * Tracks which plugins were loaded
   * This is necessary since {@link _pendingPlugins} doesn't know
   * if its loaded but only if its waiting for dependencies or not
   */
  private _loadedPlugins: string[] = [];

  /**
   * Recursively loads plugins and their dependencies
   * Loads dependencies first and goes backwards level by level
   *
   * @param pluginList List of plugins to load
   * @throw Error exception if a plugin is not registered
   * @throw Error exception if a circular dependency is detected
   */
  private async _load(pluginList: string[], parent: string | null) {
    for (const identifier of pluginList) {
      const registryItem = PluginManager.get(identifier);

      if (!registryItem) {
        throw new Error(
          `Plugin "${identifier}" was not found. Spellingmistake or not registered maybe?`
        );
      }

      this._pendingPlugins.set(identifier, true);

      if (this._pendingPlugins.has(identifier)) {
        throw new Error(
          `Detected a circular dependency in plugin "${identifier}" with "${parent}"`
        );
      }

      // Dependencies and the plugin in question itself.. voila
      registryItem.dependencies &&
        (await this._load(registryItem.dependencies, identifier));

      if ((await PluginManager.instantiate(identifier)) === false) {
        throw new Error(`Couldn't instantiate plugin "${identifier}"`);
      }

      this._pendingPlugins.set(identifier, false);
    }

    return true;
  }

  public async load(pluginList: string[]) {
    this._pendingPlugins.clear();
    this._loadedPlugins = [];

    await this._load(pluginList, null);

    return this._loadedPlugins;
  }
}
