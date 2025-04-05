import { shallowEquals } from './shallowEquals';

export function deepEquals<T>(objA: T, objB: T): boolean {
  // 기본 타입 비교는 shallowEquals 사용 [ 기본 타입은 얕은 비교 ]
  if (typeof objA !== 'object' || typeof objB !== 'object') {
    return shallowEquals(objA, objB);
  }

  // null 체크 [ null 도 오브젝트다 ]
  if (objA === null || objB === null) {
    return objA === objB;
  }

  // 배열 처리 [ 배열도 오브젝트다 ]
  if (Array.isArray(objA) && Array.isArray(objB)) {
    return (
      objA.length === objB.length &&
      objA.every((item, index) => deepEquals(item, objB[index]))
    );
  }

  // 일반 객체 처리
  return Object.keys(objA as object).every(
    (key) =>
      Object.prototype.hasOwnProperty.call(objB, key) &&
      deepEquals((objA as any)[key], (objB as any)[key])
  );
}
