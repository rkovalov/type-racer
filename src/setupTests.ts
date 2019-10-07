import '@testing-library/jest-dom/extend-expect';

// this is just a little hack to silence a warning that we'll get until we
// upgrade to 16.9: https://github.com/facebook/react/pull/14853
// tslint:disable-next-line
const originalError = console.error;
beforeAll(() => {
  // tslint:disable-next-line
  console.error = (...args: any) => {
    if (/Warning.*not wrapped in act/.test(args[0])) {
      return;
    }
    originalError.call(console, ...args);
  };
});

afterAll(() => {
  // tslint:disable-next-line
  console.error = originalError;
});
