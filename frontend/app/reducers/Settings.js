import { omit } from 'lodash'
import humps from 'humps'

import {
    SETTINGS_RESPONSE_OK,
    SETTINGS_RESPONSE_ERROR,
    SETTINGS_START_REQUEST,
} from 'actions/Settings'


const initialState = {
    loaded: false,
    loading: false,
    errorMessage: null,
    values: {},
    urls: {
        settings: '/api/settings',
    },
}

export const settings = (state = initialState, action = {}) => {
    switch (action.type) {
        case SETTINGS_START_REQUEST:
            return {
                ...state,
                loaded: false,
                loading: true,
                errorMessage: null,
            }
        case SETTINGS_RESPONSE_ERROR:
            return {
                loaded: false,
                loading: false,
                errorMessage: action.errorMessage,
            }
        case SETTINGS_RESPONSE_OK: {
            const values = humps.camelizeKeys(omit(action.data, ['urls']))
            return {
                ...state,
                loaded: true,
                loading: false,
                values: values,
                urls: Object.assign({}, state.urls, humps.camelizeKeys(action.data.urls)),
                errorMessage: null,
            }
        }
        default:
            return state
    }
}