/* eslint-disable global-require */
export default {
  path: '/',
  children: [
    require('./home').default,
    require('./notFound').default,
  ],
  async action({ next }) {
    const route = await next();

    route.title = route.title || 'Untitled Page';
    route.description = route.description || '';

    return route;
  },
};
