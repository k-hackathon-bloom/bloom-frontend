import { atom } from 'recoil';

export const userDataAtom = atom({
  key: 'userDataAtom',
  default: {
    nickname: '',
    age: '',
    gender: '',
    isSurvey: false,
  },
});

export const expAtom = atom({
  key: 'expAtom',
  default: 0,
});

export const questsAtom = atom({
  key: 'questsAtom',
  default: [],
});
