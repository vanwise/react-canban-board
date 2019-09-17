import React from 'react';
import './comment.scss';
import EditText from '../EditText/EditText';

class Comment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isEditedBy: false,
      enteredText: this.props.text
    }
    this.inputRef = React.createRef();
  }

  getIdObj () {
    return ({
      column: this.props.currentVisibleData.columnId,
      card: this.props.currentVisibleData.card.id,
      comment: this.props.commentId
    })
  }

  onSaveBtnClick () {
    const { column, card, comment } = this.getIdObj();
    
    this.props.changeComment(column, card, comment, false, this.state.enteredText);
    this.setState({isEditedBy: false});
  }

  onCloseBtnClick () {
    this.setState({
      isEditedBy: false,
      enteredText: this.props.text
    });
    window.getSelection().removeAllRanges();
    this.props.closeWriteNewComment();
  }

  onChangeBtnClick () {
    this.setState({isEditedBy: true});
    this.inputRef.current.select();
  }

  onDeleteBtnClick () {
    const { column, card, comment } = this.getIdObj();

    this.props.changeComment(column, card, comment);
  }

  render() {
    return (
      <li className="comment">
        <p className="comment__author">
          {this.props.author}
        </p>
        <div 
          className={`
            comment__edit-wrapper 
            ${this.state.isEditedBy ? 'comment__edit-wrapper--active' : ''}
          `}
        >
          {!this.state.isEditedBy &&
            <p className="comment__text">
              {this.state.enteredText}
            </p>
          }
          <input 
            ref={this.inputRef}
            className="comment__text-input"
            type="text"
            value={this.state.enteredText}
            onChange={e => this.setState({enteredText: e.target.value})}
          />
          {this.state.isEditedBy &&
            <EditText
              title="Сохранить"
              isDisabled={this.state.enteredText ? false : true}
              onAddBtnClick={() => this.onSaveBtnClick()}
              onCloseBtnClick={() => this.onCloseBtnClick()}
            />
          }
        </div>
        {this.props.author === window.localStorage.getItem('userName') &&
          <div className="comment__wrapper">
            <button
              className="comment__btn"
              onClick={() => this.onChangeBtnClick()}
            >
              Изменить
            </button>
            <span> / </span>
            <button
              className="comment__btn"
              onClick={() => this.onDeleteBtnClick()}
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