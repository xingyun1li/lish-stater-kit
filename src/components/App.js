import React from 'react';
import PropTypes from 'prop-types';
import { StylesProvider } from '@material-ui/styles';
import { Provider as ReduxProvider } from 'react-redux';

const ContextType = {
  // Enables critical path CSS rendering
  // https://github.com/kriasoft/isomorphic-style-loader
  insertCss: PropTypes.func.isRequired,
  // Universal HTTP client
  fetch: PropTypes.func.isRequired,
  // Integrate Redux
  // http://redux.js.org/docs/basics/UsageWithReact.html
  ...ReduxProvider.childContextTypes,
};

class App extends React.PureComponent {

  static propTypes = {
    context: PropTypes.shape(ContextType).isRequired,
    children: PropTypes.element.isRequired,
  };

  static childContextTypes = ContextType;

  getChildContext() {
    return this.props.context;
  }

  render() {
    return (
      <StylesProvider>
        { React.Children.only(this.props.children) }
      </StylesProvider>
    );
  }

}

export default App;
