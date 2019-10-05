export interface User {
  nickname: string;
  password: string;
  gender: 'female' | 'male';
}

export interface Player {
  nickname: string;
  wpm: number;
}
