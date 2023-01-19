import { Card } from '@mui/material';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class CardAlbum extends Component {
  render() {
    const { musicObject } = this.props;
    return (
      <Card
        variant="outlined"
        sx={
          {
            width: 240,
            height: 450,
            display: 'flex',
            flexDirection: 'column',
            margin: 5,
            alignItems: 'center',
            padding: 2,
            backgroundColor: '#449948' }
        }
      >
        <img
          className="album-image"
          src={ musicObject.artworkUrl100 }
          alt={ `${musicObject.collectionName} artwork` }
        />
        <p className="collection-name">{ musicObject.collectionName }</p>
        <p className="artist-name">{ musicObject.artistName }</p>
        <Link
          className="album-link"
          data-testid={ `link-to-album-${musicObject.collectionId}` }
          to={ `album/${musicObject.collectionId}` }
        >
          Ver album

        </Link>
      </Card>
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
