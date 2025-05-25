import { atom } from 'recoil';

export const expAtom = atom({
  key: 'expAtom',
  default: 0,
});

export const messageFormAtom = atom<{ title: string; content: string }>({
  key: 'messageFormAtom',
  default: {
    title: '',
    content: '',
  },
});
