import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './desc.scss';
import TextForm from '../TextForm/TextForm';

class CardDesc extends Component {
  static propTypes = {
    editText: PropTypes.func.isRequired,
    customClass: PropTypes.string,
    text: PropTypes.string
  }
  static defaultProps = {
    customClass: '',
    text: ''
  }
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
      <section className={`desc ${customClass}`}>
        <h3 className="desc__title">
          Описание
        </h3>
        {!isEditedBy
          ?
            <pre
              className={`desc__text ${text ? 'desc__text--fill' : ''}`}
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

export default CardDesc;