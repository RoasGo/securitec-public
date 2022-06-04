import fetch from 'node-fetch';
import { to } from '../../helpers/fetch.helper';

const baseFetch = (url, opts = {}) =>
  fetch(url, opts).then((r) => (r.ok ? Promise.resolve(r) : Promise.reject(r.statusText)));

function fetcher(url, opts = {}) {
  return baseFetch(url, opts).then((r) => r.json());
}

const compose = (...fns) =>
  fns.reduceRight(
    (f, g) =>
      (...args) =>
        g(f(...args))
  );

const fetchTo = compose(to, fetcher);

const delay = (ms: number) => {
  return new Promise<void>((resolve) => {
    setTimeout(() => {
      resolve();
    }, ms);
  });
};

const defaultRetry = {
  retries: 3,
  retryDelay: 1000,
};

export const retryFetch = (url: string, options: {}) => {
  const mergeDefaultRetryOptions = { ...defaultRetry, ...options };
  const { retries, retryDelay, ...opts } = mergeDefaultRetryOptions;

  return new Promise((resolve, reject) => {
    const recursiveFetch = async (retry: number) => {
      const [fetchErr, fecthRes] = await fetchTo(url, opts);
      if (fetchErr) {
        if (retry > 0) {
          await delay(retryDelay);
          recursiveFetch(--retry);
        } else {
          reject(fetchErr);
        }
      } else {
        resolve(fecthRes);
      }
    };

    recursiveFetch(retries);
  });
};
