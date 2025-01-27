export const pick = <T>(objectToPick: T, keys: (keyof T)[]) => {
  const pickedData: Partial<T> = {};
  keys.forEach((key) => {
    if (objectToPick[key]) pickedData[key] = objectToPick[key];
  });
  return pickedData;
};
