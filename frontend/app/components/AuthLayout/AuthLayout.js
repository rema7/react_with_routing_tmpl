import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { Route, Switch } from 'react-router'

import { Dashboard } from 'components'

const propTypes = {
    match: PropTypes.object,
}

class AuthLayout extends React.Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
    }

    render() {
        return (
            <Fragment>
                <Switch>
                    <Route path={`${this.props.match.url}`} render={() => {
                        return (
                            <Dashboard
                            />
                        )
                    }}
                    />
                </Switch>
            </Fragment>
        )
    }
}

AuthLayout.propTypes = propTypes

export default AuthLayout