import mockUsers from '../mock/users';
import * as session from '../store/session';
import { User } from '../types';
import { request } from '../utils';

interface ErrorResponse {
  status: 404 | 500;
  message: string;
}

type UserResponse = ErrorResponse | User;

export const signout = (): Promise<undefined> =>
  new Promise(resolve => {
    session.removeUser();
    resolve();
  });

export const signin = (
  user: Pick<User, 'nickname' | 'password'>,
): Promise<User | undefined> => {
  const mockUser = mockUsers.find(
    ({ nickname, password }) =>
      user.nickname === nickname && user.password === password,
  );
  return new Promise((resolve, reject) => {
    mockUser
      ? fetchUser(mockUser).then(userDb => {
          if ('nickname' in userDb && userDb.nickname === mockUser.nickname) {
            session.setUser(mockUser);
            resolve(userDb);
          } else {
            reject();
          }
        })
      : reject();
  });
};

export const fetchRandomText = (): Promise<string[]> =>
  request
    .get('https://baconipsum.com/api/', {
      params: { type: 'meat-and-filler', paras: 1 },
    })
    .then(({ data }) => data);

export const fetchUser = (user: User): Promise<UserResponse> =>
  request
    .get(`https://api.myjson.com/bins/${user.id}`)
    .then(({ data }) => data);

export const isErrorResponse = (user: UserResponse) => {
  if ('status' in user) {
    return [404, 500].includes(user.status);
  }
  return false;
};

export const updateUser = (user: User) => {
  request.put(`https://api.myjson.com/bins/${user.id}`, {
    data: { ...user },
    headers: {
      'content-type': 'application/json;charset=UTF-8',
    },
  });
};

export const fetchAllUsers = (): Promise<UserResponse[]> =>
  Promise.all(mockUsers.map(fetchUser)).then(([...userResponses]) =>
    userResponses.filter(u => !isErrorResponse(u)),
  );
