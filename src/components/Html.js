/* eslint-disable react/require-default-props,react/forbid-prop-types,react/no-danger */
import React from 'react';
import PropTypes from 'prop-types';
import serialize from 'serialize-javascript';

class Html extends React.Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    styles: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string.isRequired,
      cssText: PropTypes.string.isRequired,
    }).isRequired),
    scripts: PropTypes.arrayOf(PropTypes.string.isRequired),
    app: PropTypes.object,
    children: PropTypes.string,
  };

  render() {
    const { title, description, styles, scripts, app, children } = this.props;
    return (
      <html lang="en">
        <head>
          <meta charSet="utf-8" />
          <meta httpEquiv="x-ua-compatible" content="id=edge" />
          <title>{title}</title>
          <meta name="description" content={description} />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          { styles.map(style =>
            <style
              key={style.id}
              id={style.id}
              dangerouslySetInnerHTML={{ __html: style.cssText }}
            />,
          ) }
        </head>
        <body>
          <script dangerouslySetInnerHTML={{ __html: `window.App=${serialize(app)}` }} />
          <div id="app" dangerouslySetInnerHTML={{ __html: children }} />
          {scripts && scripts.map(script => <script key={script} src={script} />)}
        </body>
      </html>
    );
  }
}

export default Html;
