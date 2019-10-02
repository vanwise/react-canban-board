import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './comment.scss';
import TextForm from '../TextForm/TextForm';

class Comment extends Component {
  static propTypes = {
    changeComment: PropTypes.func.isRequired,
    author: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    closeWriteNewComment: PropTypes.func,
  }
  static defaultProp = {
    closeWriteNewComment: ()=>{}
  }
  state = {
    isEditedBy: false
  }

  handleSaveBtnClick = (value) => {
    if (value) {
      this.props.changeComment(false, value);
    }

    this.setState({isEditedBy: false});
  }

  handleCloseBtnClick = () => {
    this.setState({isEditedBy: false});
    this.props.closeWriteNewComment();
  }

  render() {
    const {
      text,
      author,
      changeComment
    } = this.props;
    const { isEditedBy } = this.state;

    return (
      <li className="comment">
        <p className="comment__author">
          {author}
        </p>
        <div 
          className={`
            comment__edit-wrapper 
            ${isEditedBy ? 'comment__edit-wrapper--active' : ''}
          `}
        >
          {!isEditedBy
            ?
              <pre className="comment__text">
                {text}
              </pre>
            :
              <TextForm
                fieldClassName="comment__input"
                saveBtnTitle="Сохранить"
                defaultText={text}
                onSaveBtnClick={this.handleSaveBtnClick}
                onCloseBtnClick={this.handleCloseBtnClick}
                isDynamicTextareaHeight={true}
              />
          }
        </div>
        {author === window.localStorage.getItem('userName') &&
          <div className="comment__wrapper">
            <button
              className="comment__btn"
              onClick={() => this.setState({isEditedBy: true})}
            >
              Изменить
            </button>
            <span> / </span>
            <button
              className="comment__btn"
              onClick={changeComment}
            >
              Удалить
            </button>
          </div>
        }
      </li>
    )
  }
}

export default Comment;