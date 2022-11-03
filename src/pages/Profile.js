import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';

export default class Profile extends Component {
  render() {
    const { user } = this.props;
    return (
      <div data-testid="page-profile">
        <Header user={ user } />
        Profile
      </div>
    );
  }
}

Profile.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string,
  }).isRequired,
};
