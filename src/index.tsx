import React from 'react';
import { Provider } from 'react-redux'
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Client as Styletron } from 'styletron-engine-atomic';
import { Provider as StyletronProvider } from 'styletron-react';
import { BaseProvider } from 'baseui';
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';
import { theme } from './theme';
import Routes from './routes';
import * as serviceWorker from './serviceWorker';
import './theme/global.css';
import store from "../src/redux/store";

const client = new ApolloClient({
    uri: process.env.REACT_APP_API_URL,
    cache: new InMemoryCache(),
});

function App() {
    const engine = new Styletron();

    return (
        <Provider store={store}>
            <ApolloProvider client={client as any}>
            <StyletronProvider value={engine}>
                <BaseProvider theme={theme}>
                    <BrowserRouter>
                        <Routes />
                    </BrowserRouter>
                </BaseProvider>
            </StyletronProvider>
            </ApolloProvider>
        </Provider>
    );
}

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change  import configureStore from "../src/redux/store";
// unregister() to register() below. Note this comes with some pitfalls.  const store = configureStore()
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
