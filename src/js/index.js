const cloneDeep = (target) => {
  // 객체 타입이 아닌 경우
  if (!target || typeof target !== "object") {
    // primitive types: string, number, bigint, boolean, symbol, null and undefined.
    return target;
  }

  if (target instanceof Date) {
    return new Date(target.getTime());
  }

  if (target instanceof RegExp) {
    return new RegExp(target.source, target.flags);
  }

  if (target instanceof Map) {
    // 새로운 Map 객체를 생성하여 반환
    // Map.prototype.entries() 메서드는 Map 객체에 있는 각 요소에 대해 키-값 쌍을 가지는 새로운 Iterator 객체를 반환합니다.
    // Array.from() 메서드는 유사 배열 객체나 반복 가능한 객체를 얕게 복사해 새로운 Array 객체를 만듭니다.
    return Array.from(target.entries()).reduce((prevMap, [key, value]) => {
      prevMap.set(key, cloneDeep(value));
      console.log({ prevMap });
      return prevMap;
    }, new Map());
  }

  if (target instanceof Set) {
    // 새로운 Set 객체를 생성하여 반환
    // Set.prototype.entries() 메서드는 Set 객체에 있는 각 요소에 대해 요소 자체를 가지는 새로운 Iterator 객체를 반환합니다.
    // Array.from() 메서드는 유사 배열 객체나 반복 가능한 객체를 얕게 복사해 새로운 Array 객체를 만듭니다.
    console.log(target.entries());
    return Array.from(target.entries()).reduce((prevSet, [key, _]) => {
      prevSet.add(cloneDeep(key));
      return prevSet;
    }, new Set());
  }

  // 객체 타입인 경우
  const initialValue = Array.isArray(target) ? [] : {};

  return Object.keys(target).reduce((acc, key) => {
    acc[key] = cloneDeep(target[key]);
    return acc;
  }, initialValue);
};

export default cloneDeep;
