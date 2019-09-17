import React from 'react';
import './column.scss';
import Card from '../Card/Card';
import AddCard from '../AddCard/AddCard';

class Column extends React.Component {
  state = {
    idEditedBy: false
  }

  onTitleInputClick (e) {
    this.setState({isEditedBy: true});
    e.target.select();
  }

  onTitleInputBlur () {
    this.setState({isEditedBy: false});
  }

  onAddCardBtnClick () {
    this.props.toggleAddCardVisibility(this.props.columnId);
  }

  onTitleInputKeyDown (e) {
    const code = e.keyCode;

    if (code === 27 || code === 13) {
      e.target.blur();
    }
  }

  render () {
    const itemsLength = this.props.column.items ? this.props.column.items.length : 0;

    return (
      <li className="column">
        <input 
          className="column__title"
          defaultValue={this.props.column.title}
          onClick={e => this.onTitleInputClick(e)}
          onChange={e => this.props.changeColumnTitle(this.props.columnId, e.target.value)}
          onBlur={() => this.onTitleInputBlur()}
          onKeyDown={e => this.onTitleInputKeyDown(e)}
        />
        {itemsLength > 0 &&
          <ul className="column__list">
            {this.props.column.items.map(card => {
              return (
                <Card
                  key={card.title}
                  columnId={this.props.columnId}
                  cardId={card.id}
                  title={card.title}
                  commentsCount={card.comments ? card.comments.length : null}
                  visibleDataByCardId={this.props.visibleDataByCardId}
                />
              )
            })}
          </ul>
        }
        {!this.props.isAddCardOpened &&
          <button 
            className="column__btn"
            onClick={this.onAddCardBtnClick.bind(this)}
          >
            Добавить еще одну карточку
          </button>
        }
        <AddCard 
          isAddCardOpened={this.props.isAddCardOpened}
          toggleAddCardVisibility={this.props.toggleAddCardVisibility}
          columnId={this.props.columnId}
          addNewCard={this.props.addNewCard}
          isTitleEdited={this.state.isEditedBy}
        />
      </li>
    )
  }
}

export default Column;