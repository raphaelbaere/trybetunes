import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class UserProfile extends Component {
  render() {
    const { userName, userEmail, userImage, userDescription } = this.props;
    return (
      <div>
        <img data-testid="profile-image" src={ userImage } alt={ userName } />
        <p>Username: </p>
        <p>{userName}</p>
        <p>Email:</p>
        <p>{userEmail}</p>
        <p>Description:</p>
        <p>{userDescription}</p>
        <Link to="profile/edit">Editar perfil</Link>
      </div>
    );
  }
}

UserProfile.propTypes = {
  userDescription: PropTypes.string,
  userEmail: PropTypes.string,
  userImage: PropTypes.string,
  userName: PropTypes.string,
};

UserProfile.defaultProps = {
  userDescription: 'Not found',
  userEmail: 'Not found',
  userImage: 'Not found',
  userName: 'Not found',
};
