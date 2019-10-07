import React, { Component } from 'react';
import './user-form.scss';
import PropTypes from 'prop-types';

class UserForm extends Component {
  state = {
    enteredText: ''
  }

  handleFormSubmit = (e) => {
    const enteredTextWithourSpaces = this.state.enteredText.trim();

    e.preventDefault();
    
    if (enteredTextWithourSpaces) {
      this.props.setUserName(enteredTextWithourSpaces);
    }
  }

  render() {
    return (
      <section className="user-form">
        <h2 className="user-form__title">Добро пожаловать!</h2>
        <form
          action="#"
          method="post"
          onSubmit={this.handleFormSubmit}
        >
          <label
            className="user-form__label"
            htmlFor="user-name"
          >
            Введите свое имя: 
          </label>
          <input
            className="user-form__input"
            id="user-name"
            type="text"
            onChange={e => this.setState({enteredText: e.target.value})}
          />
          <button
            className="user-form__btn"
            disabled={!this.state.enteredText}
          >
            Готово
          </button>
        </form>
      </section>
    )
  }
}

UserForm.propTypes = {
  setUserName: PropTypes.func.isRequired
}

export default UserForm;
