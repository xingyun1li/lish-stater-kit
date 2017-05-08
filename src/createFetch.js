import fetch from 'isomorphic-fetch';
//
// type Options = {
//   baseUrl: string,
//   cookie?: string,
// };

function createFetch({ baseUrl, cookie } /* : Options */) {
  // NOTE: Tweak the default options to suite your application needs
  const defaults = {
    // method: 'POST', // handy with GraphQL backends
    method: 'GET',
    mode: baseUrl ? 'cors' : 'same-origin',
    credentials: baseUrl ? 'include' : 'same-origin',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      ...(cookie ? { Cookie: cookie } : null),
    },
  };

  return (url, options) => ((url.startsWith('/graphql') || url.startsWith('/api')) ?
    fetch(`${baseUrl}${url}`, {
      ...defaults,
      ...options,
      headers: {
        ...defaults.headers,
        ...(options && options.headers),
      },
    }) : fetch(url, options));
}

export default createFetch;
