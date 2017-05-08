import React from 'react';
import ReactDOM from 'react-dom';
import queryString from 'query-string';
import FastClick from 'fastclick';
import createFetch from './createFetch';
import configureStore from './store/configureStore';
import App from './components/App';
import history from './history';
import router from './router';
import { updateMeta } from './DOMUtils';
import { ErrorReporter, deepForceUpdate } from './devUtils';

const context = {
  insertCss: (...styles) => {
    // eslint-disable-next-line no-underscore-dangle
    const removeCss = styles.map(x => x._insertCss());
    return () => { removeCss.forEach(f => f()); };
  },
  fetch: createFetch({
    baseUrl: window.App.apiUrl,
  }),
  store: configureStore(window.App.state, { history }),
  storeSubscription: null,
};

const scrollPositionsHistory = {};
if (window.history && 'scrollRestoration' in window.history) {
  window.history.scrollRestoration = 'manual';
}

let onRenderComplete = function initialRenderComplete() {
  onRenderComplete = function renderComplete(route, location) {
    document.title = route.title;

    updateMeta('description', route.description);
    // Update necessary tags in <head> at runtime here, ie:
    // updateMeta('keywords', route.keywords);
    // updateCustomMeta('og:url', route.canonicalUrl);
    // updateCustomMeta('og:image', route.imageUrl);
    // updateLink('canonical', route.canonicalUrl);
    // etc.

    let scrollX = 0;
    let scrollY = 0;
    const pos = scrollPositionsHistory[location.key];
    if (pos) {
      scrollX = pos.scrollX;
      scrollY = pos.scrollY;
    } else {
      const targetHash = location.hash.substr(1);
      if (targetHash) {
        const target = document.getElementById(targetHash);
        if (target) {
          scrollY = window.pageYOffset + target.getBoundingClientRect().top;
        }
      }
    }

    // Restore the scroll position if it was saved into the state
    // or scroll to the given #hash anchor
    // or scroll to top of the page
    window.scrollTo(scrollX, scrollY);
  };
};

// Make taps on links and buttons work fast on mobiles
FastClick.attach(document.body);

const container = document.getElementById('app');
let appInstance;
let currentLocation = history.location;

// Re-render the app when window.location changes
async function onLocationChange(location, action) {
  // Remember the latest scroll position for the previous location
  scrollPositionsHistory[currentLocation.key] = {
    scrollX: window.pageXOffset,
    scrollY: window.pageYOffset,
  };
  // Delete stored scroll position for next page if any
  if (action === 'PUSH') {
    delete scrollPositionsHistory[location.key];
  }
  currentLocation = location;

  try {
    // Traverses the list of routes in the order they are defined until
    // it finds the first route that matches provided URL path string
    // and whose action method returns anything other than `undefined`.
    const route = await router.resolve({
      ...context,
      path: location.pathname,
      query: queryString.parse(location.search),
    });

    // Prevent multiple page renders during the routing process
    if (currentLocation.key !== location.key) {
      return;
    }

    if (route.redirect) {
      history.replace(route.redirect);
      return;
    }

    appInstance = ReactDOM.render(
      <App context={context}>
        { route.component }
      </App>,
      container,
      () => onRenderComplete(route, location),
    );
  } catch (error) {
    // Display the error in full-screen for development mode
    if (__DEV__) {
      appInstance = null;
      document.title = `Error: ${error.message}`;
      ReactDOM.render(<ErrorReporter error={error} />, container);
      throw error;
    }

    console.error(error);

    // Do a full page reload if error occurs during client-side navigation
    if (action && currentLocation.key === location.key) {
      window.location.reload();
    }
  }
}

history.listen(onLocationChange);
// noinspection JSIgnoredPromiseFromCall
onLocationChange(currentLocation);

// Handle errors that might happen after rendering
// // Display the error in full-screen for development mode
if (__DEV__) {
  window.addEventListener('error', (event) => {
    appInstance = null;
    document.title = `Runtime Error: ${event.error.message}`;
    ReactDOM.render(<ErrorReporter error={event.error} />, container);
  });
}

// Enable Hot Module Replacement (HMR)
if (module.hot) {
  module.hot.accept('./router', () => {
    if (appInstance) {
      try {
        // Force-update the whole tree, including components that refuse to update
        deepForceUpdate(appInstance);
      } catch (error) {
        appInstance = null;
        document.title = `Hot Update Error: ${error.message}`;
        ReactDOM.render(<ErrorReporter error={error} />, container);
        return;
      }
    }

    // noinspection JSIgnoredPromiseFromCall
    onLocationChange(currentLocation);
  });
}

