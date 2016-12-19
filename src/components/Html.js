import React, { PropTypes } from 'react';

class Html extends React.Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    style: PropTypes.string,
    scripts: PropTypes.arrayOf(PropTypes.string.isRequired),
    children: PropTypes.string,
  };

  render() {
    const { title, description, style, scripts, children } = this.props;
    return (
      <html lang="en">
        <head>
          <meta charSet="utf-8"/>
          <meta httpEquiv="x-ua-compatible" content="id=edge"/>
          <title>{title}</title>
          <meta name="description" content={description}/>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          {style && <style id="css" dangerouslySetInnerHTML={{ __html: style }}/>}
        </head>
      <body>
        <div id="app" dangerouslySetInnerHTML={{__html: children}}></div>
        {scripts && scripts.map(script => <script key={script} src={script} />)}
      </body>
      </html>
    )
  }
}

export default Html;