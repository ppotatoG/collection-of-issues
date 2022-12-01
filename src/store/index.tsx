import { atom } from 'recoil';

export const searchText = atom<string>({
    key: 'searchText',
    default: ''
});