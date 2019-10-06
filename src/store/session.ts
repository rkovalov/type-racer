import { User } from '../types';

const sessionStorageKey = 'TypeRacer2019';

export const setUser = ({ password, ...user }: User) => {
  sessionStorage.setItem(sessionStorageKey, JSON.stringify(user));
};

export const removeUser = () => sessionStorage.removeItem(sessionStorageKey);

export const getUser = (): User => {
  const user = sessionStorage.getItem(sessionStorageKey);
  return user ? JSON.parse(user) : user;
};
