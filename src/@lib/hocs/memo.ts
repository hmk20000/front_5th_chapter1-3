/* eslint-disable @typescript-eslint/no-unused-vars */
import { shallowEquals } from '../equalities';
import { ComponentType } from 'react';

export function memo<P extends object>(
  Component: ComponentType<P>,
  _equals = shallowEquals
) {
  return Component;
}
