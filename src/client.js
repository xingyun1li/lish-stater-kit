import React from 'react';
import ReacDom from 'react-dom';

import App from 'components/App';

ReacDom.render(
  <App/>,
  document.getElementById('app')
);

if (module.hot) {
  module.hot.accept();
}