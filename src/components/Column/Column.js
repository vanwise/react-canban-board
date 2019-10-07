import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './column.scss';
import TitleInput from '../TitleInput/TitleInput';
import Card from '../Card/Card';
import AddCard from '../AddCard/AddCard';
import { changeColumnTitle } from '../../reducers/columns/actions';

class Column extends Component {
  handleTitleInputBlur = value => {
    const { changeColumnTitle, id } = this.props;
    
    if (value) {
      changeColumnTitle(id, value);
    }
  }
  
  render () {
    const {
      id,
      title,
      cards,
      toggleCardDetailsVisibility,
      comments,
      isAddCardOpened,
      toggleAddCardVisibility
    } = this.props;
    const filteredCards = cards.filter(item => item.columnId === id);

    return (
      <li className="column">
        <TitleInput
          className="column__title"
          defaultValue={title}
          onBlur={this.handleTitleInputBlur}
        />
        {filteredCards.length > 0 &&
          <ul className="column__list">
            {filteredCards.map(({ id, title }) => {
              return (
                <Card
                  key={id}
                  title={title}
                  commentsLength={comments.filter(item => item.cardId === id).length}
                  onClick={() => toggleCardDetailsVisibility(id)}
                />
              )
            })}
          </ul>
        }
        <AddCard 
          isOpen={isAddCardOpened}
          columnId={id}
          toggleAddCardVisibility={toggleAddCardVisibility}
        />
      </li>
    )
  }
}

Column.propTypes = {
  toggleCardDetailsVisibility: PropTypes.func.isRequired,
  toggleAddCardVisibility: PropTypes.func.isRequired,
  changeColumnTitle: PropTypes.func.isRequired,
  isAddCardOpened: PropTypes.bool,
  id: PropTypes.string,
  title: PropTypes.string,
  comments: PropTypes.array,
  cards: PropTypes.array
};

Column.defaultProps = {
  isAddCardOpened: false,
  title: 'Неизвестная колонка',
  id: '',
  comments: [],
  cards: []
};

const mapStateToProps = state => ({
  cards: state.cards,
  comments: state.comments
});

const mapDispatchToProps = dispatch => ({
  changeColumnTitle: (id, value) => dispatch(changeColumnTitle(id, value))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Column);