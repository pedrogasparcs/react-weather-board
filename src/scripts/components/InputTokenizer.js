/**
 * Created by PedroGaspar on 11/07/16.
 */
import React, {Component} from 'react';

import InputToken from './InputToken';
import {addEvent} from '../helpers/domEvents';

const ENTER_KEY = 13;
const COMMA_KEY = 44;
const BACKSPACE_KEY = 8;
const tokenizeKeys = [ENTER_KEY, COMMA_KEY];

class InputTokenizer extends Component {
    constructor () {
        super ();
        this.isFocused = false;
        this.parseInput = this.parseInput.bind(this);
        this.handleFocus = this.handleFocus.bind(this);
        this.handleBlur = this.handleBlur.bind(this);
        this.handleKeyDown = this.handleKeyDown.bind(this);
        this.state = {
            inputPadding: 0,
            tokens: [],
            inputValue: ""
        }
    }
    componentDidMount () {
        addEvent (document, "keydown", this.handleKeyDown);
    }
    componentDidUpdate () {
        let inputPadding = this.refs.tokens.offsetWidth;
        if (this.state.inputPadding != inputPadding) {
            this.setState({
                inputPadding: inputPadding
            });
        }
    }
    handleKeyDown (e) {
        if(this.isFocused) {
            e = e || window.event;
            if (tokenizeKeys.find((item) => item == e.keyCode)) {
                /*
                if comma or enter, force a tokenizerChar on input value and parse value
                parser tokenizes based on tokenizerChar
                  */
                e.preventDefault ();
                if (String(this.refs.tokensInput.value) != "") {
                    this.setState({
                        inputValue: String(this.refs.tokensInput.value) + this.props.tokenizerChar
                    });
                    this.parseInput();
                }
            }
            else if(e.keyCode == BACKSPACE_KEY && String(this.refs.tokensInput.value).length == 0) {
                this.removeLastToken ();
            }
        }
    }
    handleFocus () {
        this.isFocused = true;
    }
    handleBlur () {
        this.isFocused = false;
    }

    /**
     *
     */
    parseInput () {
        let tokensAtInput = String(this.refs.tokensInput.value).split(this.props.tokenizerChar);
        let token;
        if (tokensAtInput.length > 1) {
            while(tokensAtInput.length > 1)
            {
                token = tokensAtInput.splice(0, 1)[0];
                token.length == 0 || this.addToken (token);
            }
        }
        this.setState({
            inputValue: tokensAtInput.join("")
        });
    }

    /**
     *
     * @param token
     */
    addToken (token) {
        let tokens = this.state.tokens;
        tokens.push({value:token});
        this.setState({
            tokens: tokens
        });
        this.dispatchTokens (tokens);
    }

    /**
     *
     * @param token
     */
    removeTokenByRef (token) {
        let tokens = this.state.tokens.filter((item) => item.value != token.value);
        this.setState({
            tokens: tokens
        });
        this.dispatchTokens (tokens);
    }

    /**
     *
     */
    removeLastToken () {
        this.state.tokens.pop();
        this.setState({
            tokens: this.state.tokens
        });
        this.dispatchTokens (this.state.tokens);
    }

    /**
     *
     * @param tokensToDispatch
     */
    dispatchTokens (tokensToDispatch) {
        let ret = tokensToDispatch.map((item) => item.value).join(this.props.tokenizerChar);
        //console.log(tokensToDispatch, ret);
        this.props.onChange (ret);
    }
    /**
     *
     */
    focus () {
        this.refs.tokensInput.focus ();
    }
    render () {
        return (
            <div className="tokenizer-container">
                <div className="tokens" ref="tokens">
                    {
                        this.state.tokens.map ( (item, index) => <InputToken
                                                                        key={"token" + index}
                                                                        value={item.value}
                                                                        onClick={this.removeTokenByRef.bind(this, item)}
                                                                    />)
                    }
                </div>
                <input
                    type="text"
                    ref="tokensInput"
                    style={{paddingLeft: this.state.inputPadding + "px"}}
                    onChange={this.parseInput}
                    onFocus={this.handleFocus}
                    onBlur={this.handleBlur}
                    value={this.state.inputValue}
                    placeholder={!this.state.tokens.length && !this.state.inputValue.length?this.props.placeholder:""}
                />
            </div>
        );
    }
}

InputTokenizer.propTypes = {
    onChange: React.PropTypes.func,
    tokenizerChar: React.PropTypes.string.isRequired,
    placeholder: React.PropTypes.string
}

export default InputTokenizer;