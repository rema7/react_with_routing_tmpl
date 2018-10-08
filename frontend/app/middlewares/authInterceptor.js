// import { push } from 'react-router-redux'
import { removeToken } from 'helpers/storage'

const authInterceptor = (() => {
    return ({ dispatch }) => (next) => (action) => {
        if (action.data && action.data.status === 401) {
            removeToken()
            // dispatch(push('/auth/login'))
            dispatch()
            return next(action)
        } else {
            return next(action)
        }
    }
})()

export default authInterceptor