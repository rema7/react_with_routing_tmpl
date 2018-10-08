import React from 'react'


const propTypes = {
}

class Login extends React.Component {
    constructor(props) {
        super(props)
    }

    componentDidUpdate() {
    }

    render() {
        return (
            <div className={'row justify-content-center align-self-center h-100'}>
                <div className={'align-self-center'}>Login</div>
            </div>
        )
    }
}

Login.propTypes = propTypes

export default Login