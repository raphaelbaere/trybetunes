import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';

export default class Favorites extends Component {
  render() {
    const { user } = this.props;
    return (
      <div data-testid="page-favorites">
        <Header user={ user } />
        Favorites
      </div>
    );
  }
}

Favorites.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string,
  }).isRequired,
};
