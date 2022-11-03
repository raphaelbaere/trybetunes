import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class CardAlbum extends Component {
  render() {
    const { musicObject } = this.props;
    return (
      <div>
        <img
          src={ musicObject.artworkUrl100 }
          alt={ `${musicObject.collectionName} artwork` }
        />
        <p>{ musicObject.collectionName }</p>
        <p>{ musicObject.artistName }</p>
        <Link
          data-testid={ `link-to-album-${musicObject.collectionId}` }
          to={ `album/${musicObject.collectionId}` }
        >
          Ver album

        </Link>
      </div>
    );
  }
}

CardAlbum.propTypes = {
  musicObject: PropTypes.shape({
    artistName: PropTypes.string.isRequired,
    artworkUrl100: PropTypes.string.isRequired,
    collectionId: PropTypes.number.isRequired,
    collectionName: PropTypes.string.isRequired,
  }).isRequired,
};
