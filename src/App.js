import React, { Component } from 'react';
import './app.scss';
import Columns from './components/Columns/Columns';
import CardDetailsPopup from './components/CardDetailsPopup/CardDetailsPopup';
import UserPopup from './components/UserPopup/UserPopup';

class App extends Component {
  state = {
    visibleCardId: null
  }

  toggleCardDetailsVisibility = (id) => {
    this.setState({visibleCardId: id ? id : null});
  }

  render () {
    return (
      <section className="app">
        <h1 className="app__title">
          Доска с карточками
        </h1>
        <Columns toggleCardDetailsVisibility={this.toggleCardDetailsVisibility} />
        <UserPopup />
        <CardDetailsPopup
          visibleCardId={this.state.visibleCardId}
          toggleCardDetailsVisibility={this.toggleCardDetailsVisibility}
        />
      </section>
    )
  }
}

export default App;