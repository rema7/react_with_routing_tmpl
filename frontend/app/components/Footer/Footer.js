import React from 'react'

// eslint-disable-next-line no-undef
const version = __VERSION__

class SkipPage extends React.Component {
    constructor (props) {
        super(props)
    }

    render () {
        return (
            <footer className="mastfoot mt-auto text-center">
                <div className="inner">
                    <div className="small">
                        <p>Version {version}</p>
                    </div>
                </div>
            </footer>
        )
    }
}

export default SkipPage