import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

import { settings } from 'reducers/Settings'


export default combineReducers({
    routing: routerReducer,

    settings,
})