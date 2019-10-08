import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Popup from '../Popup';
import UserForm from '../UserForm';
import { setUserName } from '../../reducers/user/actions';

function UserPopup ({ userName='', setUserName }) {
  return (
    <Popup isOpen={!userName}>
      <UserForm setUserName={setUserName} />
    </Popup>
  )
}

UserPopup.propTypes = {
  setUserName: PropTypes.func.isRequired,
  userName: PropTypes.string
};

UserPopup.defaultProps = {
  userName: ''
};

const mapStateToProps = state => ({
  userName: state.user.name
});

const mapDispatchToProps = dispatch => ({
  setUserName: value => dispatch(setUserName(value))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserPopup);