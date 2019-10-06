import { cleanup, render } from '@testing-library/react';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import ProfileDropdown from './ProfileDropdown';

describe('ProfileDropdown', () => {
  afterEach(cleanup);

  it('correct render', () => {
    const { getByTestId } = render(
      <MemoryRouter>
        <ProfileDropdown />
      </MemoryRouter>,
    );
    expect(getByTestId('profile-dropdown')).toBeTruthy();
  });
});
