import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './add-card.scss';
import TextForm from '../TextForm/TextForm';
import { addNewCard } from '../../reducers/cards/actions';

class AddCard extends Component {
  componentDidMount () {
    window.addEventListener('click', this.handleWindowClick);
  }
  componentWillUnmount () {
    window.removeEventListener('click', this.handleWindowClick);
  }
  
  handleWindowClick = () => {
    const { toggleAddCardVisibility, isOpen } = this.props;

    if (isOpen) {
      toggleAddCardVisibility();
    }
  }

  handleSaveBtnClick = (value) => {
    if (value) {
      const {
        columnId,
        addNewCard,
        author
      } = this.props;

      addNewCard(columnId, author, value);
    }
  }

  render() {
    const { columnId, toggleAddCardVisibility, isOpen } = this.props;

    return (
      <div 
        className="add-card"
        onClick={e => e.stopPropagation()}
      >
        {!isOpen
          ?
            <button 
              className="add-card__btn"
              onClick={() => toggleAddCardVisibility(columnId)}
            >
              Добавить еще одну карточку
            </button>
          :
            <TextForm
              fieldClassName="add-card__input"
              saveBtnTitle="Добавить карточку"
              placeholder="Введите заголовок для этой карточки"
              onSaveBtnClick={this.handleSaveBtnClick}
              onCloseBtnClick={toggleAddCardVisibility}
              isDoneEditingFromEnter={true}
            />
        }
      </div>
    )
  }
}

AddCard.propTypes = {
  toggleAddCardVisibility: PropTypes.func.isRequired,
  addNewCard: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
  author: PropTypes.string,
  columnId: PropTypes.string
}

AddCard.defaultProps = {
  author: 'Unknown',
  columnId: ''
}

const mapStateToProps = state => ({
  author: state.user.name
});

const mapDispatchToProps = dispatch => ({
  addNewCard: (columnId, author, value) => dispatch(addNewCard(columnId, author, value))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddCard);