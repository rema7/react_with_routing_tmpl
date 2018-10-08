import React from 'react'
import PropTypes from 'prop-types'


const propTypes = {
    errorMessage: PropTypes.string,
}

class Dashboard extends React.PureComponent {
    constructor (props) {
        super(props)
    }

    render () {
        return (
            <div className={'row d-flex h-100'}>
                <h1>Dashboard</h1>
            </div>
        )
    }
}
Dashboard.propTypes = propTypes

export default Dashboard