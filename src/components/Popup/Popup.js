import React from 'react';
import './popup.scss';

class Popup extends React.Component {
  state = {
    enteredName: null,
    isVisible: this.props.userName ? false : true
  }

  onBtnClick () {
    localStorage.setItem('userName', this.state.enteredName);
    this.props.setUserName(this.state.enteredName);
    this.setState({isVisible: false});
  }

  render() {
    return this.state.isVisible && (
        <section className="popup">
          <div className="popup__inner">
            <h2 className="popup__title">Добро пожаловать!</h2>
            <label
              className="popup__label"
              htmlFor="user-name"
            >
              Введите свое имя: 
            </label>
            <input
              className="popup__input"
              id="user-name"
              type="text"
              onChange={e => this.setState({enteredName: e.target.value})}
            />
            <button
              className="popup__btn"
              disabled={this.state.enteredName ? false : true}
              onClick={() => this.onBtnClick()}
            >
              Готово
            </button>
          </div>
        </section>
    )
  }
}

export default Popup;
