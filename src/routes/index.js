/* eslint-disable global-require */
export default {
  path: '/',
  children: [
    require('./home').default,
    require('./program').default,
    require('./chaxun').default,
    require('./more').default,
    require('./notFound').default,
  ],
  async action({ next }) {
    const route = await next();

    route.title = route.title || 'Untitled Page';
    route.description = route.description || '';

    return route;
  },
};
