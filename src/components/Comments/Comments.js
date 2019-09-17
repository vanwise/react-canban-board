import React from 'react';
import './comments.scss';
import Comment from '../Comment/Comment';
import EditText from '../EditText/EditText';

class Comments extends React.Component {
  state = {
    isCommentWritten: false,
    enteredText: ''
  }

  onInputClick () {
    if (!this.state.isCommentWritten) {
      this.setState({isCommentWritten: true});
    }
  }

  onAddBtnClick () {
    const { columnId } = this.props.currentVisibleData;
    const { id } = this.props.currentVisibleData.card;

    this.props.addNewComment(columnId, id, this.state.enteredText);
    this.onCloseBtnClick();
  }

  onCloseBtnClick () {
    this.setState({
      isCommentWritten: false,
      enteredText: ''
    });
  }

  closeWriteNewComment () {
    if (this.state.isCommentWritten && !this.state.enteredText) {
      this.onCloseBtnClick();
    }
  }

  render() {
    return (
      <div 
        className={`comments ${this.props.customClass ? this.props.customClass : ''}`}
      >
        <div 
          className={`
            comments__wrapper 
            ${this.state.isCommentWritten ? 'comments__wrapper--active' : ''}
          `}
        >
          <input
            className="comments__input"
            type="text"
            placeholder="Напишите комментарий..."
            value={this.state.enteredText}
            onClick={() => this.onInputClick()}
            onChange={e => this.setState({enteredText: e.target.value})}
          />
          <EditText
            title="Сохранить"
            isDisabled={this.state.enteredText ? false : true}
            onAddBtnClick={() => this.onAddBtnClick()}
            onCloseBtnClick={() => this.onCloseBtnClick()}
          />
        </div>
        <ul className="comments__list">
          {[...this.props.comments].reverse().map(({ id, author, text }) => {
            return (
              <Comment
                key={id}
                commentId={id}
                author={author}
                text={text}
                currentVisibleData={this.props.currentVisibleData}
                changeComment={this.props.changeComment}
                closeWriteNewComment={() => this.closeWriteNewComment()}
              />
            )
          })}
        </ul>
      </div>
    )
  }
}

export default Comments;