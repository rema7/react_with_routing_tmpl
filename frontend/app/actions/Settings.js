import { fetchWrapper as fetch } from 'helpers/requests'

export const SETTINGS_START_REQUEST = 'SETTINGS_START_REQUEST'
export const SETTINGS_RESPONSE_OK = 'SETTINGS_RESPONSE_OK'
export const SETTINGS_RESPONSE_ERROR = 'SETTINGS_RESPONSE_ERROR'

export function startRequest() {
    return {
        type: SETTINGS_START_REQUEST,
    }
}

export function responseOk(data) {
    return {
        type: SETTINGS_RESPONSE_OK,
        data,
    }
}

export function responseError(errorMessage) {
    return {
        type: SETTINGS_RESPONSE_ERROR,
        errorMessage,
    }
}

export const requestSettings = () => {
    return async (dispatch, getState) => {
        const state = getState()
        if (state.settings.loading) {
            return null
        }
        dispatch(startRequest())
        try {
            const response = await fetch(state.settings.urls.settings)
            dispatch(responseOk(response))
        } catch (e) {
            dispatch(responseError(e.message))
            throw e
        }
    }
}