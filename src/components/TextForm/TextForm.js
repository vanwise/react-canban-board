import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './text-form.scss';
import classNames from 'classnames';
import CloseBtn from '../CloseBtn';
import KEY_CODES from '../../utils/keyCodes';

class TextForm extends Component  {
  componentDidMount () {
    this.setTextareaHeight();
    this.textarea.current.select();
  }
  state = {
    enteredText: this.props.defaultText,
  }

  textarea = React.createRef();

  handleFormSubmit = (e) => {
    const { defaultText, onSaveBtnClick } = this.props;
    const enteredTextWithoutSpaces = this.state.enteredText.trim();
    
    e.preventDefault();
    onSaveBtnClick(enteredTextWithoutSpaces);
    this.setState({enteredText: defaultText});
    this.textarea.current.focus();
  }

  handleCloseBtnClick = () => {
    const { onCloseBtnClick, defaultText } = this.props;

    onCloseBtnClick();
    this.setState({enteredText: defaultText});
  }

  handleChange (e) {
    this.setState({enteredText: e.target.value});
    this.setTextareaHeight();
  }

  setTextareaHeight () {
    if (this.props.isDynamicTextareaHeight) {
      this.textarea.current.style.height = '';
      this.textarea.current.style.height = `${this.textarea.current.scrollHeight}px`;
    }
  }

  handleKeyDown (e) {
    if (e.keyCode === KEY_CODES.enter && this.props.isDoneEditingFromEnter) {
      this.handleFormSubmit(e);
    }
    if (e.keyCode === KEY_CODES.cancel) {
      this.handleCloseBtnClick();
    }
  }

  render () {
    const {
      customClass,
      fieldClassName,
      saveBtnTitle,
      placeholder
    } = this.props;

    return (
      <div className={classNames('text-form', customClass)}>
        <form
          action="#"
          method="post"
          onSubmit={this.handleFormSubmit}
        >
          <textarea
            className={classNames('text-form__field', fieldClassName)}
            ref={this.textarea}
            placeholder={placeholder}
            value={this.state.enteredText}
            onChange={e => this.handleChange(e)}
            onKeyDown={e => this.handleKeyDown(e)}
          />
          <button className="text-form__save-btn">
            {saveBtnTitle}
          </button>
          <CloseBtn
            onClick={this.handleCloseBtnClick}
            title="Закрыть"
          />
        </form>
      </div>
    )
  }
}

TextForm.propTypes = {
  onSaveBtnClick: PropTypes.func.isRequired,
  onCloseBtnClick: PropTypes.func.isRequired,
  customClass: PropTypes.string,
  fieldClassName: PropTypes.string,
  defaultText: PropTypes.string,
  saveBtnTitle: PropTypes.string,
  placeholder: PropTypes.string,
  isDoneEditingFromEnter: PropTypes.bool,
  isDynamicTextareaHeight: PropTypes.bool
}

TextForm.defaultProps = {
  customClass: '',
  fieldClassName: '',
  defaultText: '',
  saveBtnTitle: 'Кнопка',
  placeholder: 'Введите текст',
  isDoneEditingFromEnter: false,
  isDynamicTextareaHeight: false
}

export default TextForm;