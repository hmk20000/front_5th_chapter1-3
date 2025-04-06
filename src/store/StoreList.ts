import { create } from './createStore';
import { Item } from '../type/types';

export const themeStore = create<'light' | 'dark'>('light');

// export const itemStore = create<Item[]>([]);
