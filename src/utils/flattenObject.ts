export const flattenObject = (obj: object, parentKey = ''): object => {
  return Object.keys(obj).reduce((acc, key) => {
    const value = obj[key as keyof typeof obj];
    const newKey = parentKey ? `${parentKey}.${key}` : key;

    if (isObject(value)) {
      return { ...acc, ...flattenObject(value, newKey) };
    }

    return { ...acc, [newKey]: value };
  }, {});
};

const isObject = (value: any): boolean => {
  return value !== null && typeof value === 'object';
};
