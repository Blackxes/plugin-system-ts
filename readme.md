# Plugin system for javascript/typescript

Don't you hate it when you have so many modules, plugins, packages or however you call them; They all depend on eachother but damn, a neat plugin system with overriding features is to stressful to build yourself?

Well god bless you because you found this sweet little piece of code :D

### Usage

```typescript
import PluginManager from "<wherever-you-have-it-laying-around>";

// Register your plugins and their dependencies
PluginManager.register(PluginA.name, PluginA, [PluginB.name]);
PluginManager.register(PluginB.name, PluginB, [PluginC.name]);
PluginManager.register(PluginC.name, PluginC);

// Override plugins
PluginManager.override(PluginC.name, PluginD);
PluginManager.override(PluginB.name, PluginE, [PluginC.name]);

// Kick off the loader and instantiate/initialize the plugins
PluginManager.init();
```

And if you are really fancy

```typescript
// When initializing you can pass down your own loader .. uhhhh
PluginManager.init(MyVeryOwnFancyPluginLoader);

// Or using the setter ..
PluginManager.setLoader(MyOtherVeryOwnFancyPluginLoader);
// .. and initialize later
PluginManager.init();
```

### Features

- Dependency first loading strategy
- Detects circular dependencies (Nice to be able to handle them, but not yet)
