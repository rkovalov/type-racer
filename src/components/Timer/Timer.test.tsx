import { cleanup, render } from '@testing-library/react';
import React from 'react';
import { delay } from '../../utils';
import Timer from './Timer';

describe('Timer', () => {
  afterEach(cleanup);

  it('correct render', () => {
    const { getByTestId } = render(<Timer seconds={2} />);
    expect(getByTestId('timer')).toBeTruthy();
  });

  it('invoke onEnd prop', async () => {
    const onEnd = jest.fn();
    render(<Timer seconds={1} onEnd={onEnd} />);
    await delay(2000);
    expect(onEnd).toBeCalledTimes(1);
  });
});
