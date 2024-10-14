/**
 * @Author Alexander Bassov Sun Oct 06 2024
 * @Email blackxes.dev@gmail.com
 */

import { expect, test } from "vitest";
import PluginManager from "../../core/plugin-manager";
import {
  PluginA,
  PluginB,
  PluginC,
  PluginD,
  PluginE,
  PluginF,
  PluginG,
} from "./plugins";

test("Test plugin loading using the recursive dependency prioritzed strategy", async () => {
  PluginManager.register(PluginA.name, PluginA, [PluginB.name]);
  PluginManager.register(PluginB.name, PluginB, [PluginD.name, PluginE.name]);
  PluginManager.register(PluginC.name, PluginC, [
    PluginD.name,
    PluginF.name,
    PluginG.name,
  ]);
  PluginManager.register(PluginD.name, PluginD, [PluginE.name]);
  PluginManager.register(PluginE.name, PluginE);
  PluginManager.register(PluginF.name, PluginF, [PluginE.name]);
  PluginManager.register(PluginG.name, PluginG);

  expect(await PluginManager.init()).toBe(true);

  expect(PluginManager.getLoadingOrder()).toStrictEqual([
    PluginE.name,
    PluginD.name,
    PluginB.name,
    PluginA.name,
    PluginF.name,
    PluginG.name,
    PluginC.name,
  ]);

  return true;
});
