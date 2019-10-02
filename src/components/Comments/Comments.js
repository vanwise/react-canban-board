import React, { Component } from 'react';
import './comments.scss';
import PropTypes from 'prop-types';
import Comment from '../Comment/Comment';
import TextForm from '../TextForm/TextForm';

class Comments extends Component {
  static propTypes = {
    changeComment: PropTypes.func.isRequired,
    addNewComment: PropTypes.func.isRequired,
    customClass: PropTypes.string,
    comments: PropTypes.array
  }
  static defaultProps = {
    customClass: '',
    comments: []
  }
  state = {
    isCommentWritten: false
  }

  handleAddCommentBtnClick = (value) => {
    if (value) {
      this.props.addNewComment(value);
    }
    
    this.setState({isCommentWritten: false});
  }

  closeWriteNewComment = () => {
    if (this.state.isCommentWritten) {
      this.setState({isCommentWritten: false});
    }
  }

  render() {
    const {
      customClass,
      changeComment,
      comments
    } = this.props;
    const { isCommentWritten } = this.state;
    const PLACEHOLDER = 'Напишите комментарий...';

    return (
      <div className={`comments ${customClass}`}>
        <div 
          className={`
            comments__wrapper 
            ${isCommentWritten ? 'comments__wrapper--active' : ''}
          `}
        >
          {!isCommentWritten
            ?
              <button
                className="comments__btn"
                onClick={() => this.setState({isCommentWritten: true})}
              >
                {PLACEHOLDER}
              </button>
            :
              <TextForm
                fieldClassName="comments__input"
                placeholder={PLACEHOLDER}
                saveBtnTitle="Сохранить"
                onSaveBtnClick={this.handleAddCommentBtnClick}
                onCloseBtnClick={() => this.setState({isCommentWritten: false})}
                isDynamicTextareaHeight={true}
              />
          }
        </div>
        {comments.length > 0 &&
          <ul className="comments__list">
            {[...comments].reverse().map(({ id, author, text }) => {
              return (
                <Comment
                  key={id}
                  author={author}
                  text={text}
                  closeWriteNewComment={this.closeWriteNewComment}
                  changeComment={(isDelete, value) => changeComment(id, isDelete, value)}
                />
              )
            })}
          </ul>
        }
      </div>
    )
  }
}

export default Comments;