import users from '../mock/users';
import { User } from '../types';
import { request } from '../utils';

interface ErrorResponse {
  status: 404 | 500;
  message: string;
}

type UserResponse = ErrorResponse | User;

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

export const getAllUsers = (): Promise<UserResponse[]> =>
  Promise.all(users.map(fetchUser)).then(([...userResponses]) =>
    userResponses.filter(u => !isErrorResponse(u)),
  );
