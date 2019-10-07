import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './columns.scss';
import Column from '../Column/Column';

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

    if (!columns.length) {
      return null;
    }

    return (
      <ul className="columns">
        {columns.map(({ id, title }) => {
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
  columns: PropTypes.array
};

Columns.defaultProps = {
  columns: []
}

const mapStateToProps = state => ({
  columns: state.columns
});

export default connect(mapStateToProps)(Columns);