/**
 * @Author Alexander Bassov Sat Oct 13 2024
 * @Email blackxes.dev@gmail.com
 */

import {
  isAsyncFunction,
  MultivariateFunction,
  MultivariateFunctionAsync,
} from "../@types/helper.types";

export const executeFunction = async <
  ReturnType = any,
  ThisType extends object = object
>(
  callback:
    | MultivariateFunction<ReturnType>
    | MultivariateFunctionAsync<ReturnType>
    | undefined,
  _this?: ThisType,
  ...args: any[]
) => {
  if (callback === undefined) {
    return;
  }

  if (typeof callback != "function") {
    throw new Error("Expected ");
  }

  return isAsyncFunction(callback)
    ? await callback.apply(_this, args)
    : callback.apply(_this, args);
};
