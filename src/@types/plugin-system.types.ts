/**
 * @Author Alexander Bassov Sat Oct 05 2024
 * @Email blackxes.dev@gmail.com
 */

export interface PluginBase {
  init?: () => boolean;
}

export type PluginFactorySignature = () =>
  | PluginBase
  | (() => Promise<PluginBase>);
export interface PluginConstructionClass {
  new: () => PluginBase;
}
export type PluginConstructor =
  | PluginFactorySignature
  | PluginConstructionClass;

export interface PluginRegistryItem {
  identifier: string;
  /** Either the factory or pluginClass need to be defines. Both omitted is prohibited */
  factory?: PluginFactorySignature;
  /** Either the factory or pluginClass need to be defines. Both omitted is prohibited */
  pluginClass?: PluginConstructor;
  dependencies?: string[];
}

export interface PluginRegistryInterface {
  /**
   * Registers a plugin
   * @param identifier Unique plugin identifier
   * @param constructor Delegate which constructs the plugin
   * @param dependencies List of plugins this plugin depends on (yeah I know right)
   * @returns Boolean on whether the registration was successful
   */
  register: (
    identifier: string,
    constructor: PluginConstructor,
    dependencies: string[]
  ) => boolean;

  /**
   * Overrides a already registered plugin. Fails if plugin which is to be overridden is not registered
   * @param identifier Unique plugin identifier
   * @param constructor Delegate which constructs the plugin
   * @param dependencies List of plugins this plugin depends on
   * @returns Boolean on whether the override was successful
   * @returns False if the plugin is not registerd in the first place
   */
  override: (
    identifier: string,
    constructor: PluginConstructor,
    dependencies: string[]
  ) => boolean;

  /**
   * Deregisters a plugin and kills if you really wanna kill it :(
   * @param identifier
   * @param killInstance
   * @returns Boolean on whether the degistration was successful
   */
  deregister: (identifier: string, killInstance: boolean) => boolean;

  /**
   * Returns the registry entry of a registered plugin
   * @param identifier Unique plugin identifier
   * @returns Plugin registry entry or undefined if not registered
   */
  get: (identifier: string) => PluginRegistryItem | undefined;

  /**
   * Returns whether a plugin with the given identifier is registered
   * @param identifier Unique plugin identifier
   * @returns Well .. if the plugin is registered
   */
  has: (identifier: string) => boolean;

  /**
   * Returns a list of registered plugin identifiers
   * @returns Registered identifier list
   */
  getList: () => string[];
}

export interface PluginManagerInterface extends PluginRegistryInterface {
  /**
   *
   * @param identifier identifier Unique plugin identifier
   * @param killInstance If an instance of the plugin exists should it be destroyed?
   * @returns Boolean on whether the deregistration was successful
   */
  instantiate: <P extends PluginBase>(identifier: string) => P | false;
}
