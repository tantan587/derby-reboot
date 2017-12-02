import React from 'react';
import { hydrate } from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import { green, red } from 'material-ui/colors';
import App from '../common/components/App.jsx';
import storeFactory from '../common/store';

const store = storeFactory(false, window.__INITIAL_STATE__)

window.React = React
window.store = store

if (process.env.NODE_ENV !== 'production') {
  console.log('Looks like we are in development mode!');
}

const theme = createMuiTheme({
    palette: {
      primary: green,
      accent: red,
      type: 'light',
    },
  });

class Main extends React.Component {
// Remove the server-side injected CSS.
componentDidMount() {
    const jssStyles = document.getElementById('jss-server-side');
    if (jssStyles && jssStyles.parentNode) {
    jssStyles.parentNode.removeChild(jssStyles);
    }
}

render() {
    return <App {...this.props} />
}
}

console.log('rendered from here...')

hydrate(
  <Provider store={store}>
    <BrowserRouter>
      <MuiThemeProvider theme={theme}>
        <Main />
      </MuiThemeProvider>
    </BrowserRouter>
  </Provider>,
  document.getElementById('react-container'),
);

