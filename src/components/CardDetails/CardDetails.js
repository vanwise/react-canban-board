import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './card-details.scss';
import TitleInput from '../TitleInput/TitleInput';
import Desc from '../Desc/Desc';
import Comments from '../Comments/Comments';
import CloseBtn from '../CloseBtn/CloseBtn';
import KEY_CODES from '../../utils/keyCodes';
import { changeCardProp, removeCard } from '../../reducers/cards/actions';

class CardDetails extends Component {
  componentDidMount () {
    window.addEventListener('keydown', this.onCardDetailsKeyPress);
  }
  componentWillUnmount () {
    window.removeEventListener('keydown', this.onCardDetailsKeyPress);
  }

  onCardDetailsKeyPress = (e) => {
    if (e.keyCode === KEY_CODES.cancel) {
      this.props.onCloseBtnClick();
    }
  }

  handleCardDeleteClick = () => {
    const {
      removeCard,
      visibleCardId,
      onCloseBtnClick
    } = this.props;
    
    removeCard(visibleCardId);
    onCloseBtnClick();
  }

  render () {
    const {
      visibleCardId,
      cards,
      columns,
      changeCardProp,
      onCloseBtnClick
    } = this.props;
    const currentCard = cards.find(item => item.id === visibleCardId) || {};

    return (
      <div className="card-details">
        <TitleInput
          className="card-details__title"
          defaultValue={currentCard.title}
          onBlur={value => changeCardProp(visibleCardId, 'title', value)}
        />
        <p className="card-details__column-title">
          В колонке {(columns.find(item => item.id === currentCard.columnId) || {}).title}
        </p>
        <p className="card-details__author">
          Автор карточки: {currentCard.author}
        </p>
        <Desc
          customClass={'card-details__desc'}
          text={currentCard.desc}
          editText={value => changeCardProp(visibleCardId, 'desc', value)}
        />
        <Comments
          customClass={'card-details__comments'}
          visibleCardId={visibleCardId}
        />
        <CloseBtn
          customClass="card-details__close-btn"
          title="Закрыть"
          onClick={onCloseBtnClick}
        />
        <button
          className="card-details__delete"
          onClick={this.handleCardDeleteClick}
        >
          Удалить карточку
        </button>
      </div>
    )
  }
}

CardDetails.propTypes = {
  onCloseBtnClick: PropTypes.func.isRequired,
  changeCardProp: PropTypes.func.isRequired,
  removeCard: PropTypes.func.isRequired,
  visibleCardId: PropTypes.number.isRequired,
  cards: PropTypes.array,
  columns: PropTypes.array
}

CardDetails.defaultProps = {
  cards: [],
  columns: []
}

const mapStateToProps = state => ({
  cards: state.cards,
  columns: state.columns
});

const mapDispatchToProps = dispatch => ({
  changeCardProp: (id, propName, value) => dispatch(changeCardProp(id, propName, value)),
  removeCard: id => dispatch(removeCard(id))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CardDetails);