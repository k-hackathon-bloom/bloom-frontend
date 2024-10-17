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
