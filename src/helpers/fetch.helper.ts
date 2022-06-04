export function to<T>(promise: Promise<T>, errInfo?: string | object): Promise<T[] | [any, T]> {
  return promise
    .then((res) => [null, res])
    .catch((err) => {
      if (errInfo) {
        Object.assign(err, errInfo);
      }

      return [err, null];
    });
}
