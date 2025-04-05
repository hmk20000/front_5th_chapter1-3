export function shallowEquals<T>(objA: T, objB: T): boolean {
  /**
   * Array인 경우 처리
   */
  if (Array.isArray(objA) && Array.isArray(objB)) {
    for (let i = 0; i < objA.length; i++) {
      if (objA[i] !== objB[i]) {
        return false;
      }
    }
    return true;
  }
  /**
   * Object인 경우 처리
   */
  if (typeof objA === 'object' && typeof objB === 'object') {
    // null인 경우 처리 [ null 도 오브젝트다 ]
    if (objA === null || objB === null) {
      return objA === objB;
    }

    const keysA = Object.keys(objA);

    // 얕은 비교. 1차원 레벨만 비교
    for (let i = 0; i < keysA.length; i++) {
      const key = keysA[i] as keyof T;
      if (objA[key] !== objB[key]) {
        return false;
      }
    }
    return true;
  }

  return objA === objB;
}
