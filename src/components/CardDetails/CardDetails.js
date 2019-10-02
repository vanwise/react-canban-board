import React, { Component } from 'react';
import './card-details.scss';
import PropTypes from 'prop-types';
import TitleInput from '../TitleInput/TitleInput';
import Desc from '../Desc/Desc';
import Comments from '../Comments/Comments';
import CloseBtn from '../CloseBtn/CloseBtn';
import KEY_CODES from '../../utils/keyCodes';

class CardDetails extends Component {
  static propTypes = {
    onCloseBtnClick: PropTypes.func.isRequired,
    changeCardProp: PropTypes.func.isRequired,
    addNewComment: PropTypes.func.isRequired,
    changeComment: PropTypes.func.isRequired,
    onCardDeleteClick: PropTypes.func.isRequired,
    columnId: PropTypes.string,
    columnTitle: PropTypes.string,
    id: PropTypes.number,
    title: PropTypes.string,
    author: PropTypes.string,
    comments: PropTypes.array,
    desc: PropTypes.string
  }
  static defaultProps = {
    columnId: '',
    columnTitle: '',
    id: 0,
    title: '',
    author: '',
    comments: [],
    desc: ''
  }

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

  onTitleInputKeyDown (e) {
    const { keyCode, target } = e;

    if (KEY_CODES.endOfTitleEditing.includes(keyCode)) {
      target.blur();
    }
  }

  render () {
    const {
      columnTitle,
      title,
      author,
      comments,
      desc,
      changeCardProp,
      addNewComment,
      changeComment,
      onCloseBtnClick,
      onCardDeleteClick
    } = this.props;

    return (
      <div className="card-details">
        <TitleInput
          className="card-details__title"
          defaultValue={title}
          onBlur={value => changeCardProp('title', value)}
        />
        <p className="card-details__column-title">
          В колонке {columnTitle}
        </p>
        <p className="card-details__author">
          Автор карточки: {author}
        </p>
        <Desc
          customClass={'card-details__desc'}
          text={desc}
          editText={value => changeCardProp('desc', value)}
        />
        <Comments
          customClass={`
            card-details__comments 
            ${!comments.length ? 'comments--no-comments' : ''}
          `}
          comments={comments}
          addNewComment={addNewComment}
          changeComment={changeComment}
        />
        <CloseBtn
          customClass="card-details__close-btn"
          title="Закрыть"
          onClick={onCloseBtnClick}
        />
        <button
          className="card-details__delete"
          onClick={onCardDeleteClick}
        >
          Удалить карточку
        </button>
      </div>
    )
  }
}

export default CardDetails;