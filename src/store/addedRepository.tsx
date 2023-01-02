import { atom } from 'recoil';
import { setRepository } from 'store/setRepository';

export const addedRepository = atom<string[]>({
  key: 'addedRepository',
  default: [],
  effects: [setRepository('addedRepository')],
});
