import { atom } from 'recoil';
import Quest from '@type/Quest';

export const expAtom = atom({
  key: 'expAtom',
  default: 0,
});

export const questsAtom = atom<Quest[]>({
  key: 'questsAtom',
  default: [],
});

export const messageFormAtom = atom<{ title: string; content: string }>({
  key: 'messageFormAtom',
  default: {
    title: '',
    content: '',
  },
});
