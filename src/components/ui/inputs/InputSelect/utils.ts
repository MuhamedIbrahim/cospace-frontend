export const resolveObjectKey = (obj: any, path: string) => {
  const splittedPath: any = path.split(".");
  var current = obj;
  while (splittedPath.length) {
    if (typeof current !== "object") return undefined;
    current = current[splittedPath.shift()];
  }
  return current;
};
