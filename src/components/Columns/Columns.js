import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './columns.scss';
import Column from '../Column';

class Columns extends Component {
  state = {
    columnIdWithAddCardOpened: null
  }

  toggleAddCardVisibility = (id) => {
    this.setState({
      columnIdWithAddCardOpened:
        this.state.columnIdWithAddCardOpened === id ? null : id
    })
  }

  render () {
    const {
      columns,
      toggleCardDetailsVisibility
    } = this.props;
    const columnsArray = Object.values(columns);

    if (!columnsArray.length) {
      return null;
    }

    return (
      <ul className="columns">
        {columnsArray.map(({ id, title }) => {
          return(
            <Column
              key={id}
              id={id}
              title={title}
              isAddCardOpened={this.state.columnIdWithAddCardOpened === id}
              toggleAddCardVisibility={this.toggleAddCardVisibility}
              toggleCardDetailsVisibility={toggleCardDetailsVisibility}
            />
          )
        })}
      </ul>
    )
  }
}

Columns.propTypes = {
  toggleCardDetailsVisibility: PropTypes.func.isRequired,
  columns: PropTypes.object
};

Columns.defaultProps = {
  columns: {}
}

const mapStateToProps = state => ({
  columns: state.columns
});

export default connect(mapStateToProps)(Columns);