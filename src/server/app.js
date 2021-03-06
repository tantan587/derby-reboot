/* eslint-disable */
import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import fs from 'fs';
import { Provider } from 'react-redux';
import { compose } from 'redux';
import { StaticRouter } from 'react-router-dom';
import { renderToString } from 'react-dom/server';
import derbyapi from './derby-api';
import authapi from './auth-api';
import leagueapi from './league-api';
import App from '../common/components/App';
import storeFactory from '../common/store';
import initialState from '../../data/initialState.json';
import { SheetsRegistry } from 'react-jss/lib/jss';
import JssProvider from 'react-jss/lib/JssProvider';
import { create } from 'jss';
import preset from 'jss-preset-default';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import createGenerateClassName from 'material-ui/styles/createGenerateClassName';
import { green, red } from 'material-ui/colors';


//const staticCSS = fs.readFileSync(path.join(__dirname, '../../assets/bundle.css'))
const fileAssets = express.static(path.join(__dirname, '../../assets'))

const serverStore = storeFactory(true, initialState)
const sheetsRegistry = new SheetsRegistry();
    
const theme = createMuiTheme({
    palette: {
        primary: green,
        accent: red,
        type: 'light',
    },
    });

const jss = create(preset());
    
jss.options.createGenerateClassName = createGenerateClassName;
const myCss = sheetsRegistry.toString()
console.log(myCss)
console.log(sheetsRegistry)


/*serverStore.subscribe(() =>
    fs.writeFile(
        path.join(__dirname, '../data/initialState.json'),
        JSON.stringify(serverStore.getState()),
        error => (error) ? console.log("Error saving state!", error) : null
    )
    <style>${staticCSS}</style>
)*/

const buildHTMLPage = ({html, state, css}) => `
<!DOCTYPE html>
<html>
    <head>
        <meta name="viewport" content="minimum-scale=1.0, width=device-width, maximum-scale=1.0, user-scalable=no" />
        <meta charset="utf-8">
        <link rel="icon" href="./favicon.ico" type="image/x-icon" />
        <title>Derby</title>
    </head>
    <body>
        <div id="react-container">${html}</div>
        <style id="jss-server-side">${myCss}</style>
        <script>
            window.__INITIAL_STATE__ = ${JSON.stringify(state)}
        </script>
        <script src="/bundle.js"></script>
    </body>
</html>
`

const renderComponentsToHTML = ({url, store}) =>
    ({
        state: store.getState(),
        html: renderToString(
            <Provider store={store}>
                <StaticRouter location={url} context={{}}>
                    <JssProvider registry={sheetsRegistry} jss={jss}>
                        <MuiThemeProvider theme={theme} sheetsManager={new Map()}>
                            <App />  
                        </MuiThemeProvider>
                    </JssProvider>   
                </StaticRouter>
            </Provider>
        )
    })

const makeClientStoreFrom = store => url =>
    ({
        url,
        store: storeFactory(false, store.getState())
    })

const htmlResponse = compose(
    buildHTMLPage,
    renderComponentsToHTML,
    makeClientStoreFrom(serverStore)
)

const respond = ({url}, res) =>
    res.status(200).send(
      htmlResponse(url)
    )

const logger = (req, res, next) => {
    console.log(`${req.method} request for '${req.url}'`)
    next()
}

const addStoreToRequestPipeline = (req, res, next) => {
    req.store = serverStore
    next()
}

export default express()
    .use(bodyParser.json())
    .use(logger)
    .use(fileAssets)
    .use(addStoreToRequestPipeline)
    .use('/api', derbyapi)
    .use('/api', authapi)
    .use('/api', leagueapi)
    .use(respond)