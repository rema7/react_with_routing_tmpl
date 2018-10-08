import { get , isEmpty } from 'lodash'
import request from 'superagent'

import { getToken } from 'helpers/storage'

// eslint-disable-next-line no-undef
const hostURL = ''

const fetch = (url, params, headers) => {
    const method = get(params, 'method', 'GET')
    let req = request(method, hostURL + url).set(headers)

    if (!isEmpty(params.query)) {
        req = req.query(params.query)
    } else if (!isEmpty(params.body)) {
        req = req.send(params.body)
    }

    return req.then((response) => {
        if (
            response.body &&
            response.body.error_code &&
            response.body.error_code === 401
        ) {
            response.body.error = 'An error occurred. Try again later.'
        }
        return response.body
    }).catch((response) => {
        if ([401].includes(response.status)) {
            return response
        }
        throw response
    })

}

export const fetchWrapper = (url, options) => {
    const params = Object.assign({}, options)
    const headers = Object.assign({}, {
        Accept: 'application/json',
    }, params.headers)

    return fetch(url, params, headers)
}

export const securedFetchWrapper = (url, options) => {
    const params = Object.assign({}, options)
    const headers = Object.assign({}, {
        Accept: 'application/json',
        Authorization: getToken(),
    }, params.headers)

    return fetch(url, params, headers)
}

const post = (url, body, headers) => {
    let req = request('POST', hostURL + url).set(headers).send(body)

    return req.then((response) => {
        if (response.body && response.body.error_code && response.body.error_code === 401) {
            response.body.error = 'An error occured. Try again later.'
        }
        return response.body
    }).catch((response) => {
        if ([401].includes(response.status)) {
            return response
        }
        throw response
    })
}

const del = (url, headers) => {
    let req = request('DELETE', hostURL + url).set(headers).send()

    return req.then((response) => {
        if (response.body && response.body.error_code && response.body.error_code === 401) {
            response.body.error = 'An error occured. Try again later.'
        }
        return response.body
    }).catch((response) => {
        if ([401].includes(response.status)) {
            return response
        }
        throw response
    })
}

export const postWrapper = (url, body) => {
    const headers = Object.assign({}, {
        Accept: 'application/json',
    })

    return post(url, body, headers)
}

export const securedPostWrapper = (url, body) => {
    const headers = Object.assign({}, {
        Accept: 'application/json',
        Authorization: getToken(),
    })
    return post(url, body, headers)

}

export const securedDeleteWrapper = (url) => {
    const headers = Object.assign({}, {
        Accept: 'application/json',
        Authorization: getToken(),
    })
    return del(url, headers)

}

export const onAbort = (req, callback) => {
    req.on('abort', () => {
        if (req.xhr.readyState !== 4) {
            callback()
        }
    })
}