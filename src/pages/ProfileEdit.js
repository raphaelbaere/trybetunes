import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';

export default class ProfileEdit extends Component {
  render() {
    const { user } = this.props;
    return (
      <div data-testid="page-profile-edit">
        <Header user={ user } />
        ProfileEdit
      </div>
    );
  }
}

ProfileEdit.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string,
  }).isRequired,
};
