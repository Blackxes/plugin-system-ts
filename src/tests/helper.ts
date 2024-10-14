/**
 * @Author Alexander Bassov Sun Oct 06 2024
 * @Email blackxes.dev@gmail.com
 */

function Log(message: string) {
  return function (target: any) {
    console.log(`[${target?.name}] ${message}`);
  };
}

export { Log };
