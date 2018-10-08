import React from 'react'
import PropTypes from 'prop-types'
import { Switch, Route, Redirect } from 'react-router'
import { ConnectedRouter } from 'connected-react-router'
import Helmet from 'react-helmet'

import { UnauthLayout, Footer } from 'components'
import { AuthLayout } from 'containers'

import favicon from './img/logo-icon-30x30.png'

const propTypes = {
    isSettingsLoaded: PropTypes.bool.isRequired,
    history: PropTypes.object.isRequired,

    requestSettings: PropTypes.func.isRequired,
}

class App extends React.Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        this.props.requestSettings()
    }

    render() {
        return this.props.isSettingsLoaded ? (
            <div className={'container-fluid mx-auto flex-column d-flex h-100'}>
                <Helmet>
                    <link rel="icon" href={favicon}/>
                </Helmet>
                <ConnectedRouter history={this.props.history}>
                    <Switch>
                        <Route exact path="/" component={AuthLayout}/>
                        <Route path="/auth" component={UnauthLayout}/>
                        <Redirect to="/"/>
                    </Switch>
                </ConnectedRouter>
                <Footer/>
            </div>
        ) : (
            <div>Loading</div>
        )
    }
}

App.propTypes = propTypes

export default App