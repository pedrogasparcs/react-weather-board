/**
 * Created by PedroGaspar on 09/07/16.
 */

import React, {Component, PropTypes} from 'react';
import InputTokenizer from './InputTokenizer';

class Search extends Component {
    constructor () {
        super ();
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleTokens = this.handleTokens.bind(this);
    }
    componentDidMount () {
        /*
        request focus
         */
        this.refs.search.focus();
    }
    handleSubmit (e) {
        e.preventDefault();
        //this.props.onSubmit (this.refs.search.value);
    }
    handleTokens (tokensCsv) {
        this.props.onSubmit (tokensCsv);
    }
    render () {
        return (
            <div className="search-form">
                <form onSubmit={this.handleSubmit}>
                    {
                        /*<input type="text" ref="search"/>*/
                    }
                    <InputTokenizer
                        ref="search"
                        onChange={this.handleTokens}
                        tokenizerChar=","
                        placeholder="Type your city, <Enter> or <Comma> to add more"
                    />
                </form>
            </div>
        );
    }
}
Search.propTypes = {
    onSubmit: React.PropTypes.func.isRequired
}
export default Search;