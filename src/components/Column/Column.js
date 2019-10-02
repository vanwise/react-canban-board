import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './column.scss';
import TitleInput from '../TitleInput/TitleInput';
import Card from '../Card/Card';
import AddCard from '../AddCard/AddCard';

class Column extends Component {
  static propTypes = {
    toggleAddCardVisability: PropTypes.func.isRequired,
    changeColumnTitle: PropTypes.func.isRequired,
    isAddCardOpen: PropTypes.bool.isRequired,
    onCardClick: PropTypes.func.isRequired,
    addNewCard: PropTypes.func.isRequired,
    title: PropTypes.string,
    comments: PropTypes.array,
    cards: PropTypes.array
  }
  static defaultProps = {
    title: 'Неизвестная колонка',
    comments: [],
    cards: []
  }

  render () {
    const {
      title,
      cards,
      onCardClick,
      addNewCard,
      changeColumnTitle,
      comments,
      isAddCardOpen,
      toggleAddCardVisability
    } = this.props;

    return (
      <li className="column">
        <TitleInput
          className="column__title"
          defaultValue={title}
          onBlur={changeColumnTitle}
        />
        {cards.length > 0 &&
          <ul className="column__list">
            {cards.map(({ id, title }) => {
              return (
                <Card
                  key={id}
                  title={title}
                  commentsLength={comments.filter(item => item.cardId === id).length}
                  onClick={() => onCardClick(id)}
                />
              )
            })}
          </ul>
        }
        <AddCard 
          isOpen={isAddCardOpen}
          toggleAddCardVisability={toggleAddCardVisability}
          addNewCard={addNewCard}
        />
      </li>
    )
  }
}

export default Column;