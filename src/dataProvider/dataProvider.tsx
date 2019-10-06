import { request } from '../utils';

export const fetchRandomText = (): Promise<string[]> =>
  request
    .get('https://baconipsum.com/api/', {
      params: { type: 'meat-and-filler', paras: 1 },
    })
    .then(({ data }) => data);
