/**
 * @Author Alexander Bassov Sat Oct 05 2024
 * @Email blackxes.dev@gmail.com
 */

export interface PluginBaseInterface {
  beforeInit?: () => boolean;
  init?: () => boolean;
  shutdown?: () => void;
  afterInit?: () => boolean;
}

export type PluginFactorySignature =
  | (() => PluginBaseInterface)
  | (() => Promise<PluginBaseInterface>);
export interface PluginConstructionClass {
  new (): PluginBaseInterface;
}
export type PluginConstructor =
  | PluginFactorySignature
  | PluginConstructionClass;

export interface PluginRegistryItem {
  identifier: string;
  /** Either the factory or pluginClass need to be defines. Both omitted is prohibited */
  factory?: PluginFactorySignature;
  /** Either the factory or pluginClass need to be defines. Both omitted is prohibited */
  pluginClass?: PluginConstructionClass;
  dependencies?: string[];
}

export interface PluginInstance {
  identifier: string;
  instance?: PluginBaseInterface;
}

export interface PluginRegisterOptions {
  identifier: string;
  constructor: PluginConstructor;
  dependencies: string[];
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
    constructor: PluginConstructionClass,
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
   * Kicks off the plugin loading and their initialization processes
   *
   * @returns Boolean on whether the initialization was successful
   */
  init: () => Promise<boolean>;

  /**
   * Instantiates a plugin
   *
   * @param identifier identifier Unique plugin identifier
   * @returns The created plugin instance
   * @returns False if the plugin was not found
   */
  instantiate: <P extends PluginBaseInterface>(
    identifier: string
  ) => Promise<P | false>;
}

export interface PluginLoaderInterface {
  /**
   * Loads plugins based on a loading strategy
   *
   * @param pluginList The list of plugins which you want to load
   * @returns List of plugins which were successfully loaded and initialized
   */
  load: (pluginList: string[]) => Promise<string[]>;
}

export interface PluginLoaderConstructor {
  new (): PluginLoaderInterface;
}
