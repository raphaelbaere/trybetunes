import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Loading from './Loading';
<<<<<<< HEAD
import { addSong } from '../services/favoriteSongsAPI';
import { Card } from '@mui/material';
=======
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
>>>>>>> 3b5261948a28fd742be1e99a7d753b383cf11e7c

export default class CardMusic extends Component {
  state = {
    loading: false,
    isFavorite: false,
  };

  async componentDidMount() {
    const { trackId } = this.props;
    const favoriteSongs = await getFavoriteSongs();
    favoriteSongs.forEach((song) => {
      if (+song.trackId === trackId) {
        this.setState({ isFavorite: true });
      }
    });
  }

  handleFavorites = async ({ target }) => {
    const { onFavoriteSongRemove } = this.props;
    const { musicObject } = this.props;
    const { name, checked } = target;
    this.setState({ loading: true, [name]: checked });
    let result = '';
    if (checked) {
      result = await addSong(musicObject);
    } else {
      result = await removeSong(musicObject);
      onFavoriteSongRemove(musicObject.trackId);
    }
    if (result) {
      this.setState({ loading: false, [name]: checked });
    }
  };

  render() {
    const { musicObject, trackId } = this.props;
    const { loading, isFavorite } = this.state;
    return (
<<<<<<< HEAD
      <Card variant="outlined" sx={ { display: 'flex', flexDirection: 'column' } }>
=======
      <div>
        <p>{musicObject.trackName}</p>
>>>>>>> 3b5261948a28fd742be1e99a7d753b383cf11e7c
        {musicObject.previewUrl && (
          <div className="eachMusic">
            <p>{musicObject.trackName}</p>
            <p>{musicObject.trackId}</p>
            <audio data-testid="audio-component" src={ musicObject.previewUrl } controls>
              <track kind="captions" />
              O seu navegador não suporta o elemento
              {' '}
              {' '}
              <code>audio</code>
              .
            </audio>
            <label htmlFor={ `${trackId}` }>
              Favorita
              <input
                id={ trackId }
                type="checkbox"
                name="isFavorite"
                data-testid={ `checkbox-music-${trackId}` }
                onChange={ this.handleFavorites }
                checked={ isFavorite }
              />
            </label>
          </div>
        )}
        {loading && <Loading />}
      </Card>
    );
  }
}

CardMusic.propTypes = {
  musicObject: PropTypes.shape({
    previewUrl: PropTypes.string,
    trackId: PropTypes.number,
    trackName: PropTypes.string,
  }).isRequired,
  onFavoriteSongRemove: PropTypes.func,
  trackId: PropTypes.number,
};

CardMusic.defaultProps = {
  trackId: 0,
  onFavoriteSongRemove: () => { console.log('removeu'); },
};
