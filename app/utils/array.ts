export function findLast<T, S extends T>(
  predicate: (value: T, index: number, array: T[]) => value is S,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  thisArg?: any,
): S | undefined;

export function findLast<T>(
  callback: (value: T, index: number, array: T[]) => boolean,
  thisArg?: T[],
) {
  if (thisArg == null) {
    throw new TypeError("thisArg is null or not defined");
  }
  const arr = Object(thisArg);
  const len = arr.length >>> 0;
  for (let i = len - 1; i >= 0; i--) {
    if (callback(arr[i], i, arr)) {
      return arr[i];
    }
  }
  return undefined;
}
