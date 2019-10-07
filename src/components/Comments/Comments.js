import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './comments.scss';
import classNames from 'classnames';
import Comment from '../Comment/Comment';
import TextForm from '../TextForm/TextForm';
import {
  addNewComment,
  changeComment,
  removeComment
} from '../../reducers/comments/actions';

class Comments extends Component {
  state = {
    isCommentWritten: false
  }

  handleAddCommentBtnClick = (value) => {
    const {
      visibleCardId,
      userName,
      addNewComment
    } = this.props;

    if (value) {
      addNewComment(visibleCardId, userName, value);
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
      removeComment,
      comments,
      visibleCardId
    } = this.props;
    const { isCommentWritten } = this.state;
    const filteredComments = comments.filter(item => item.cardId === visibleCardId);
    const PLACEHOLDER = 'Напишите комментарий...';

    return (
      <div className={classNames(
          'comments',
          customClass,
          {'comments--no-comments': !filteredComments.length}
        )}
      >
        <div 
          className={classNames(
            'comments__wrapper',
            {'comments__wrapper--active': isCommentWritten}
          )}
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
        {filteredComments.length > 0 &&
          <ul className="comments__list">
            {[...filteredComments].reverse().map(({ id, author, text }) => {
              return (
                <Comment
                  key={id}
                  author={author}
                  text={text}
                  closeWriteNewComment={this.closeWriteNewComment}
                  changeComment={value => changeComment(id, value)}
                  removeComment={() => removeComment(id)}
                />
              )
            })}
          </ul>
        }
      </div>
    )
  }
}

Comments.propTypes = {
  changeComment: PropTypes.func.isRequired,
  addNewComment: PropTypes.func.isRequired,
  visibleCardId: PropTypes.number.isRequired,
  userName: PropTypes.string.isRequired,
  customClass: PropTypes.string,
  comments: PropTypes.array
}

Comments.defaultProps = {
  customClass: '',
  comments: []
}

const mapStateToProps = state => ({
  userName: state.user.name,
  comments: state.comments
});

const mapDispatchToProps = dispatch => ({
  addNewComment: (id, author, value) => dispatch(addNewComment(id, author, value)),
  changeComment: (id, value) => dispatch(changeComment(id, value)),
  removeComment: id => dispatch(removeComment(id))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Comments);