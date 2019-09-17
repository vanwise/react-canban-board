import React from 'react';
import './card-desc.scss';
import EditText from '../EditText/EditText';

class CardDesc extends React.Component {
  state = {
    isEditedBy: false,
    enteredText: this.props.currentVisibleData.card.desc
  }

  onTextareaClick (e) {
    if (!this.state.isEditedBy) {
      this.setState({isEditedBy: true});
      e.target.select();
    }
  }

  onAddBtnClick () {
    if (this.state.enteredText !== this.props.currentVisibleData.card.desc) {
      const { columnId } = this.props.currentVisibleData;
      const { id } = this.props.currentVisibleData.card;

      this.props.changeCardDesc(columnId, id, this.state.enteredText);
      this.setState({isEditedBy: false});
    } else {
      this.onCloseBtnClick();
    }
  }

  onCloseBtnClick () {
    this.setState({enteredText: this.props.currentVisibleData.card.desc});
    this.setState({isEditedBy: false});
    window.getSelection().removeAllRanges();
  }

  render() {
    return (
      <section 
        className={`card-desc ${this.props.customClass ? this.props.customClass : ''}`}
      >
        <h3 className="card-desc__title">
          Описание
        </h3>
        <textarea 
          className={`
            card-desc__input 
            ${this.state.enteredText ? 'card-desc__input--fill' : ''} 
            ${this.state.isEditedBy ? 'card-desc__input--active' : ''}
            `}
          value={this.state.enteredText}
          placeholder="Добавить полное описание карточки..."
          onClick={e => this.onTextareaClick(e)}
          onChange={e => this.setState({enteredText: e.target.value})}
        />
        {this.state.isEditedBy &&
          <EditText
            title="Сохранить"
            onAddBtnClick={() => this.onAddBtnClick()}
            onCloseBtnClick={() => this.onCloseBtnClick()}
          />
        }
      </section>
    )
  }
}

export default CardDesc;