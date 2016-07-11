/**
 * Created by PedroGaspar on 11/07/16.
 */
import React, {Component} from 'react';

class InputToken extends Component {
    constructor () {
        super ();
        this.handleClick = this.handleClick.bind (this);
    }
    handleClick () {
        this.props.onClick ();
    }
    render () {
        return (
            <div className="token" onClick={this.handleClick}>
                {this.props.value}
            </div>
        );
    }
}

InputToken.propTypes = {
    onClick: React.PropTypes.func.isRequired,
    value: React.PropTypes.string.isRequired
}

export default InputToken;