import React from 'react';
import './big-card.scss';
import CardDesc from '../CardDesc/CardDesc';
import Comments from '../Comments/Comments';
import CloseBtn from '../CloseBtn/CloseBtn';

class BigCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isTitleInputOpened: false,
      enteredTitle: this.props.currentVisibleData.card.title
    }
    this.onBigCardKeyPress = this.onBigCardKeyPress.bind(this);
  }
  
  componentDidMount () {
    window.addEventListener('keydown', this.onBigCardKeyPress);
  }

  componentWillUnmount () {
    window.removeEventListener('keydown', this.onBigCardKeyPress);
  }

  onBigCardKeyPress (e) {
    if (e.keyCode === 27 &&
        this.props.isBigCardOpened &&
        !this.state.isTitleInputOpened) {
      this.onCloseBtnClick();
    }
  }

  onCloseBtnClick () {
    this.props.toggleBigCardVisibiliy();
  }

  onDeleteBtnClick () {
    this.props.deleteCard(
      this.props.currentVisibleData.columnId,
      this.props.currentVisibleData.card.id
    );
  }

  onTitleInputClick (e) {
    e.target.select();
  }

  onTitleInputBlur () {
    if (!this.state.enteredTitle) {
      this.setState({enteredTitle: this.props.currentVisibleData.card.title});
      
      return;
    }

    this.props.changeCardTitle(
      this.props.currentVisibleData.columnId,
      this.props.currentVisibleData.card.id,
      this.state.enteredTitle
    );
  }

  closeCardDesc () {
    if (this.state.isCardDescOpened) {
      this.setState({isCardDescOpened: false});
    }
  }

  onTitleInputKeyDown (e) {
    const code = e.keyCode;

    if (code === 27 || code === 13) {
      e.target.blur();
    }
  }

  render () {
    return this.props.isBigCardOpened && (
      <section 
        className="big-card"
        onClick={() => this.onCloseBtnClick()}
      >
        <div 
          className="big-card__wrapper"
          onClick={e => e.stopPropagation()}
          onKeyDown={e => e.stopPropagation()}
        >
          <input
            className="big-card__title"
            type="text"
            value={this.state.enteredTitle}
            onClick={e => this.onTitleInputClick(e)}
            onChange={e => this.setState({enteredTitle: e.target.value})}
            onBlur={() => this.onTitleInputBlur()}
            onKeyDown={e => this.onTitleInputKeyDown(e)}
          />
          <p className="big-card__column-title">
            В колонке {this.props.currentVisibleData.columnTitle}
          </p>
          <p className="big-card__author">
            Автор карточки: {this.props.currentVisibleData.card.author}
          </p>
          <CardDesc
            customClass={'big-card__desc'}
            currentVisibleData={this.props.currentVisibleData}
            changeCardDesc={this.props.changeCardDesc}
          />
          <Comments
            customClass={`
              big-card__comments 
              ${!this.props.currentVisibleData.card.comments.length ?
              'comments--no-comments' : ''}
            `}
            comments={this.props.currentVisibleData.card.comments}
            currentVisibleData={this.props.currentVisibleData}
            addNewComment={this.props.addNewComment}
            changeComment={this.props.changeComment}
            closeCardDesc={() => this.closeCardDesc()}
          />
          <CloseBtn
            customClass="big-card__close-btn"
            title="Закрыть"
            onCloseBtnClick={() => this.onCloseBtnClick()}
          />
          <button
            className="big-card__delete"
            onClick={() => this.onDeleteBtnClick()}
          >
            Удалить карточку
          </button>
        </div>
      </section>
    )
  }
}

export default BigCard;