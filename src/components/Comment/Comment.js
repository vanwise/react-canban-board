import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './comment.scss';
import classNames from 'classnames';
import TextForm from '../TextForm';

class Comment extends Component {
  state = {
    isEditedBy: false
  }

  handleSaveBtnClick = (value) => {
    if (value) {
      this.props.changeComment(value);
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
      removeComment,
      userName
    } = this.props;
    const { isEditedBy } = this.state;

    return (
      <li className="comment">
        <p className="comment__author">
          {author}
        </p>
        <div 
          className={classNames(
            'comment__edit-wrapper',
            {'comment__edit-wrapper--active': isEditedBy}
          )}
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
        {author === userName &&
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
              onClick={() => removeComment()}
            >
              Удалить
            </button>
          </div>
        }
      </li>
    )
  }
}

Comment.propTypes = {
  changeComment: PropTypes.func.isRequired,
  removeComment: PropTypes.func.isRequired,
  author: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  closeWriteNewComment: PropTypes.func,
  userName: PropTypes.string.isRequired
};

Comment.defaultProp = {
  closeWriteNewComment: ()=>{}
};

const mapStateToProps = state => ({
  userName: state.user.name
});

export default connect(mapStateToProps)(Comment);