import { User } from '../types';

import users from '../mock/users';

import { fetchUser } from '../dataProvider';

const sessionStorageKey = 'TypeRacer2019';

const setUserToStorage = ({ password, ...user }: User) => {
  sessionStorage.setItem(sessionStorageKey, JSON.stringify(user));
};

export const getUser = (): User => {
  const user = sessionStorage.getItem(sessionStorageKey);
  return user ? JSON.parse(user) : user;
};

export const signout = (): Promise<undefined> =>
  new Promise(resolve => {
    sessionStorage.removeItem(sessionStorageKey);
    resolve();
  });

export const signin = (
  user: Pick<User, 'nickname' | 'password'>,
): Promise<User | undefined> => {
  const mockUser = users.find(
    ({ nickname, password }) =>
      user.nickname === nickname && user.password === password,
  );
  if (mockUser) {
    return fetchUser(mockUser).then(userDb => {
      if ('nickname' in userDb && userDb.nickname === mockUser.nickname) {
        setUserToStorage(mockUser);
        return userDb;
      }
    });
  }
  return Promise.reject();
};
