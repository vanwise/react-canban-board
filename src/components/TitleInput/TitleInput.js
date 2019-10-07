import React, { Component } from 'react';
import PropTypes from 'prop-types';
import KEY_CODES from '../../utils/keyCodes'

class TitleInput extends Component {
  state = {
    enterdText: this.props.defaultValue
  }

  handleBlur = () => {
    const { onBlur, defaultValue } = this.props;
    const text = this.state.enterdText.trim() || defaultValue;

    this.setState({enterdText: text});
    onBlur(text);
  }

  handleKeyDown = (e) => {
    if (KEY_CODES.endOfTitleEditing.includes(e.keyCode)) {
      e.target.blur();
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

TitleInput.propTypes = {
  defaultValue: PropTypes.string.isRequired,
  onBlur: PropTypes.func.isRequired,
  className: PropTypes.string
}

TitleInput.defaultProps = {
  className: ''
}

export default TitleInput;