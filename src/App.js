import React from 'react';
import './app.scss';
import Column from './components/Column/Column'
import Popup from './components/Popup/Popup';
import BigCard from './components/BigCard/BigCard'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: localStorage.getItem('userName'),
      columnWithAddCardOpened: null,
      isBigCardOpened: false,
      currentVisibleData: null,
      columns: JSON.parse(`${localStorage.getItem('columns')}`) || [
        {
          id: 'todo',
          title: 'TODO',
        },
        {
          id:'in-progress',
          title: 'In progress'
        },
        {
          id:'testing',
          title: 'Testing'
        },
        {
          id: 'done',
          title: 'Done'
        }
      ]
    }
  }

  setData (data) {
    localStorage.setItem('columns', JSON.stringify(data));
    this.setState({columns: data});
  }

  changeColumnTitle (columnId, value) {
    const currColumnIndex = this.state.columns.findIndex(item => item.id === columnId);
    const cloneColumnsArray = [...this.state.columns];

    cloneColumnsArray[currColumnIndex].title = value;
    this.setData(cloneColumnsArray);
  }

  addNewCard (columnId, value) {
    const currColumnIndex = this.state.columns.findIndex(item => item.id === columnId);
    const cloneColumnsArray = [...this.state.columns];
    const newCard = {
      id: Math.floor(Math.random().toFixed(5) * 100000),
      title: value,
      author: this.state.userName,
      desc: '',
      comments: []
    };

    if (!cloneColumnsArray[currColumnIndex].items) {
      cloneColumnsArray[currColumnIndex].items = [];
    }
    
    cloneColumnsArray[currColumnIndex].items.push(newCard);
    this.setData(cloneColumnsArray);    
  }

  toggleBigCardVisibiliy () {
    this.setState({isBigCardOpened: !this.state.isBigCardOpened});
  }

  visibleDataByCardId (columnId, cardId) {
    const currColumnIndex = this.state.columns.findIndex(item => item.id === columnId);
    let currentData = {};

    currentData.columnId = this.state.columns[currColumnIndex].id;
    currentData.columnTitle = this.state.columns[currColumnIndex].title;
    currentData.card = this.state.columns[currColumnIndex].items.find(card => card.id === cardId);

    this.toggleBigCardVisibiliy();
    this.setState({
      columnWithAddCardOpened: null,
      currentVisibleData: currentData,
    });
  }

  getCardIndexById (columnId, cardId) {
    const currColumnIndex = this.state.columns.findIndex(item => item.id === columnId);

    return {
      column: currColumnIndex,
      card: this.state.columns[currColumnIndex].items.findIndex(item => item.id === cardId)
    }
  }

  changeCardProp (columnId, cardId, desiredProp, value) {
    const cardIndexById = this.getCardIndexById(columnId, cardId);
    const cloneColumnsArray = [...this.state.columns];

    cloneColumnsArray[cardIndexById.column].items[cardIndexById.card][desiredProp] = value;
    this.setData(cloneColumnsArray);
  }

  changeCardDesc (columnId, cardId, value) {
    this.changeCardProp(columnId, cardId, 'desc', value);
  }

  changeCardTitle (columnId, cardId, value) {
    this.changeCardProp(columnId, cardId, 'title', value);
  }

  addNewComment (columnId, cardId, value) {
    const cardIndexById = this.getCardIndexById(columnId, cardId);
    const cloneColumnsArray = [...this.state.columns];
    const newComment = {
      id: Math.floor(Math.random().toFixed(5) * 100000),
      author: this.state.userName,
      text: value
    };

    cloneColumnsArray[cardIndexById.column].items[cardIndexById.card].comments.push(newComment);
    this.setData(cloneColumnsArray);
  }

  changeComment (columnId, cardId, commentId, isDeleted=true, value=null) {
    const cardIndexById = this.getCardIndexById(columnId, cardId);
    const cloneColumnsArray = [...this.state.columns];
    const currentCommentIndex =
      cloneColumnsArray[cardIndexById.column]
        .items[cardIndexById.card]
        .comments
        .findIndex(item => item.id === commentId);
    
    if (isDeleted) {
      cloneColumnsArray[cardIndexById.column]
        .items[cardIndexById.card]
        .comments
        .splice(currentCommentIndex, 1);
    } else {
      cloneColumnsArray[cardIndexById.column]
        .items[cardIndexById.card]
        .comments[currentCommentIndex]
        .text = value;
    }

    this.setData(cloneColumnsArray);
  }

  deleteCard (columnId, cardId) {
    const cardIndexById = this.getCardIndexById(columnId, cardId);
    const cloneColumnsArray = [...this.state.columns];

    cloneColumnsArray[cardIndexById.column].items.splice(cardIndexById.card, 1);
    this.setState({
      isBigCardOpened: false,
      currentVisibleData: null
    });
    this.setData(cloneColumnsArray);
  }

  render () {
    return (
      <section className="app">
        <h1 className="app__title">
          Доска с карточками
        </h1>
        {this.state.columns &&
          <ul className="app__list">
            {this.state.columns.map(column => {
              return(
                <Column
                  key={column.id}
                  columnId={column.id}
                  column={column}
                  isAddCardOpened={
                    this.state.columnWithAddCardOpened === column.id ? true : false
                  }
                  toggleAddCardVisibility={columnId => this.setState({
                    columnWithAddCardOpened: 
                    columnId === this.state.columnWithAddCardOpened ? null : columnId
                  })}
                  changeColumnTitle={this.changeColumnTitle.bind(this)}
                  addNewCard={this.addNewCard.bind(this)}
                  visibleDataByCardId={this.visibleDataByCardId.bind(this)}
                />
              )
            })}
          </ul>
        }
        <Popup
          userName={this.state.userName}
          setUserName={name => this.setState({userName: name})}
        />
        {this.state.currentVisibleData &&
          <BigCard
            isBigCardOpened={this.state.isBigCardOpened}
            toggleBigCardVisibiliy={this.toggleBigCardVisibiliy.bind(this)}
            currentVisibleData={this.state.currentVisibleData}
            changeCardDesc={this.changeCardDesc.bind(this)}
            changeCardTitle={this.changeCardTitle.bind(this)}
            addNewComment={this.addNewComment.bind(this)}
            changeComment={this.changeComment.bind(this)}
            deleteCard={this.deleteCard.bind(this)}
          />
        }
      </section>
    )
  }
}

export default App;
