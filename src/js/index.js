// TODO: 사용자 정의 객체 타입에 대한 확장성 고려 필요
const cloneDeep = (target) => {
  // 객체 타입이 아닌 경우
  if (!target || typeof target !== "object" || target === null) {
    return target;
  }

  if (target instanceof Date) {
    return new Date(target.getTime());
  }

  if (target instanceof RegExp) {
    return new RegExp(target.source, target.flags);
  }

  if (target instanceof Map) {
    return Array.from(target.entries()).reduce((prevMap, [key, value]) => {
      prevMap.set(key, cloneDeep(value));
      return prevMap;
    }, new Map());
  }

  if (target instanceof Set) {
    return Array.from(target).reduce((prevSet, nextSet) => {
      prevSet.add(cloneDeep(nextSet));
      return prevSet;
    }, new Set());
  }

  const initialValue = Array.isArray(target) ? [] : {};

  return Object.keys(target).reduce((acc, key) => {
    acc[key] = cloneDeep(target[key]);
    return acc;
  }, initialValue);
};

export default cloneDeep;
