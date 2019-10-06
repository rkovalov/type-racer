export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

export interface User {
  id: string;
  nickname: string;
  password: string;
  gender: 'female' | 'male';
  bestWpm?: number;
}
