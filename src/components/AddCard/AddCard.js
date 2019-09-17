import React from 'react';
import './add-card.scss';
import EditText from '../EditText/EditText';

class AddCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      enteredTitle: ''
    }
    this.titleInput = React.createRef();
  }

  componentDidUpdate () {
    if (this.props.isAddCardOpened && !this.props.isTitleEdited) {
      this.titleInput.current.focus();
    }
  }
  
  onAddBtnClick () {
    if (this.state.enteredTitle) {
      this.props.addNewCard(this.props.columnId, this.state.enteredTitle);
      this.setState({enteredTitle: ''});
    }
  }

  onCloseBtnClick () {
    this.props.toggleAddCardVisibility(this.props.columnId);
    this.setState({enteredTitle: ''});
  }

  render() {
    return this.props.isAddCardOpened && (
      <div className="add-card">
        <textarea 
          className="add-card__textarea"
          ref={this.titleInput}
          placeholder="Введите заголовок для этой карточки"
          value={this.state.enteredTitle}
          onChange={e => this.setState({enteredTitle: e.target.value})}
        />
        <EditText
          title="Добавить карточку"
          onAddBtnClick={() => this.onAddBtnClick()}
          onCloseBtnClick={() => this.onCloseBtnClick()}
        />
      </div>
    )
  }
}

export default AddCard;