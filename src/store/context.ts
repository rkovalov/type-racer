import React from 'react';

import { User } from '../types';

export interface State {
  currentUser: User | undefined;
  players: User[];
}

export type Context = [State, React.Dispatch<React.SetStateAction<State>>];

export const getInitialState = (): State => ({
  currentUser: undefined,
  players: [],
});

export default React.createContext<Context>([
  getInitialState(),
  // tslint:disable-next-line
  () => {},
]);
