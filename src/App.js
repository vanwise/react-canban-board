import React, { Component } from 'react';
import './app.scss';
import DEFAULT_DATA from './utils/defaultData';
import getRandomID from './utils/getRandomId';
import Modal from './components/Modal/Modal'
import Column from './components/Column/Column';
import UserForm from './components/UserForm/UserForm';
import CardDetails from './components/CardDetails/CardDetails';

class App extends Component {
  state = {
    userName: localStorage.getItem('userName'),
    columnWithOpenAddCard: null,
    visibleCardId: null,
    columns: this.initData('columns'),
    cards: this.initData('cards'),
    comments: this.initData('comments')
  }
  
  initData (title) {
    const incomingData = JSON.parse(`${localStorage.getItem(title)}`);
    let data;

    if (incomingData) {
      data = incomingData;
    } else {
      localStorage.setItem(title, JSON.stringify(DEFAULT_DATA[title] || []));
      data = DEFAULT_DATA[title] || [];
    }

    return data;
  }

  setData (data, title) {
    this.setState({[title]: data});
    localStorage.setItem(title, JSON.stringify(data));
  }

  setUserName = (name) => {
    this.setState({userName: name});
    localStorage.setItem('userName', name);
  }

  changeColumnTitle = (columnId, value) => {
    const { columns } = this.state;
    const currColumnIndex = columns.findIndex(item => item.id === columnId);
    const cloneColumnsArray = [...columns];

    cloneColumnsArray[currColumnIndex].title = value;
    this.setData(cloneColumnsArray, 'columns');
  }

  toggleAddCardVisability = (id) => {
    this.setState({
      columnWithOpenAddCard:
        this.state.columnWithOpenAddCard === id ? null : id
    })
  }

  addNewCard = (columnId, value) => {
    const { cards, userName } = this.state;
    const cloneCardsArray = [...cards];
    const newCard = {
      id: getRandomID(),
      columnId: columnId,
      title: value,
      author: userName,
      desc: ''
    };
    
    cloneCardsArray.push(newCard);
    this.setData(cloneCardsArray, 'cards');
  }

  handleCardDetailsClose = () => {
    this.setState({visibleCardId: null});
  }

  changeCardProp = (desiredProp, value) => {
    const { cards, visibleCardId } = this.state;
    const cloneCardsArray = [...cards];
    const currentCardIndex = cloneCardsArray.findIndex(item => item.id === visibleCardId);

    cloneCardsArray[currentCardIndex][desiredProp] = value;
    this.setData(cloneCardsArray, 'cards');
  }

  addNewComment = (value) => {
    const {
      comments,
      userName,
      visibleCardId
    } = this.state;
    const cloneCommentsArray = [...comments];
    const newComment = {
      id: getRandomID(),
      cardId: visibleCardId,
      author: userName,
      text: value
    };

    cloneCommentsArray.push(newComment);
    this.setData(cloneCommentsArray, 'comments');
  }

  changeComment = (commentId, isDelete=true, value=null) => {
    const { comments } = this.state;
    const cloneCommentsArray = [...comments];
    const currentCommentIndex = comments.findIndex(item => item.id === commentId);
    
    if (isDelete) {
      cloneCommentsArray.splice(currentCommentIndex, 1);
    } else {
      cloneCommentsArray[currentCommentIndex].text = value;
    }

    this.setData(cloneCommentsArray, 'comments');
  }

  handleCardDeleteClick = () => {
    const { cards, visibleCardId } = this.state;
    const cloneCardsArray = [...cards];
    const currentCardIndex = cloneCardsArray.findIndex(item => item.id === visibleCardId);

    cloneCardsArray.splice(currentCardIndex, 1);
    this.setState({visibleCardId: null});
    this.setData(cloneCardsArray, 'cards');
  }

  render () {
    const {
      cards,
      columns,
      comments,
      userName,
      visibleCardId,
      columnWithOpenAddCard
    } = this.state;
    const currentCard = cards.find(item => item.id === visibleCardId) || {};
    const currentCardColumn = columns.find(item => item.id === currentCard.columnId) || {};

    return (
      <section className="app">
        <h1 className="app__title">
          Доска с карточками
        </h1>
        {columns &&
          <ul className="app__list">
            {columns.map(({ id, title }) => {
              return(
                <Column
                  key={id}
                  title={title}
                  comments={comments}
                  isAddCardOpen={columnWithOpenAddCard === id}
                  toggleAddCardVisability={() => this.toggleAddCardVisability(id)}
                  cards={cards.filter(item => item.columnId === id)}
                  changeColumnTitle={value => this.changeColumnTitle(id, value)}
                  addNewCard={value => this.addNewCard(id, value)}
                  onCardClick={id => this.setState({visibleCardId: id})}
                />
              )
            })}
          </ul>
        }
        <Modal isOpen={!userName}>
          <UserForm setUserName={this.setUserName} />
        </Modal>
        <Modal
          isOpen={!!visibleCardId}
          onOverlayClick={this.handleCardDetailsClose}
        >
          <CardDetails
            title={currentCard.title}
            author={currentCard.author}
            desc={currentCard.desc}
            columnTitle={currentCardColumn.title}
            comments={comments.filter(item => item.cardId === currentCard.id)}
            onCloseBtnClick={this.handleCardDetailsClose}
            changeCardProp={this.changeCardProp}
            addNewComment={this.addNewComment}
            changeComment={this.changeComment}
            onCardDeleteClick={this.handleCardDeleteClick}
          />
        </Modal>
      </section>
    )
  }
}

export default App;