import qs from 'qs';

interface RequestParams {
  data?: object;
  params?: object;
  headers?: any;
}

interface RequestConfig extends RequestParams {
  method?: RequestMethod;
}

type RequestFn = (
  url: string,
  config?: RequestParams | undefined,
) => Promise<Response>;

type RequestMethod =
  | 'delete'
  | 'get'
  | 'head'
  | 'post'
  | 'put'
  | 'patch'
  | 'options';

type RequestClient = { [method in RequestMethod]: RequestFn };

interface Response {
  error?: string;
  data?: any;
  statusCode: number;
}

const buildURL = (url: string, params?: object): string => {
  return url + qs.stringify(params, { addQueryPrefix: true });
};

const defaultHeaders = {
  // 'Access-Control-Allow-Origin': '*',
  // 'Content-type': 'application/json;charset=UTF-8',
};

const createXhr: RequestFn = (
  url: string,
  config: RequestConfig | undefined = {},
) =>
  new Promise((resolve, reject) => {
    const request = new XMLHttpRequest();
    request.open(
      (config.method ? config.method : 'get').toUpperCase(),
      buildURL(url, config.params),
      true,
    );

    const headers = { ...defaultHeaders, ...config.headers };
    Object.keys(headers).forEach(key => {
      request.setRequestHeader(key, headers[key]);
    });

    request.onreadystatechange = () => {
      if (request.readyState === XMLHttpRequest.DONE) {
        if (request.status >= 200 && request.status < 400) {
          try {
            resolve({
              data: request.responseText
                ? JSON.parse(request.responseText)
                : undefined,
              statusCode: request.status,
            });
          } catch (error) {
            reject({ error, statusCode: request.status });
          }
        } else if (request.status) {
          try {
            reject({
              error: JSON.parse(request.responseText),
              statusCode: request.status,
            });
          } catch (error) {
            reject({ error, statusCode: request.status });
          }
        } else {
          reject({
            error: 'An error occurred while sending the request.',
            statusCode: request.status,
          });
        }
      }
    };
    request.onerror = function handleError() {
      // Real errors are hidden from us by the browser
      // onerror should only fire if it's a network error
      reject({ error: 'Network error', statusCode: request.status });
    };
    request.send(JSON.stringify(config.data));
  });

const createRequest = (
  defaultConfig: RequestConfig | undefined = {},
): RequestClient => {
  const methods = [
    'delete',
    'get',
    'head',
    'options',
    'post',
    'put',
    'patch',
  ] as RequestMethod[];
  return methods.reduce<RequestClient>(
    (acc, method: RequestMethod) => {
      acc[method] = (url: string, config: RequestParams | undefined = {}) =>
        createXhr(url, {
          ...defaultConfig,
          ...config,
          method,
        } as RequestConfig);
      return acc;
    },
    {} as RequestClient,
  );
};

export default createRequest();
