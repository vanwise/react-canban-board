import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './add-card.scss';
import TextForm from '../TextForm/TextForm';

class AddCard extends Component {
  static propTypes = {
    toggleAddCardVisability: PropTypes.func.isRequired,
    addNewCard: PropTypes.func.isRequired,
    isOpen: PropTypes.bool.isRequired
  }

  componentDidMount () {
    window.addEventListener('click', this.handleWindowClick);
  }
  
  componentWillUnmount () {
    window.removeEventListener('click', this.handleWindowClick);
  }
  
  handleWindowClick = () => {
    const { toggleAddCardVisability, isOpen } = this.props;

    if (isOpen) {
      toggleAddCardVisability();
    }
  }

  handleSaveBtnClick = (value) => {
    if (value) {
      this.props.addNewCard(value);
    }
  }

  render() {
    const { toggleAddCardVisability, isOpen } = this.props;

    return (
      <div 
        className="add-card"
        onClick={e => e.stopPropagation()}
      >
        {!isOpen
          ?
            <button 
              className="add-card__btn"
              onClick={toggleAddCardVisability}
            >
              Добавить еще одну карточку
            </button>
          :
            <TextForm
              fieldClassName="add-card__input"
              saveBtnTitle="Добавить карточку"
              placeholder="Введите заголовок для этой карточки"
              onSaveBtnClick={this.handleSaveBtnClick}
              onCloseBtnClick={toggleAddCardVisability}
              isDoneEditingFromEnter={true}
            />
        }
      </div>
    )
  }
}

export default AddCard;