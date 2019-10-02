import React, { Component } from 'react';
import PropTypes from 'prop-types';
import KEY_CODES from '../../utils/keyCodes'

class TitleInput extends Component {
  static propTypes = {
    defaultValue: PropTypes.string.isRequired,
    onBlur: PropTypes.func.isRequired,
    className: PropTypes.string
  }
  static defaultProps = {
    className: ''
  }
  state = {
    enterdText: this.props.defaultValue
  }

  handleBlur = () => {
    const { onBlur, defaultValue } = this.props;
    const text = this.state.enterdText.trim() || defaultValue;

    onBlur(text);
    this.setState({enterdText: text});
  }

  handleKeyDown = (e) => {
    const { keyCode, target } = e;

    if (KEY_CODES.endOfTitleEditing.includes(keyCode)) {
      target.blur();
    }
  }

  render() {
    return (
      <input 
        className={this.props.className}
        value={this.state.enterdText}
        onClick={e => e.target.select()}
        onChange={e => this.setState({enterdText: e.target.value})}
        onBlur={this.handleBlur}
        onKeyDown={this.handleKeyDown}
      />
    )
  }
}

export default TitleInput;