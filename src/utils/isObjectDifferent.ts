export const isObjectDifferent = (obj1: object, obj2: object): boolean => {
  const obj1Keys = Object.keys(obj1);
  const obj2Keys = Object.keys(obj2);

  if (obj1Keys.length !== obj2Keys.length) {
    return true;
  }

  return obj1Keys.some(
    (key) => obj1[key as keyof typeof obj1] !== obj2[key as keyof typeof obj2]
  );
};
