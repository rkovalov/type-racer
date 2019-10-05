import { request } from '../utils';

export const fetchRandomText = (): Promise<string[]> =>
  request
    .get('https://baconipsum.com/api/', {
      params: { type: 'meat-and-filler', paras: 20 },
    })
    .then(({ data }) => data);
