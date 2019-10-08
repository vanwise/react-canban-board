import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './column.scss';
import TitleInput from '../TitleInput';
import Card from '../Card';
import AddCard from '../AddCard';
import { changeColumnTitle } from '../../reducers/columns/actions';

class Column extends Component {
  handleTitleInputBlur = value => {
    const { changeColumnTitle, id } = this.props;
    
    if (value) {
      changeColumnTitle(id, value);
    }
  }

  getNumberOfComments = (id) => {
    return Object.values(this.props.comments).filter(item => item.cardId === id).length;
  }
  
  render () {
    const {
      id,
      title,
      cards,
      toggleCardDetailsVisibility,
      isAddCardOpened,
      toggleAddCardVisibility
    } = this.props;
    const filteredCards = Object.values(cards).filter(item => item.columnId === id);

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
                  numberOfComments={this.getNumberOfComments(id)}
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
  comments: PropTypes.object,
  cards: PropTypes.object
};

Column.defaultProps = {
  isAddCardOpened: false,
  title: 'Неизвестная колонка',
  id: '',
  comments: {},
  cards: {}
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