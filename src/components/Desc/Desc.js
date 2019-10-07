import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './desc.scss';
import classNames from 'classnames';
import TextForm from '../TextForm/TextForm';

class CardDesc extends Component {
  state = {
    isEditedBy: false
  }
  
  handleSaveBtnClick = (value) => {
    this.props.editText(value);
    this.setState({isEditedBy: false});
  }
  
  render() {
    const { isEditedBy } = this.state;
    const { text, customClass } = this.props;
    const PLACEHOLDER = 'Добавить полное описание карточки...';
    
    return (
      <section className={classNames('desc', customClass)}>
        <h3 className="desc__title">
          Описание
        </h3>
        {!isEditedBy
          ?
            <pre
              className={classNames(
                'desc__text',
                {'desc__text--fill': text}
              )}
              onClick={() => this.setState({isEditedBy: true})}
            >
              {text || PLACEHOLDER}
            </pre>
          :
            <TextForm
              fieldClassName="desc__input"
              saveBtnTitle="Сохранить"
              placeholder={PLACEHOLDER}
              defaultText={text}
              onSaveBtnClick={this.handleSaveBtnClick}
              onCloseBtnClick={() => this.setState({isEditedBy: false})}
            />
        }
      </section>
    )
  }
}

CardDesc.propTypes = {
  editText: PropTypes.func.isRequired,
  customClass: PropTypes.string,
  text: PropTypes.string
}

CardDesc.defaultProps = {
  customClass: '',
  text: ''
}

export default CardDesc;