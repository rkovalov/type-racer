import { cleanup, render } from '@testing-library/react';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import StoreContext from '../../store/context';
import { User } from '../../types';
import PrivateRoute from './PrivateRoute';

const Component = () => <div>Test Component</div>;

const Preset = ({ currentUser }: { currentUser?: User }) => (
  <MemoryRouter>
    <StoreContext.Provider
      value={[
        {
          currentUser,
          players: [],
        },
        // tslint:disable-next-line
        () => {},
      ]}
    >
      <PrivateRoute component={Component} />
    </StoreContext.Provider>
  </MemoryRouter>
);

describe('Page404', () => {
  afterEach(cleanup);

  it('Render Private Component', () => {
    const { getByText } = render(
      <Preset
        currentUser={{
          id: 'test',
          gender: 'female',
          nickname: 'joy',
          password: '123123',
        }}
      />,
    );
    expect(getByText('Test Component')).toBeInTheDocument();
  });
});
