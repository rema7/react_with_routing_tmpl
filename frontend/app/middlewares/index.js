
import thunkMiddleware from 'redux-thunk'
import { batchMiddleware } from 'redux-batch-enhancer'

import authInterceptor from './authInterceptor'

let middlewares = [
    batchMiddleware,
    thunkMiddleware,
    authInterceptor,
]

export default middlewares