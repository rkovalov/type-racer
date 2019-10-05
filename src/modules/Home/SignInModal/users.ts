import { User } from '../../../types';

const sessionStorageKey = 'TypeRacer2019';
const users: User[] = [
  {
    gender: 'male',
    nickname: 'rudolf',
    password: '123123',
  },
  {
    gender: 'male',
    nickname: 'bob',
    password: '123123',
  },
  {
    gender: 'female',
    nickname: 'maria',
    password: '123123',
  },
  {
    gender: 'male',
    nickname: 'john',
    password: '123123',
  },
  {
    gender: 'female',
    nickname: 'oxy',
    password: '123123',
  },
];

const setUserToStorage = ({ password, ...user }: User) => {
  sessionStorage.setItem(sessionStorageKey, JSON.stringify(user));
};

export const signout = (): boolean => {
  sessionStorage.removeItem(sessionStorageKey);
  return true;
};

export const signin = (user: Pick<User, 'nickname' | 'password'>): boolean => {
  const userDb = users.find(
    ({ nickname, password }) =>
      user.nickname === nickname && user.password === password,
  );
  if (userDb) {
    setUserToStorage(userDb);
    return true;
  }
  return false;
};
