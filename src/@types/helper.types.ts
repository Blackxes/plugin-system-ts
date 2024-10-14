/**
 * @Author Alexander Bassov Sat Oct 05 2024
 * @Email blackxes.dev@gmail.com
 */

export interface ClassBlueprint<Type> {
  new (): Type;
}

/**
 * Determines whether the given value is an asynchronous value
 *
 * @note Can't check function with arguments
 * @param value Any value to check
 * @returns Boolean on whether the value is an asynchronous function
 */
export const isAsyncFunction = <Return>(
  value: any
): value is () => Promise<Return> =>
  value?.constructor?.name == "AsyncFunction";

/**
 * Determines whether the given value is a class
 *
 * @param value Any value
 * @returns Boolean on whether the value is a class function
 */
export const isClass = <ClassType>(
  value: any
): value is ClassBlueprint<ClassType> =>
  typeof value == "function" && value.toString().includes("class");

export type MultivariateFunction<ReturnType = any> = (
  ...args: any[]
) => ReturnType;
export type MultivariateFunctionAsync<ReturnType = any> = (
  ...args: any[]
) => Promise<ReturnType>;
