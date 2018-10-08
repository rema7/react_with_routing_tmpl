import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { Route, Switch } from 'react-router'

import { Login } from 'components'

const propTypes = {
    match: PropTypes.object,
}

class UnauthLayout extends React.Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
    }

    render() {
        return (
            <Fragment>
                <Switch>
                    <Route path={`${this.props.match.url}/login`} component={Login}/>
                </Switch>
            </Fragment>
        )
    }
}

UnauthLayout.propTypes = propTypes

export default UnauthLayout