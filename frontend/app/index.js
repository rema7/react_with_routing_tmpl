import React from 'react'
import ReactDOM from 'react-dom'
import ru from 'react-intl/locale-data/ru'
import { addLocaleData, IntlProvider } from 'react-intl'
import { createStore, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux'
import { batchStoreEnhancer } from 'redux-batch-enhancer'

import createHistory from 'history/createBrowserHistory'
import { connectRouter, routerMiddleware } from 'connected-react-router'

import middlewares from 'middlewares'
import rootReducers from 'reducers'

import { App } from 'containers'

import messagesRu from './translations/ru.json'

import './index.scss'

addLocaleData([...ru])

const messages = {
    ru: messagesRu,
}

const locale = localStorage.getItem('locale')

const language = locale || navigator.language.split(/[-_]/)[0]

const history = createHistory()
middlewares.push(routerMiddleware(history))

const store = createStore(
    connectRouter(history)(rootReducers),
    {},
    compose(
        applyMiddleware(...middlewares),
        batchStoreEnhancer
    ),
)

ReactDOM.render(
    <Provider store={store}>
        <IntlProvider
            locale={language}
            messages={messages[language]}
        >
            <App history={history}/>
        </IntlProvider>
    </Provider>,
    document.getElementById('root'),
)
