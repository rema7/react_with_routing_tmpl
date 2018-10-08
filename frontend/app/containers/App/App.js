import { connect } from 'react-redux'

import { requestSettings } from 'actions/Settings'

import { App } from 'components'

const mapStateToProps = (state) => {
    return {
        isSettingsLoaded: state.settings.loaded,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        requestSettings: () => {
            dispatch(requestSettings())
        },

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
